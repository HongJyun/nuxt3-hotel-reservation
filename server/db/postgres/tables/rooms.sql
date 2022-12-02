BEGIN TRANSACTION;

CREATE TABLE hotel.rooms (
id serial PRIMARY KEY,
name TEXT,
image_urls TEXT[],
normalday_price INTEGER,
holiday_price INTEGER,
description TEXT
);

COMMIT;