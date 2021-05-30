import app from './index'

app.listen(process.env.APP_PORT || 3333, () => {
  console.log(`Server has been started at port ${process.env.APP_PORT || 3333}`)
})
