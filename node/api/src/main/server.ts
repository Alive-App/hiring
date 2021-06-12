import { app } from './config/app'
import { env } from './config/env'

const port = env.port

app.listen(port, () => console.log(`server run on ${port}`))
