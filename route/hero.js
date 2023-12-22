import { Router } from 'express'
import { getHeroList, getSingleHero } from '../service/heroService.js'
import { handleService } from '../utils/util.js'

const router = Router()

router.get('/', async function (req, res) {
    await handleService(getHeroList, req, res)
})

router.get('/:id', async function (req, res) {
    await handleService(getSingleHero, req, res)
})

export default router