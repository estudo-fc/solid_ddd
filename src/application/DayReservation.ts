import Reservation from "../domain/Reservation";
import Room from "../domain/Room";

export default class DayReservation extends Reservation {

    calculate(room: Room) {
        this.duration = ((new Date(this.checkinDate).getTime() - new Date(this.checkoutDate).getTime()) * -1) / (1000 * 60 * 60 * 24);

        this.price = this.duration * room.price;
    }

    static create(
        roomId: string,
        email: string,
        checkinDate: Date,
        checkoutDate: Date,
    ) {
        const status = "active";
        const reservationId = crypto.randomUUID();
        return new DayReservation(reservationId, roomId, email, checkinDate, checkoutDate, status);
    }


}