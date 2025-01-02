import { Hono } from 'hono'
import approuter from './routes'
import { cors } from 'hono/cors'


const app = new Hono()

app.use('/*', cors())
app.route('/api/v1', approuter)

export default app
