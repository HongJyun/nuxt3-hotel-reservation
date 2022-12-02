insert into
  hotel.rooms (
    name,
    image_urls,
    normalday_price,
    holiday_price,
    description
  )
values
  (
    'Single Room',
    '{https://images.unsplash.com/photo-1551776235-dde6d482980b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80,
      https://images.unsplash.com/photo-1526880792616-4217886b9dc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80,
      https://images.unsplash.com/photo-1515511856280-7b23f68d2996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80 }',
    1380,
    1500,
    'Single Room is only reserved for one guest. There is a bedroom with a single size bed and a private bathroom. Everything you need prepared for you: sheets and blankets, towels, soap and shampoo, hairdryer are provided. In the room there is AC and of course WiFi.'
  );

insert into
  hotel.rooms (
    name,
    image_urls,
    normalday_price,
    holiday_price,
    description
  )
values
  (
    'Deluxe Single Room',
    '{https://images.unsplash.com/photo-1564182379166-8fcfdda80151?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80, https://images.unsplash.com/photo-1528908929486-dfaa209c6986?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80, https://images.unsplash.com/photo-1558211583-03ed8a0b3d5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80}',
    1899,
    2000,
    'Deluxe Single Room is only reserved for one guest. There is a bedroom with a small double size bed and a private bathroom. Everything you need prepared for you: sheets and blankets, towels, soap and shampoo, hairdryer are provided. In the room there is AC and of course WiFi.'
  );

insert into
  hotel.hours (checkin_early, checkin_late, checkout, room_id)
values
  ('15:00', '19:00', '10:00', 1);

insert into
  hotel.hours (checkin_early, checkin_late, checkout, room_id)
values
  ('15:00', '19:00', '11:00', 2);

insert into
  hotel.amenities (
    mini_bar,
    room_service,
    sofa,
    great_view,
    child_friendly,
    room_id
  )
values
  (false, false, false, false, false, 1);

insert into
  hotel.amenities (
    sofa,
    great_view,
    child_friendly,
    room_id
  )
values
  (false, false, false, 2);

insert into
  hotel.room_sizes (
    bed,
    footage,
    room_id
  )
values
  ('Single', 18, 1);

insert into
  hotel.room_sizes (
    bed,
    footage,
    room_id
  )
values
  ('Small Double', 22, 2);