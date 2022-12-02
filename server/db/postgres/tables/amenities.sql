BEGIN TRANSACTION;

CREATE TABLE hotel.amenities (
id serial PRIMARY KEY,
wifi Boolean DEFAULT TRUE,
breakfast Boolean DEFAULT TRUE,
mini_bar Boolean DEFAULT TRUE,
room_service Boolean DEFAULT TRUE,
television Boolean DEFAULT TRUE,
air_conditioner Boolean DEFAULT TRUE,
refrigerator Boolean DEFAULT TRUE,
sofa Boolean DEFAULT TRUE,
great_view Boolean DEFAULT TRUE,
smoke_free Boolean DEFAULT TRUE,
child_friendly Boolean DEFAULT TRUE,
pet_friendly Boolean DEFAULT TRUE,
room_id INTEGER,
CONSTRAINT fk_room_id FOREIGN KEY(room_id) REFERENCES hotel.rooms(id)
);

COMMIT;