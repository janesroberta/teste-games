import axios from 'axios'

const api = axios.create({
    baseURL: "https://free-to-play-games-database.p.rapidapi.com/api",
    headers: {
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
        'x-rapidapi-key': 'f02d7c8b51msh7a419b2d27bd42bp1bf102jsne09fc6137883'
    }
})

export default api