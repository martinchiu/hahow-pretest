import axios from 'axios'
const baseUrl = process.env.API_URL

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

    // the boolean value of empty string is false, so set another if block to check 
    if (name === '' || password === '') {
        return res.status(401).send('Name and Password cannot be empty')
    }

    if (name || password) {
        try {
            const authUrl = `${baseUrl}auth`
            const result = await axios.post(authUrl, {name, password})
            if (result.status === 200) isAuthenticated = true
        } catch (error) {
            const status = error.response?.status ? error.response.status : 500
            let errMsg = `${error.name}:${error.message}, origin url: ${error.config.url}`
            return res.status(status).send(errMsg)
        }
    }

    req.isAuthenticated = isAuthenticated
    next()
}