"use client"
import { useState } from "react";
import { HiOutlineMail } from 'react-icons/hi'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FaUserAlt } from 'react-icons/fa'
import Link from "next/link";


export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [isAlreadySameEmail, setIsAlreadySameEmail] = useState(false)

  const checkEmail = async() => {
    try {
      const res = await fetch(`http://localhost:3000//api/auth/datahandler?email=${email}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await res.json()

      if(data.response.data){
        setIsAlreadySameEmail(true)
        return
      }

      insertData()
    } catch (error) {
      console.error('Failed to get data', error)
    }
  }

  console.log(isSubmit, password)

  const insertData = async() => {
    try { 
      const res = await fetch('http://localhost:3000//api/auth/datahandler',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name, email, password
        })
      })
      await res.json()
      alert("Data telah dibuat")

    } catch (error) {
      console.error('Failed to insert data', error)
    }
  }

  const handleChange = (e, tipe) => {
    if(tipe === 'nama'){
      setName(e.target.value)
      return
    }
    
    if(tipe === 'email'){
        setEmail(e.target.value)
        return
    }

    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmit(true)
    checkEmail()
  }

  console.log(name, email, password)

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-violet-100">
      <form className="w-96 h-96 border-2 rounded-2xl border-slate-600 shadow-lg p-10 md:w-[25rem] space-y-3 relative overflow-hidden bg-white flex flex-col justify-center" onSubmit={(e)=>handleSubmit(e)}>
        <h1 className="text-center font-semibold text-4xl text-violet-700">Daftar disini.</h1>
        <div className="w-full flex flex-col">
          <p>Nama</p>
          <div className="w-full flex items-center justify-center gap-2">
            <input type={'text'} id='nama' name="nama" className="w-full px-3 py-1 border-b duration-150 outline-none text-sm focus:translate-y-1 focus:text-lg focus:border-blue-400 focus:border-b-2" onChange={(e)=>handleChange(e, 'nama')} />
            <FaUserAlt className="w-7 h-7" />
          </div>
        </div>
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
          <button className="w-full bg-blue-400 py-1 rounded-lg text-white font-semibold text-lg hover:bg-blue-600">Sign up</button>
          <p>Sudah punya akun ? <Link href='/' className="font-semibold text-blue-500 hover:text-blue-700">Login disini</Link></p>
        </div>
      </form>
    </main>
  )
}
