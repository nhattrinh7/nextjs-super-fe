/* eslint-disable @typescript-eslint/no-unused-vars */

import { cookies } from "next/headers";
import authApiRequests from "@/apiRequests/auth";


export async function POST() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')
  if (!accessToken || !refreshToken) 
    return Response.json({ message: 'Không nhận được accessToken hoặc refreshToken' }, { status: 200 })
  
  try {
    const result  = await authApiRequests.sLogout({ accessToken, refreshToken })

    return Response.json(result.payload)
  } catch (error) {
    return Response.json({ message: 'Loi khi goi sLogout den backend' }, { status: 200 })
  }
}