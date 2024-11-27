import Email from "./Email";
import Room from "./Room";

export default abstract class Reservation {

    private email: Email

    constructor(
        readonly reservationId: string,
        readonly roomId: string,
        email: string,
        readonly checkinDate: Date,
        readonly checkoutDate: Date,
        private status: string,
        protected price: number = 0,
        protected duration: number = 0,
    ) {
        this.email = new Email(email);
    }

    getStatus() {
        return this.status;
    }
    getDuration() {
        return this.duration;
    }
    getPrice() {
        return this.price;
    }
    getEmail() {
        return this.email.getValue();
    }

    cancel() {
        if (this.status === "cancelled") throw new Error("Reservation is already cancelled");
        this.status = "cancelled";
    }

    abstract calculate(room: Room): void;

}