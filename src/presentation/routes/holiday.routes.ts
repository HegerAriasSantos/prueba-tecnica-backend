import { Router } from "express";
import { HolidayController } from "../../presentation/controllers/holiday.controller";
import { HolidayUseCase } from "../../application/use-cases/holiday.use-case";
import { HolidayRepository } from "../../infrastructure/repositories/holiday.repository";
import { validateSchema } from "../../shared/middlewares/validate-schema.middleware";
import { createHolidaySchema } from "../../application/dtos/holidays/create-holiday.dto";
import cron from "node-cron";

const router = Router();
const holidayRepository = new HolidayRepository();
const holidayUseCase = new HolidayUseCase(holidayRepository);
const holidayController = new HolidayController(holidayUseCase);
const entityName = "holidays";

/**
 * @swagger
 * /holidays:
 *   post:
 *     summary: Create a new holiday
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               date:
 *                 type: date
 *                 format: date
 *               isRecurrent:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: the holiday created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post(
	`/${entityName}`,
	(req, res, next) => validateSchema(createHolidaySchema, req, res, next),
	(req, res) => holidayController.create(req, res),
);

/**
 * @swagger
 * /holidays/{id}:
 *   get:
 *     summary: Get a holiday by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the holiday to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Return the created holiday
 *       500:
 *         description: Internal Server Error
 */
router.get(`/${entityName}/:id`, (req, res) =>
	holidayController.getById(req, res),
);

/**
 * @swagger
 * /holidays/by-description/{description}:
 *   get:
 *     summary: Get a holiday by description
 *     parameters:
 *       - name: description
 *         in: path
 *         required: true
 *         description: The description of the holiday to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Return the holiday by description
 */
router.get(`/${entityName}/by-description/:description`, (req, res) =>
	holidayController.getByDescription(req, res),
);

/**
 * @swagger
 * /holidays:
 *   get:
 *     summary: Get all holidays
 *     responses:
 *       200:
 *         description: Return all holidays
 */
router.get(`/${entityName}`, (_, res) => holidayController.getAll(res));

/**
 * @swagger
 * /holidays/{id}:
 *   patch:
 *     summary: update a holiday by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the holiday to retrieve
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               date:
 *                 type: date
 *               isRecurrent:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: the holiday updated
 *       500:
 *         description: Internal Server Error
 */
router.patch(`/${entityName}/:id`, (req, res) =>
	holidayController.update(req, res),
);

/**
 * @swagger
 * /holidays/{id}:
 *   delete:
 *     summary: delete a holiday by id
 *     responses:
 *       204:
 *         description: not content
 */
router.delete(`/${entityName}/:id`, (req, res) =>
	holidayController.remove(req, res),
);

cron.schedule("0 0 1 1 *", () => {
	holidayController.createAllRecurrentNews();
});

export default router;
