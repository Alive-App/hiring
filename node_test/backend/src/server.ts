import express from 'express'

const app = express()
app.use(express.json())

app.get('/', (request, response) => {
  return response.send({
    ok: true
  })
})

app.listen(process.env.APP_PORT || 3333, () => {
  console.log(`Server has been started at port ${process.env.APP_PORT || 3333}`)
})
