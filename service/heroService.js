import axios from 'axios'
import {checkAPIReturn} from '../utils/util.js'

const baseUrl = process.env.API_URL

export async function getHeroList(req, res) {
    const {isAuthenticated} = req
    const url = `${baseUrl}heroes/`
    
    const {data: heroes} = await axios(url)
    checkAPIReturn(heroes)

    const requestArr = []
    if (isAuthenticated) {
        heroes.forEach(hero => {
            const profileUrl = `${url}${hero.id}/profile`
            requestArr.push(axios(profileUrl))   
        })
    }
    const profiles = await Promise.allSettled(requestArr)
    profiles.forEach((profile, index) => {
        if(profile.status === 'fulfilled') {
            heroes[index].profile = profile.value.data
        }
    })
    return res.send({heroes})
}

export async function getSingleHero(req, res) {
    const {isAuthenticated} = req
    const {id} = req.params
    const url = `${baseUrl}heroes/${id}`

    const {data: heroInfo} = await axios(url)
    checkAPIReturn(heroInfo)
    if (isAuthenticated) {
        const profileUrl = `${url}/profile`
        const {data: profile} = await axios(profileUrl)
        checkAPIReturn(profile)
        heroInfo.profile = profile
    }

    return res.send(heroInfo) 
}