import { Hono } from 'hono'
import approuter from './routes'


const app = new Hono()


app.route('/api/v1', approuter)

export default app
