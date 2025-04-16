import io from 'socket.io-client'
import { Observable } from 'rxjs'
require('dotenv').config();
const socket = io(process.env.REACT_APP_BACKEND_URL);
console.log(process.env.REACT_APP_BACKEND_URL)

export default socket
