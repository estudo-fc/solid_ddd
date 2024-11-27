import DayReservation from "./DayReservation";
import HourReservation from "./HourReservation";

export default class ReservationFactory {

    static create(
        type: string,
        roomId: string,
        email: string,
        checkinDate: Date,
        checkoutDate: Date,
    ) {
        if (type === "hour") return HourReservation.create(roomId, email, checkinDate, checkoutDate);
        if (type === "day") return DayReservation.create(roomId, email, checkinDate, checkoutDate);

        throw new Error("Classe não existe");
    }


    static restore(
        type: string,
        reservationId: string,
        roomId: string,
        email: string,
        checkinDate: Date,
        checkoutDate: Date,
        status: string,
        price: number,
        duration: number,
    ) {
        if (type === "hour") return new HourReservation(reservationId, roomId, email, checkinDate, checkoutDate, status, price, duration);
        if (type === "day") return new DayReservation(reservationId, roomId, email, checkinDate, checkoutDate, status, price, duration);

        throw new Error("Classe não existe");
    }

}