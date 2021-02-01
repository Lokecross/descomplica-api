import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ChangeStatusAttendanceService from '@modules/attendances/services/ChangeStatusAttendanceService';

export default class ChangeStatusAttendanceController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const changeStatus = container.resolve(ChangeStatusAttendanceService);

    const attendance = await changeStatus.execute({
      attendance_id: id,
      ...req.body,
    });

    return res.json(attendance);
  }
}
