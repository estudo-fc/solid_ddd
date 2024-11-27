import express, { Request, Response } from 'express';

import MakeReservation from './application/MakeReservation';
import CancelReservation from './application/CancelReservation';
import GetReservation from './application/GetReservation';
import { ReservationRepositoryDatabase } from './infra/repository/ReservationRepository';
import { RoomRepositoryDatabase } from './infra/repository/RoomRepository';


const app = express();

const ReservationRepository = new ReservationRepositoryDatabase();
const roomRepository = new RoomRepositoryDatabase();

const makeReservation = new MakeReservation(ReservationRepository, roomRepository);
const cancelReservation = new CancelReservation(ReservationRepository);
const getReservation = new GetReservation(ReservationRepository);

app.use(express.json());

app.post("/make_reservation", async (req: Request, res: Response) => {
    const input = req.body;
    try {
        const output = await makeReservation.makeReservation(input);
        res.json(output);
    } catch (e: any) {
        res.status(422).json({
            message: e.message
        });
    }

});


app.post("/cancel_reservation", async (req: Request, res: Response) => {
    const { reservationId } = req.body;
    await cancelReservation.execute(reservationId)
    res.end();
});


app.get("/reservations/:reservationId", async (req: Request, res: Response) => {
    const { reservationId } = req.params;
    const output = await getReservation.execute(reservationId)
    res.json(output);
});

app.listen(3000);