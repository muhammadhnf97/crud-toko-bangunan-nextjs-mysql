"use client"
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import Header from './components/Header'
import { useState } from 'react'

export default function RootLayout({ children }) {
  
  const [isModalLogin, setIsModalLogin] = useState(false)

  const handleClickModalLogin = () => {
      setIsModalLogin(prev=>!prev)
  }
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <SessionProvider>
      <body>
        <Header
        handleClickModalLogin={handleClickModalLogin} />
        <main className='pt-14'>{children}</main>
      </body>
      </SessionProvider>
    </html>
  )
}
