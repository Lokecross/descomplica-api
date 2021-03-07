import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SimulationController from '../controllers/SimulationController';
import ConsultProspectController from '../controllers/ConsultProspectController';
import CreateReservetionController from '../controllers/CreateReservetionController';
import SendProposalController from '../controllers/SendProposalController';
import ComissionsController from '../controllers/ComissionsController';
import ProfessionsController from '../controllers/ProfessionsController';
import CreatePayerController from '../controllers/CreatePayerController';
import SimulatesController from '../controllers/SimulatesController';
import UpdatePaymentDataController from '../controllers/UpdatePaymentDataController';
import ReserveController from '../controllers/ReserveController';
import PayersController from '../controllers/PayersController';
import CreateComissionsController from '../controllers/CreateComissionsController';
import DeleteComissionsController from '../controllers/DeleteComissionsController';
import CreateProposalController from '../controllers/CreateProposalController';
import SimulationLotController from '../controllers/SimulationLotController';

const simulateRouter = Router();
const simulationController = new SimulationController();
const consultProspectController = new ConsultProspectController();
const createReservetionController = new CreateReservetionController();
const sendProposalController = new SendProposalController();
const comissionsController = new ComissionsController();
const professionsController = new ProfessionsController();
const createPayerController = new CreatePayerController();
const simulatesController = new SimulatesController();
const updatePaymentDataController = new UpdatePaymentDataController();
const reserveController = new ReserveController();
const payersController = new PayersController();
const createComissionsController = new CreateComissionsController();
const deleteComissionsController = new DeleteComissionsController();
const createProposalController = new CreateProposalController();
const simulationLotController = new SimulationLotController();

simulateRouter.use(ensureAuthenticated);

simulateRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      attendanceId: Joi.string().uuid().required(),
      lotId: Joi.string().uuid().required(),
    },
  }),
  simulatesController.create,
);

simulateRouter.delete(
  '/payers/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  payersController.delete,
);

simulateRouter.post(
  '/simulation/lot',
  celebrate({
    [Segments.BODY]: {
      lotId: Joi.string().uuid().required(),
    },
  }),
  simulationLotController.create,
);

simulateRouter.post(
  '/:id/simulation',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  simulationController.create,
);

simulateRouter.post(
  '/:id/payment',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      notes: Joi.string().allow(null, ''),
      tax: Joi.string().allow(null, ''),
      period: Joi.string().allow(null, ''),
      deadline: Joi.string().allow(null, ''),
      type: Joi.string().allow(null, ''),
      price: Joi.string().allow(null, ''),
      input: Joi.string().allow(null, ''),
      value: Joi.string().allow(null, ''),
    },
  }),
  updatePaymentDataController.update,
);

simulateRouter.post(
  '/:id/reserve',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  reserveController.update,
);

simulateRouter.post(
  '/:id/comissions',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      comissions: Joi.array()
        .items(
          Joi.object({
            type: Joi.string().required(),
            venc: Joi.string().required(),
            price: Joi.string().required(),
          }),
        )
        .required(),
    },
  }),
  createComissionsController.create,
);

simulateRouter.delete(
  '/:id/comissions',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteComissionsController.delete,
);

simulateRouter.post(
  '/:id/proposal',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  createProposalController.create,
);

simulateRouter.post(
  '/prospect',
  celebrate({
    [Segments.BODY]: {
      document: Joi.string().required(),
    },
  }),
  consultProspectController.create,
);

simulateRouter.post(
  '/reservation',
  celebrate({
    [Segments.BODY]: {
      document: Joi.string().required(),
      first_date: Joi.string().required(),
      readjustment: Joi.string().required(),
      financed: Joi.string().allow(null, '').required(),
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      lot_id: Joi.string().required(),
      input: Joi.string().allow(null, '').required(),
      price: Joi.string().required(),
      proposal: Joi.string().required(),
      franquia: Joi.string().required(),
      corretor: Joi.string().required(),
      admin: Joi.string().required(),
      input_venc: Joi.string().required(),
      is_price: Joi.boolean().required(),
      installments: Joi.string().allow(null, '').required(),
      period: Joi.string().required(),
      installment: Joi.string().allow(null, '').required(),
      tax: Joi.string().allow(null, '').required(),
      is_financed: Joi.boolean().required(),
      notes: Joi.string().allow(null, '').required(),
    },
  }),
  createReservetionController.create,
);

simulateRouter.post(
  '/proposal',
  celebrate({
    [Segments.BODY]: {
      proposal_id: Joi.string().required(),
    },
  }),
  sendProposalController.create,
);

simulateRouter.post(
  '/comissions',
  celebrate({
    [Segments.BODY]: {
      proposal_id: Joi.string().required(),
      comissions: Joi.array()
        .items(
          Joi.object({
            type: Joi.string().required(),
            venc: Joi.string().required(),
            price: Joi.string().required(),
          }),
        )
        .required(),
    },
  }),
  comissionsController.create,
);

simulateRouter.post(
  '/payers',
  celebrate({
    [Segments.BODY]: {
      proposal_id: Joi.string().required(),
      responsible: Joi.boolean().required(),
      document: Joi.string().required(),
      name: Joi.string().required(),
      village: Joi.string().required(),
      address: Joi.string().required(),
      number: Joi.string().allow(''),
      complement: Joi.string().allow(''),
      city: Joi.string().required(),
      state: Joi.string().required(),
      cep: Joi.string().required(),
      email: Joi.string().required(),
      sex: Joi.string().required(),
      rg: Joi.string().required(),
      rg_emission: Joi.string().required(),
      rg_agency: Joi.string().required(),
      birth: Joi.string().required(),
      phone: Joi.string().required(),
      father: Joi.string().required(),
      mother: Joi.string().required(),
      profession: Joi.string().required(),
      marital_status: Joi.string().required(),
      spouse_name: Joi.string().allow(''),
      spouse_rg: Joi.string().allow(''),
      spouse_cpf: Joi.string().allow(''),
      spouse_birth: Joi.string().allow(''),
      spouse_email: Joi.string().allow(''),
      rg_b64: Joi.string().required(),
      cpf_b64: Joi.string().required(),
      address_b64: Joi.string().required(),
      marriage_b64: Joi.string().allow(''),
      spouse_rg_b64: Joi.string().allow(''),
      spouse_cpf_b64: Joi.string().allow(''),
    },
  }),
  createPayerController.create,
);

simulateRouter.get('/professions', professionsController.index);

simulateRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      relations: Joi.array().items(Joi.string()).required(),
    },
  }),
  simulatesController.show,
);

simulateRouter.post(
  '/:id/payers',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      responsible: Joi.boolean().required().allow(null, ''),
      document: Joi.string().required().allow(null, ''),
      name: Joi.string().required().allow(null, ''),
      village: Joi.string().required().allow(null, ''),
      address: Joi.string().required().allow(null, ''),
      number: Joi.string().required().allow(null, ''),
      complement: Joi.string().required().allow(null, ''),
      city: Joi.string().required().allow(null, ''),
      state: Joi.string().required().allow(null, ''),
      cep: Joi.string().required().allow(null, ''),
      email: Joi.string().required().allow(null, ''),
      sex: Joi.string().required().allow(null, ''),
      rg: Joi.string().required().allow(null, ''),
      rg_emission: Joi.string().required().allow(null, ''),
      rg_agency: Joi.string().required().allow(null, ''),
      birth: Joi.string().required().allow(null, ''),
      phone: Joi.string().required().allow(null, ''),
      father: Joi.string().required().allow(null, ''),
      mother: Joi.string().required().allow(null, ''),
      profession: Joi.string().required().allow(null, ''),
      marital_status: Joi.string().required().allow(null, ''),
      spouse_name: Joi.string().required().allow(null, ''),
      spouse_rg: Joi.string().required().allow(null, ''),
      spouse_cpf: Joi.string().required().allow(null, ''),
      spouse_birth: Joi.string().required().allow(null, ''),
      spouse_email: Joi.string().required().allow(null, ''),
      rg_b64: Joi.string().required().allow(null, ''),
      cpf_b64: Joi.string().required().allow(null, ''),
      address_b64: Joi.string().required().allow(null, ''),
      marriage_b64: Joi.string().required().allow(null, ''),
      spouse_rg_b64: Joi.string().required().allow(null, ''),
      spouse_cpf_b64: Joi.string().required().allow(null, ''),
    },
  }),
  payersController.create,
);

export default simulateRouter;
