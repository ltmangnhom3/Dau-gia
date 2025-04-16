import io from 'socket.io-client'
import { Observable } from 'rxjs'
import 'dotenv/config'
const socket = io(`${process.env.BACKEND_URL}`)

export default socket
