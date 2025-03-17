'use client'

import { getAccessTokenFromLocalStorage } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const menuItems = [
  {
    title: 'Món ăn',
    href: '/menu', // authRequired: undefined tức là đăng nhập hay chưa cũng đều cho hiển thị
    authRequired: undefined
  },
  {
    title: 'Đơn hàng',
    href: '/orders',
    authRequired: true
  },
  {
    title: 'Đăng nhập',
    href: '/login',
    authRequired: false // false tức là chưa đăng nhập thì mới hiển thị button "Đăng nhập"
  },
  {
    title: 'Quản lý',
    href: '/manage/dashboard',
    authRequired: true // true tức là đăng nhập thì mới hiển thị button "Quản lý"
  }
]

export default function NavItems({ className }: { className?: string }) {
  // Trên next server, server vẫn đọc được 1 lần duy nhất giá trị khởi tạo của useState, nên 
  // nó biết isAuth là false và render với isAuth là false
  const [isAuth, setIsAuth] = useState(false)

  // Còn useEffect thì hoàn hoàn ko chạy trên server, chỉ chạy trên client, sau khi hydration hoàn tất
  useEffect(() => {
    setIsAuth(Boolean(getAccessTokenFromLocalStorage()))
  }, [])

  return menuItems.map((item) => {
    // const isAuth = Boolean(getAccessTokenFromLocalStorage())
    
    // Lọc từng thằng, đã login rồi thằng nào auRequired = false thì không hiển thị
    // chưa login mà auRequired = true thì không hiển thị
    if ((item.authRequired === false && isAuth) || (item.authRequired === true && !isAuth)) 
      return null

    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    )
  })
}
