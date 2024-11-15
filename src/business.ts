import crypto from "crypto";
import { getActiveResevartions, getReservationData, getRoom, saveReservation, updateReservationStatus } from "./data";
import { log } from "console";


export const makeReservation = async (input: any) => {
	if (!input.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email");

	const reservation = {
		reservationId: crypto.randomUUID(),
		roomId: input.roomId,
		email: input.email,
		status: "active",
		checkoutDate: input.checkoutDate,
		checkinDate: input.checkinDate,
		price: 0,
		duration: 0,
	}

	const room = await getRoom(input.roomId);
	const reservations = await getActiveResevartions(input.roomId, input.checkinDate, input.checkoutDate);

	const isAvailable = reservations.length === 0;

	if (!isAvailable) throw new Error("Room is not available");


	if (room.type === "day") {
		reservation.duration = (new Date(input.checkoutDate).getTime() - new Date(input.checkinDate).getTime()) / (1000 * 60 * 60 * 24);
		reservation.price = reservation.duration * parseFloat(room.price);
	}
	if (room.type === "hour") {
		reservation.duration = (new Date(input.checkoutDate).getTime() - new Date(input.checkinDate).getTime()) / (1000 * 60 * 60);
		reservation.price = reservation.duration * parseFloat(room.price);
	}

	await saveReservation(reservation);

	return reservation;
}

export const getReservation = async (reservationId: any) => {
	const reservation = await getReservationData(reservationId);
	return reservation;
}

export const cancelReservation = async (reservationId: any) => {
	await updateReservationStatus(reservationId, "cancelled");
}
