import { signOut, useSession } from "next-auth/react"
import {RiLogoutCircleLine} from 'react-icons/ri'
import {AiOutlineArrowRight} from 'react-icons/ai'
import Link from "next/link"

export default function Header () {
    const session = useSession()

    return (
        <>
        {session?.data && <nav className="w-full h-14 fixed flex items-center px-10 shadow-sm bg-violet-200 justify-between ">
            <div className="gap-5 flex">
                <p className="w-20 hover:text-violet-900 cursor-pointer">Home</p>
                <div className="group w-20">
                    <button className="hover:text-violet-900">Master</button>
                    <div className="hidden absolute bg-white border rounded-lg w-40 px-5 group-hover:flex flex-col space-y-1 py-1">
                        <Link href='/items' className="py-2 hover:font-semibold hover:pl-3 hover:scale-110 duration-150 group/arrow"><AiOutlineArrowRight className="hidden group-hover/arrow:inline group-hover/arrow:pr-1" />Items</Link>
                        <p className="cursor-pointer py-2 hover:font-semibold hover:pl-3 hover:scale-110 duration-150 group/arrow"><AiOutlineArrowRight className="hidden group-hover/arrow:inline group-hover/arrow:pr-1" />Kategori</p>
                        <p className="cursor-pointer py-2 hover:font-semibold hover:pl-3 hover:scale-110 duration-150 group/arrow"><AiOutlineArrowRight className="hidden group-hover/arrow:inline group-hover/arrow:pr-1" />Konsumen</p>
                        <p className="cursor-pointer py-2 hover:font-semibold hover:pl-3 hover:scale-110 duration-150 group/arrow"><AiOutlineArrowRight className="hidden group-hover/arrow:inline group-hover/arrow:pr-1" />Supplier</p>
                    </div>
                </div>
                <div className="group w-20">
                    <button className="hover:text-violet-900">Transaksi</button>
                    <div className="hidden absolute bg-white border rounded-lg w-40 px-5 group-hover:flex flex-col space-y-1 py-1">
                        <p className="cursor-pointer py-2 hover:font-semibold hover:pl-3 hover:scale-110 duration-150 group/arrow"><AiOutlineArrowRight className="hidden group-hover/arrow:inline group-hover/arrow:pr-1" />Penjualan</p>
                        <p className="cursor-pointer py-2 hover:font-semibold hover:pl-3 hover:scale-110 duration-150 group/arrow"><AiOutlineArrowRight className="hidden group-hover/arrow:inline group-hover/arrow:pr-1" />Pembelian</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-evenly items-center gap-5">
                <p className="text-base">Hi, <span className="">{session.data.user.name}</span> !</p>
                <button className="bg-white font-semibold px-3 py-1 rounded-md shadow-md hover:bg-slate-50 w-10 h-10" onClick={()=>signOut()}><RiLogoutCircleLine /></button>
            </div>
        </nav>}
        </>
    )
}