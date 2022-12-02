import db from '../db/postgres'

export default defineEventHandler(async (evt) => {
  const query = await getQuery(evt)
  const id = query.id
  const booking: number[] = await db
    .select(db.raw('unnest(booked_time) as time'))
    .from('hotel.orders')
    .where({ room_id: id })
    .then((data) => {
      // @ts-ignore
      return data.map((i) => +i.time)
    })

  const res = await db
    .select('*')
    .from('hotel.rooms')
    .rightJoin('hotel.amenities', 'hotel.rooms.id', 'hotel.amenities.room_id')
    .rightJoin('hotel.room_sizes', 'hotel.rooms.id', 'hotel.room_sizes.room_id')
    .rightJoin('hotel.hours', 'hotel.rooms.id', 'hotel.hours.room_id')
    .where({ 'rooms.id': id })
    .then((data) => {
      const raw = data[0]
      const room = {
        id: raw.room_id,
        name: raw.name,
        imageUrl: raw.image_urls || [],
        normalDayPrice: raw.normalday_price,
        holidayPrice: raw.holiday_price,
        descriptionShort: {
          GuestMin: raw.guest_min,
          GuestMax: raw.guest_max,
          Bed: raw.bed,
          'Private-Bath': raw.private_bath,
          Footage: raw.footage
        },
        amenities: {
          'Wi-Fi': raw.wifi,
          Breakfast: raw.breakfast,
          'Mini-Bar': raw.mini_bar,
          'Room-Service': raw.room_service,
          Television: raw.television,
          'Air-Conditioner': raw.air_conditioner,
          Refrigerator: raw.refrigerator,
          Sofa: raw.sofa,
          'Great-View': raw.great_view,
          'Smoke-Free': raw.smoke_free,
          'Child-Friendly': raw.child_friendly,
          'Pet-Friendly': raw.pet_friendlye
        },
        checkInAndOut: {
          checkInEarly: raw.checkin_early,
          checkInLate: raw.checkin_late,
          checkOut: raw.checkout
        }
      }
      return { success: true, room, booking }
    })
    .catch((err) => {
      return {
        success: false,
        message: err.toString()
      }
    })
  return res
})
