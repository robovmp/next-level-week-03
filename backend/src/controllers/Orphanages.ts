import { Router } from 'express'
import multer from 'multer'
import orphanageValidation from '../middlewares/orphanageValidation'
import multerConfig from '../configs/upload'
import orphanagesController from '../services/Orphanages'

const router = Router()
const upload = multer(multerConfig)

router.get('/', orphanagesController.index)
router.get('/:id', orphanagesController.show)
router.post(
    '/',
    upload.array('images'),
    orphanageValidation,
    orphanagesController.store
)

export const OrphanagesController: Router = router
