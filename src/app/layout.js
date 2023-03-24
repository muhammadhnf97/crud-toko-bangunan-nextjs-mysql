"use client"
import './globals.css'
import './style.css'
import { SessionProvider } from 'next-auth/react'
import Header from './components/Header'
import Image from 'next/image'
import { useState } from 'react'

export default function RootLayout({ children }) {
  const [loading, setIsLoading] = useState(false)

  const showLoading = () => {
    return (
      <div> Loading </div>
    )
  }

  return (
    <html lang="en">
      <head />
      <SessionProvider>
      <body>
        <div className='fixed w-full h-full blur-sm -z-10'>
          <Image src={'/images/bg.jpg'} alt="imgBackground" fill className='object-cover' />
        </div>
        <Header />
        <main className='pt-20'>{children}</main>
      </body>
      </SessionProvider>
    </html>
  )
}
