import { log } from "console";
import pgp from "pg-promise";

export const getRoom = async (roomId: string) => {
    const connection = pgp()("postgres://maruko:Postgres2022!@localhost:5432/branas");
    const [room] = await connection.query("select * from branas.room where room_id = $1", [roomId]);
    await connection.$pool.end();
    return room;
}

export const getActiveResevartions = async (roomId: string, checkinDate: Date, checkoutDate: Date) => {
    const connection = pgp()("postgres://maruko:Postgres2022!@localhost:5432/branas");
    const reservations = await connection.query("select * from branas.reservation where room_id = $1 and (checkin_date, checkout_date) overlaps ($2, $3) and status = 'active'", [roomId, checkinDate, checkoutDate]);
    await connection.$pool.end();
    return reservations;
}

export const saveReservation = async (reservation: any) => {
    const connection = pgp()("postgres://maruko:Postgres2022!@localhost:5432/branas");
    await connection.query("insert into branas.reservation (reservation_id, room_id, email, checkin_date, checkout_date, price, status, duration) values ($1, $2, $3, $4, $5, $6, $7, $8)", [reservation.reservationId, reservation.roomId, reservation.email, reservation.checkinDate, reservation.checkoutDate, reservation.price, reservation.status, reservation.duration]);
    await connection.$pool.end();
}

export const updateReservationStatus = async (reservationId: string, status: string) => {
    const connection = pgp()("postgres://maruko:Postgres2022!@localhost:5432/branas");
    await connection.query("update branas.reservation set status = $1 where reservation_id = $2", [status, reservationId]);
    await connection.$pool.end();

}


export const updateAllReservationStatus = async (status: string) => {
    const connection = pgp()("postgres://maruko:Postgres2022!@localhost:5432/branas");
    await connection.query("update branas.reservation set status = $1", [status]);
    await connection.$pool.end();

}


export const getReservationData = async (reservationId: string) => {
    const connection = pgp()("postgres://maruko:Postgres2022!@localhost:5432/branas");
    const [reservation] = await connection.query("select * from branas.reservation where reservation_id = $1", [reservationId]);
    await connection.$pool.end();
    return reservation;
}
