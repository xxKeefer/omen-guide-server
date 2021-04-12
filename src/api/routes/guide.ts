import { Router } from 'express'
import { authenticateUser, authenticateRole } from '../../middleware/auth'
import {
  createSection,
  readSection,
  allSections,
  updateSection,
  deleteSection
} from '../../controller/guide'

export const router = Router()
router.use(authenticateUser)

router.route('/create').post(authenticateRole('admin'), createSection)
router.route('/read').get(readSection)
router.route('/all').get(allSections)
router.route('/update').put(authenticateRole('admin'), updateSection)
router.route('/delete').delete(authenticateRole('admin'), deleteSection)
