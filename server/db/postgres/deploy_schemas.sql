\i '/docker-entrypoint-initdb.d/schema.sql'

-- Deploy fresh database tabels:
\i '/docker-entrypoint-initdb.d/tables/rooms.sql'
\i '/docker-entrypoint-initdb.d/tables/amenities.sql'
\i '/docker-entrypoint-initdb.d/tables/hours.sql'
\i '/docker-entrypoint-initdb.d/tables/room_sizes.sql'

-- For testing purposes only. This file will add dummy data
\i '/docker-entrypoint-initdb.d/seed/seed.sql'