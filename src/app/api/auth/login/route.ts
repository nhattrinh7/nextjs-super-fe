import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { cookies } from "next/headers";
import authApiRequests from "@/apiRequests/auth";
import jwt from "jsonwebtoken"
import { HttpError } from "@/lib/http";

export async function POST(request: Request) {
  const body = await request.json() as LoginBodyType
  const cookieStore = cookies()
  try {
    // Gọi API
    const { payload } = await authApiRequests.sLogin(body)
    const { accessToken, refreshToken } = payload.data
    // Mình muốn lấy cái thuộc tính exp của token, nhưng hệ thống ko biết decodedAccessToken có thuộc tính exp ko
    // Nên mình ép kiểu nói rằng chắc chắn decodedAccessToken là 1 object có thuộc tính exp để đỡ bị báo lỗi
    const decodedAccessToken = jwt.decode(accessToken) as { exp: number }
    const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number }
    cookieStore.set('accessToken', accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodedAccessToken.exp * 1000 // expires nhận miligiays mà exp là giây nên nhân với 1000
    })
    cookieStore.set('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodedRefreshToken.exp * 1000 // expires nhận miligiays mà exp là giây nên nhân với 1000
    })
    return Response.json(payload)
  } catch (error) {
    console.log('error', error)
    if (error instanceof HttpError) {
      return Response.json(error.payload, { status: error.status })
    } else {
      return Response.json({ message: 'Lỗi server' }, { status: 500 })
    }
  }
}