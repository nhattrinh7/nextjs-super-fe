/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { UseFormSetError } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { EntityError } from "./http"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleErrorApi = ({
  error,
  setError,
}: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: 'server',
        message: item.message
      })
    })
  } else {
    toast('Lỗi khi gọi API!')
  }
}

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

const isBrowser = typeof window !== 'undefined'

//--------------------------------------------
// Check xem người dụng đăng nhập hay chưa
export const getAccessTokenFromLocalStorage = () => 
  isBrowser ? localStorage.getItem('accessToken') : null


export const getRefreshTokenFromLocalStorage = () => 
  isBrowser ? localStorage.getItem('refreshToken') : null
