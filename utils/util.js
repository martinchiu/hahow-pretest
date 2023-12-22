import { AxiosError } from "axios"

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