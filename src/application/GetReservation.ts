import { ReservationRepository } from "../infra/repository/ReservationRepository";

export default class GetReservation {

	constructor(
		readonly reservationRepository: ReservationRepository
	) {

	}

	async execute(reservationId: string) {
		return await this.reservationRepository.getReservation(reservationId);
	}

}

