/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string(),
  // DB_USER: z.string(),
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  // DB_USER: process.env.DB_USER
})

if(!configProject.success) {
  console.error(configProject.error.errors)
  throw new Error('Các giá trị khai báo trong biến môi trường không hợp lệ')
}

const envConfig = configProject.data
export default envConfig