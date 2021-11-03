import axios from 'axios'
import { useMessage } from 'naive-ui'
import {useRouter} from 'vue-router'

const message = useMessage()
const router = useRouter()

function serves() {
  const service = axios.create({
    baseURL: 'http://localhost:8088',
    timeout: 1000 * 10,
    headers: { common: { Authorization: 'Bearer ' + sessionStorage.getItem('token') ? 'Bearer ' + sessionStorage.getItem('token') : '' } }
  })
  service.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  service.interceptors.response.use(
    response => {
        if (response.data.code !== 200) {
            if (response.data.code === 401) {
                localStorage.removeItem('token')
                router.push("/login")
            }
            Promise.reject(response.data.message);
        }
      return response.data.data
    },
    error => {
      return Promise.reject(error)
    }
  )
  return service
}

export default serves
