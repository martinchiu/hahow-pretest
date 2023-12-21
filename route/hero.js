import { Router } from 'express'
import { getHeroList, getSingleHero } from '../service/heroService.js'

const router = Router()

router.get('/', async function (req, res) {
    const data = await getHeroList()
    res.send({heroes: data})
})

router.get('/:id', async function (req, res) {
    const {id} = req.params
    const data = await getSingleHero(id)
    res.send(data)
})

export default router