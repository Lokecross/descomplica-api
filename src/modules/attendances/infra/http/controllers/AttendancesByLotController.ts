import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListAttendancesByLotService from '@modules/attendances/services/ListAttendancesByLotService';

export default class AttendancesByLotController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { lot_id } = req.params;

    const listAttendances = container.resolve(ListAttendancesByLotService);

    const attendances = await listAttendances.execute({ lotId: lot_id });

    return res.json(attendances);
  }
}
