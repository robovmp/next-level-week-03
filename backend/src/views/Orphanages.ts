import { Image } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'
import imagesView from './Images'

type Orphanage = {
    id: number
    name: string
    latitude: Decimal
    longitude: Decimal
    about: string
    instructions: string
    openingHours: string
    openOnWeekends: boolean
    images: Image[]
}

export default {
    render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            openingHours: orphanage.openingHours,
            openOnWeekends: orphanage.openOnWeekends,
            images: imagesView.renderMany(orphanage.images),
        }
    },
    renderMany(orphanages: Orphanage[]) {
        return orphanages.map((orphanage) => this.render(orphanage))
    },
}
