import { Router } from 'express'
import { getHeroList, getSingleHero } from '../service/heroService.js'

const router = Router()

router.get('/', async function (req, res) {
    await getHeroList(req, res)
})

router.get('/:id', async function (req, res) {
    await getSingleHero(req, res)
})

export default router