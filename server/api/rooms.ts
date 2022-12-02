import db from '../db/postgres'
import { IRoom } from '@/types'

export default defineEventHandler(async () => {
  const res = await db
    .select('*')
    .from('hotel.rooms')
    .then((data) => {
      const items = data.map(
        (i): IRoom => ({
          id: i.id,
          name: i.name,
          imageUrl: i.image_urls?.[0],
          normalDayPrice: i.normalday_price,
          holidayPrice: i.holiday_price
        })
      )
      return { success: true, items }
    })
    .catch((err) => {
      return {
        success: false,
        message: err.toString()
      }
    })
  return res
})
