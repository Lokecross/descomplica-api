import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SimulateController from '../controllers/SimulateController';
import ConsultProspectController from '../controllers/ConsultProspectController';
import CreateReservetionController from '../controllers/CreateReservetionController';
import SendProposalController from '../controllers/SendProposalController';
import ComissionsController from '../controllers/ComissionsController';
import ProfessionsController from '../controllers/ProfessionsController';
import CreatePayerController from '../controllers/CreatePayerController';

const simulateRouter = Router();
const simulateController = new SimulateController();
const consultProspectController = new ConsultProspectController();
const createReservetionController = new CreateReservetionController();
const sendProposalController = new SendProposalController();
const comissionsController = new ComissionsController();
const professionsController = new ProfessionsController();
const createPayerController = new CreatePayerController();

simulateRouter.use(ensureAuthenticated);

simulateRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      code_id: Joi.string().required(),
    },
  }),
  simulateController.create,
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

export default simulateRouter;
