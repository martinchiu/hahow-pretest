import { Router } from 'express'
import { getHeroList, getSingleHero } from '../service/heroService.js'
import { handleService, authenticate } from '../utils/util.js'

const router = Router()

router.get('/', authenticate, async function (req, res) {
    await handleService(getHeroList, req, res)
})

router.get('/:id', authenticate, async function (req, res) {
    await handleService(getSingleHero, req, res)
})

export default router