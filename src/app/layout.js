"use client"
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import Header from './components/Header'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <SessionProvider>
      <body>
        <Header />
        <main className='pt-16'>{children}</main>
      </body>
      </SessionProvider>
    </html>
  )
}
