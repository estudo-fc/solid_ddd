-- Drop the database if it exists and create it again
DROP DATABASE IF EXISTS branas;
CREATE DATABASE branas;

-- Connect to the branas database
\c branas;

-- Create the schema if it does not exist
CREATE SCHEMA IF NOT EXISTS branas;

-- Create the table inside the branas schema
CREATE TABLE branas.room (
    room_id UUID PRIMARY KEY,
    type TEXT,
    price NUMERIC
);

create table branas.reservation (
	reservation_id uuid primary key,
	room_id uuid,
	email text,
	checkin_date timestamp,
	checkout_date timestamp,
	price numeric,
	status text,
	duration numeric
);

insert into branas.room (room_id, type, price) values ('aa354842-59bf-42e6-be3a-6188dbb5fff8', 'day', 1000);
insert into branas.room (room_id, type, price) values ('d5f5c6cb-bf69-4743-a288-dafed2517e38', 'hour', 100);