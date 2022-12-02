BEGIN TRANSACTION;

CREATE TABLE hotel.hours (
id serial PRIMARY KEY,
checkin_early VARCHAR(5),
checkin_late VARCHAR(5),
checkout VARCHAR(5),
room_id INTEGER,
CONSTRAINT fk_room_id FOREIGN KEY(room_id) REFERENCES hotel.rooms(id)
);

COMMIT;