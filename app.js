import express from 'express'
import heroRoute from './route/hero.js'

const app = express()

const port = 5001

app.use('/heroes', heroRoute)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
