import db from '../db/postgres'
export default defineEventHandler(async (evt) => {
  const body = await readBody(evt)
  const booking: number[] = await db
    .select(db.raw('unnest(booked_time) as time'))
    .from('hotel.orders')
    .where({ room_id: body.roomId })
    .then((data) => {
      // @ts-ignore
      return data.map((i) => +i.time)
    })

  const hasBooked = booking.some((day) => body.dates[0] <= day && body.dates[1] >= day)
  if (hasBooked) {
    return {
      success: false,
      message: '所選區間已有預約'
    }
  }

  const diff = body.dates[1] - body.dates[0] || 0
  const days = diff / (1000 * 60 * 60 * 24) + 1
  const dayAry = new Array(days).fill(0).map((_, i) => {
    return body.dates[0] + i * (1000 * 60 * 60 * 24)
  })
  const res = await db('hotel.orders')
    .where({ room_id: body.roomId })
    .update({ booked_time: [...booking, ...dayAry] })
    .then(() => {
      return {
        success: true
      }
    })
    .catch((err) => {
      return {
        success: false,
        message: err.toString()
      }
    })
  return res
})
