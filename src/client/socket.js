import io from 'socket.io-client'
import { Observable } from 'rxjs'

const socket = io(`${process.env.BACKEND_URL}`)

export default socket
