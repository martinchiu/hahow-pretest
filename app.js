import "dotenv/config.js"
import express from 'express'
import { AxiosError } from "axios"
import heroRoute from './route/hero.js'

const app = express()

const port = process.env.PORT

app.use('/heroes', heroRoute)

// request not found
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  let errMsg, status = 500
  if (err instanceof AxiosError) {
      status = err.response.status
      errMsg = `${err.name}:${err.message}, origin url: ${err.config.url}`
  } else if (err instanceof Error) {
      errMsg = err.message
      status = err.status ? err.status : status
  } else {
      errMsg = err
  }

  return res.status(status).send(errMsg)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
