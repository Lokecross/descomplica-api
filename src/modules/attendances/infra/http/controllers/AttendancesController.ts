import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateAttendanceService from '@modules/attendances/services/CreateAttendanceService';
import UpdateAttendanceService from '@modules/attendances/services/UpdateAttendanceService';
import ListAttendancesService from '@modules/attendances/services/ListAttendancesService';
import FindAttendanceService from '@modules/attendances/services/FindAttendanceService';

export default class AttendancesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listAttendances = container.resolve(ListAttendancesService);

    const attendances = await listAttendances.execute();

    return res.json(attendances);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findAttendance = container.resolve(FindAttendanceService);

    const attendance = await findAttendance.execute({ id });

    return res.json(attendance);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const createAttendance = container.resolve(CreateAttendanceService);

    const attendance = await createAttendance.execute(req.body);

    return res.json(attendance);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const updateAttendance = container.resolve(UpdateAttendanceService);

    const attendance = await updateAttendance.execute({
      id,
      ...req.body,
    });

    return res.json(attendance);
  }
}
