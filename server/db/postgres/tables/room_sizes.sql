BEGIN TRANSACTION;

CREATE TABLE hotel.room_sizes (
id serial PRIMARY KEY,
guest_min INT DEFAULT 1,
guest_max INT DEFAULT 1,
bed TEXT,
private_bath INT DEFAULT 1,
footage INT,
room_id INTEGER,
CONSTRAINT fk_room_id FOREIGN KEY(room_id) REFERENCES hotel.rooms(id)
);

COMMIT;