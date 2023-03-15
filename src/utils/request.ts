import { AxiosRequestConfig } from 'axios'
import service from './axios'

interface BaseResponse<T> {
  code: string
  payload: T
  mas?: string
}
const request = <T>(config: AxiosRequestConfig): Promise<BaseResponse<T>> => {
  return new Promise((resolve, reject) => {
    console.log('11', config)
    service.request<BaseResponse<T>>(config).then(
      (res) => {
        console.log('14', res)
        resolve(res.data)
      },
      (err) => {
        console.log('18', err)
        switch (err?.code) {
          case 401:
            console.log('21', err)
            break
          default:
            console.log('24', err)
            break
        }
        reject(err)
      }
    )
  })
}

export default request
