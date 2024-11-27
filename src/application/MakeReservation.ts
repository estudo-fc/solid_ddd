import ReservationFactory from "./ReservationFactory";
import { ReservationRepository } from "../infra/repository/ReservationRepository";
import { RoomRepository } from "../infra/repository/RoomRepository";

export default class MakeReservation {

	constructor(
		readonly reservationRepository: ReservationRepository,
		readonly roomnRepository: RoomRepository,
	) {

	}

	async makeReservation(input: any) {
		const room = await this.roomnRepository.getRoom(input.roomId);

		const reservation = ReservationFactory.create(
			room.type,
			room.roomId,
			input.email,
			input.checkinDate,
			input.checkoutDate,
		)

		const hasActiveResevartions = await this.reservationRepository.hasActiveResevartions(input.roomId, input.checkinDate, input.checkoutDate);

		if (hasActiveResevartions) throw new Error("Room is not available");

		reservation.calculate(room);

		await this.reservationRepository.saveReservation(reservation);

		return {
			reservationId: reservation.reservationId
		};
	}

}

