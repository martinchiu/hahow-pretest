import axios from 'axios'

const baseUrl = 'https://hahow-recruit.herokuapp.com/'

export async function getHeroList(req, res) {
    const url = `${baseUrl}heroes/`
    const {name, password} = req.headers
    let isAuthenticated = false

    if (name === '' || password === '') {
        throw new Error('Name and Password cannot be empty')
    }

    if (name || password) {
        const authUrl = `${baseUrl}auth`
        const result = await axios.post(authUrl, {name, password})
        if (result.status === 200) isAuthenticated = true
    }

    const {data: heroes} = await axios(url)

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
    const {id} = req.params
    const {name, password} = req.headers
    let isAuthenticated = false
    const url = `${baseUrl}heroes/${id}`

    if (name === '' || password === '') {
        throw new Error('Name and Password cannot be empty')
    }

    if (name || password) {
        const authUrl = `${baseUrl}auth`
        const result = await axios.post(authUrl, {name, password})
        if (result.status === 200) isAuthenticated = true
    } 
    const requestArr = [axios(url)]
    if (isAuthenticated) {
        const profileUrl = `${url}/profile`
        requestArr.push(axios(profileUrl))
        const [hero, profile] = await Promise.all(requestArr)
        return res.send({...hero.data, profile: profile.data}) 
    } else {
        const [hero] = await Promise.all(requestArr)
        return res.send({...hero.data}) 
    }
}