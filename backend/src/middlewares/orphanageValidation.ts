import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            openingHours,
            openOnWeekends,
        } = req.body

        const validateOpenOnWeekends = openOnWeekends == 'true'

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            openingHours,
            openOnWeekends: validateOpenOnWeekends,
        }

        const schema = Joi.object({
            name: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            about: Joi.string().required().max(300),
            instructions: Joi.string().required(),
            openingHours: Joi.string().required(),
            openOnWeekends: Joi.boolean().required(),
        })

        const result = schema.validate(data)

        if (result.error) {
            throw new Error('Validation fails')
        }

        next()
    } catch (error) {
        const message = (error as Error).message
        res.status(StatusCodes.BAD_REQUEST).json({ error: message })
    }
}
