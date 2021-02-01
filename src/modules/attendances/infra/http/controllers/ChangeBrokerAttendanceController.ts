import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ChangeBrokerAttendanceService from '@modules/attendances/services/ChangeBrokerAttendanceService';

export default class ChangeBrokerAttendanceController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const changeBroker = container.resolve(ChangeBrokerAttendanceService);

    const attendances = await changeBroker.execute({
      attendance_id: id,
      ...req.body,
    });

    return res.json(attendances);
  }
}
