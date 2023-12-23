import axios from 'axios'
import { AxiosError } from "axios"
const baseUrl = process.env.API_URL

export async function handleService(serviceFunction, req, res) {
    try {
        return await serviceFunction(req, res)
    } catch (error) {
        let errMsg
        if (error instanceof AxiosError) {
            errMsg = `${error.name}:${error.message}, origin url: ${error.config.url}`
        } else if (error instanceof Error) {
            errMsg = error.message
        }
        return res.send(errMsg)
    }
}

export function checkAPIReturn(data) {
    if (data.code) {
        const msg = data.message ? data.message : 'Database went wrong'
        throw new Error(msg)
    }
    return
}

export async function authenticate(req, res, next) {
    const {name, password} = req.headers
    let isAuthenticated = false

    if (name === '' || password === '') {
        return res.send('Name and Password cannot be empty')
    }

    if (name || password) {
        try {
            const authUrl = `${baseUrl}auth`
            const result = await axios.post(authUrl, {name, password})
            if (result.status === 200) isAuthenticated = true
        } catch (error) {
            let errMsg = `${error.name}:${error.message}, origin url: ${error.config.url}`
            return res.send(errMsg)
        }
    }

    req.isAuthenticated = isAuthenticated
    next()
}