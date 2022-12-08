import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prismaClient } from '../database/prisma'
import setOrphanageView from '../views/Orphanages'

const index = async (req: Request, res: Response) => {
    try {
        let orphanagesView

        const orphanages = await prismaClient.orphanage.findMany({
            include: {
                images: true,
            },
        })

        if (orphanages) {
            orphanagesView = setOrphanageView.renderMany(orphanages)
        }

        res.status(StatusCodes.OK).json(orphanagesView)
    } catch (error) {
        res.status(400).json()
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        let orphanageView

        const orphanage = await prismaClient.orphanage.findUnique({
            include: {
                images: true,
            },
            where: {
                id: parseInt(id),
            },
        })

        if (orphanage) {
            orphanageView = setOrphanageView.render(orphanage)
        }

        res.status(StatusCodes.OK).json(orphanageView)
    } catch (error) {
        res.status(400).json()
    }
}

const store = async (req: Request, res: Response) => {
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

        let orphanageView

        const requestImages = req.files as Express.Multer.File[]

        const images = requestImages.map((image) => {
            return { path: image.filename }
        })

        const validateOpenOnWeekends = openOnWeekends == 'true'

        const orphanage = await prismaClient.orphanage.create({
            include: {
                images: true,
            },
            data: {
                name,
                latitude,
                longitude,
                about,
                instructions,
                openingHours,
                openOnWeekends: validateOpenOnWeekends,
                images: {
                    create: images,
                },
            },
        })

        if (orphanage) {
            orphanageView = setOrphanageView.render(orphanage)
        }

        res.status(StatusCodes.CREATED).json(orphanageView)
    } catch (error) {
        const message = (error as Error).message
        res.status(StatusCodes.BAD_REQUEST).json({ error: message })
    }
}

export default {
    index,
    show,
    store,
}
