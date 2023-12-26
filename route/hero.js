import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { getHeroList, getSingleHero } from '../service/heroService.js'
import { authenticate } from '../utils/util.js'

const router = Router()

router.get('/', authenticate, expressAsyncHandler(async function (req, res) {
    const {isAuthenticated} = req
    const heroes = await getHeroList(isAuthenticated)
    return res.send({heroes})
}))


router.get('/:id', authenticate, expressAsyncHandler(async function (req, res) {
    const {isAuthenticated} = req
    const {id} = req.params
    const heroInfo = await getSingleHero(isAuthenticated, id)
    return res.send(heroInfo)
}))

export default router