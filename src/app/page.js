"use client"
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HiOutlineMail } from 'react-icons/hi'
import { RiLockPasswordFill } from 'react-icons/ri'
import Link from "next/link";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  if (session?.status === 'authenticated') {
    router.push('/dashboard');
  }
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async() => {
    try {
      const data = await signIn('credentials', {
        redirect: false,
        email, password
      })

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e, tipe) => {
    if(tipe === 'email'){
      setEmail(e.target.value)
      return
    }

    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login()
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-violet-100 fixed z-10 top-0">
    <form className="w-96 h-96 border-2 rounded-2xl border-slate-600 shadow-lg p-10 md:w-[25rem] space-y-3 relative overflow-hidden bg-white flex flex-col justify-center" onSubmit={(e)=>handleSubmit(e)}>
        <h1 className="text-center font-semibold text-4xl text-violet-700">Welcome.</h1>
        <div className="w-full flex flex-col">
        <p>Email</p>
        <div className="w-full flex items-center justify-center gap-2">
            <input type={'text'} id='email' name="email" className="w-full px-3 py-1 border-b duration-150 outline-none text-sm focus:translate-y-1 focus:text-lg focus:border-blue-400 focus:border-b-2" onChange={(e)=>handleChange(e, 'email')} />
            <HiOutlineMail className="w-7 h-7" />
        </div>
        </div>
        <div className="w-full flex flex-col">
        <p>Password</p>
        <div className="w-full flex items-center justify-center gap-2">
            <input type={'password'} id='password' name="password" className="w-full px-3 py-1 border-b duration-150 outline-none text-sm focus:translate-y-1 focus:text-lg focus:border-blue-400 focus:border-b-2" onChange={(e)=>handleChange(e, 'password')} />
            <RiLockPasswordFill className="w-7 h-7" />
        </div>
        </div>
        <div className=" w-full flex flex-col justify-center items-center space-y-2">
        <button className="w-full bg-blue-400 py-1 rounded-lg text-white font-semibold text-lg hover:bg-blue-600">Sign in</button>
        <p>Belum mendaftar ? <Link href={"/register"} className="font-semibold text-blue-500 hover:text-blue-700">Daftar Sekarang.</Link></p>
        </div>
    </form>
    </main>
  )
}
