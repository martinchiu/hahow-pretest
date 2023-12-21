import axios from 'axios'

const baseUrl = 'https://hahow-recruit.herokuapp.com/'

export async function getHeroList() {
    const url = `${baseUrl}heroes`
    try {
        const {data} = await axios(url)
        return data
    } catch (error) {
        return `${error.name}:${error.message}, origin url: ${url}`
    }
}

export async function getSingleHero(id) {
    const url = `${baseUrl}heroes/${id}`
    try {
        const {data} = await axios(url)
        return data
    } catch (error) {
        return `${error.name}:${error.message}, origin url: ${url}`
    }
}