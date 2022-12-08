import { HealthCheckController } from '../controllers/HealthCheck'
import { OrphanagesController } from '../controllers/Orphanages'
import { Router } from 'express'

const router = Router()

const defaultRoutes = [
    {
        path: '/health',
        route: HealthCheckController,
    },
    {
        path: '/orphanages',
        route: OrphanagesController,
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

export const Routes: Router = router
