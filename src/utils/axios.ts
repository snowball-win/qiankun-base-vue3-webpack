import axios, { AxiosInstance } from 'axios'
const baseURL  = 'http://10.0.3.251:8080/'

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  // withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    // config.headers['x-csrf-token'] = getCsrfToken()
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: any) => {
    console.log('25response', response)
    const res = response.data
    if (res.code !== '0000') { // 接口定义：'0'为成功
      return Promise.reject(res)
    } else {
      return response
    }
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export default service
