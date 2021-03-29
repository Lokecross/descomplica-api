import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListAttendancesByEnterpriseService from '@modules/attendances/services/ListAttendancesByEnterpriseService';

export default class AttendancesByEnterpriseController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { enterprise_id } = req.params;

    const listAttendances = container.resolve(
      ListAttendancesByEnterpriseService,
    );

    const attendances = await listAttendances.execute({
      enterpriseId: enterprise_id,
      userId: req.user.id,
    });

    return res.json(attendances);
  }
}
