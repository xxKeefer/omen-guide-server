import { Router } from 'express'
import { authenticateUser, authenticateRole } from '../../middleware/auth'
import {
  createArticle,
  readArticle,
  allArticles,
  updateArticle,
  deleteArticle
} from '../../controller/article'

export const router = Router()
router.use(authenticateUser)

router.route('/:section/create').post(authenticateRole('admin'), createArticle)
router.route('/:section/read').get(readArticle)
router.route('/:section/all').get(allArticles)
router.route('/:section/update').put(authenticateRole('admin'), updateArticle)
router
  .route('/:section/delete')
  .delete(authenticateRole('admin'), deleteArticle)
