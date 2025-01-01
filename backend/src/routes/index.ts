import { Hono } from "hono"
import blog from "./blog"
import signIn from "./signin"
import signUp from "./signup"

const approuter = new Hono()

approuter.route('/user', signUp)
approuter.route('/user', signIn)
approuter.route('/blog', blog)

export default approuter