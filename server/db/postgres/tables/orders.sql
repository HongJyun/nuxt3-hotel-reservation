BEGIN TRANSACTION;

CREATE TABLE hotel.orders (
id serial PRIMARY KEY,
booked_time bigint[],
room_id INTEGER,
CONSTRAINT fk_room_id FOREIGN KEY(room_id) REFERENCES hotel.rooms(id)
);

COMMIT;