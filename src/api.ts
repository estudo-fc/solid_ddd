import express, { Request, Response } from 'express';
import { cancelReservation, getReservation, makeReservation } from './business';
import { log } from 'console';
const app = express();

app.use(express.json());

app.post("/make_reservation", async (req: Request, res: Response) => {
    const input = req.body;
    try {
        const output = await makeReservation(input);
        res.json(output);
    } catch (e: any) {
        res.status(422).json({
            message: e.message
        });
    }

});


app.post("/cancel_reservation", async (req: Request, res: Response) => {
    const { reservationId } = req.body;
    await cancelReservation(reservationId)
    res.end();
});


app.get("/reservations/:reservationId", async (req: Request, res: Response) => {
    const { reservationId } = req.params;
    const output = await getReservation(reservationId)
    res.json(output);
});

app.listen(3000);