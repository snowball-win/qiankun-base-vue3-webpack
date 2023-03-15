/* eslint-disable */
import request from '@/utils/request'

export function uploadFiles(data:any) {
  return request({
    url: '/guoke-createfile/api/v1/analysis/analysisUploadFile',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}
