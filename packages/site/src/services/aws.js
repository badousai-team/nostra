import { api, awsApi } from './api'

export const getPresignedUrls = (query) => api.get('aws/presigned-url', query)
export const uploadfileAWSS3 = (url, file) => awsApi(url).put(url, file,
  {
    headers: {
      'Content-Type': file.type,
    },
  })
