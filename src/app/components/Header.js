import { signOut, useSession } from "next-auth/react"
import {RiLogoutCircleLine} from 'react-icons/ri'
import {AiOutlineArrowRight} from 'react-icons/ai'
import {HiViewGridAdd} from 'react-icons/hi'
import {GrHomeRounded} from 'react-icons/gr'
import {GrTransaction} from 'react-icons/gr'
import {TbReportAnalytics} from 'react-icons/tb'
import Link from "next/link"

export default function Header () {
    const session = useSession()

    return (
        <>
         <nav className="w-full h-14 font-semibold fixed flex items-center px-10 shadow-sm bg-violet-200 justify-between ">
         { session?.status === 'authenticated' ? 
            <>
            <div className="gap-6 flex">
                <Link href={'/dashboard'} className="w-20 hover:text-violet-900 flex items-center justify-center gap-2"><GrHomeRounded />Home</Link>
                <div className="group w-20">
                    <button className="hover:text-violet-900 flex items-center gap-2 justify-center"><HiViewGridAdd />Master</button>
                    <div className="hidden absolute bg-white border rounded-lg w-40 px-5 group-hover:flex flex-col space-y-1 py-1">
                        <Link href='/items' className="py-2 hover:font-semibold hover:pl-3 hover:scale-110 duration-150 group/arrow"><AiOutlineArrowRight className="hidden group-hover/arrow:inline group-hover/arrow:pr-1" />Items</Link>
                        <Link href='/kategori' className="py-2 hover:font-semibold hover:pl-3 hover:scale-110 duration-150 group/arrow"><AiOutlineArrowRight className="hidden group-hover/arrow:inline group-hover/arrow:pr-1" />Kategori</Link>
                        <Link href='/konsumen' className="py-2 hover:font-semibold hover:pl-3 hover:scale-110 duration-150 group/arrow"><AiOutlineArrowRight className="hidden group-hover/arrow:inline group-hover/arrow:pr-1" />Konsumen</Link>
                        <Link href='/supplier' className="py-2 hover:font-semibold hover:pl-3 hover:scale-110 duration-150 group/arrow"><AiOutlineArrowRight className="hidden group-hover/arrow:inline group-hover/arrow:pr-1" />Supplier</Link>
                    </div>
                </div>
                <div className="group w-20">
                    <button className="hover:text-violet-900 flex items-center gap-2 justify-center"><GrTransaction/>Transaksi</button>
                    <div className="hidden absolute bg-white border rounded-lg w-40 px-5 group-hover:flex flex-col space-y-1 py-1">
                        <Link href='/pembelian' className="py-2 hover:font-semibold hover:pl-3 hover:scale-110 duration-150 group/arrow"><AiOutlineArrowRight className="hidden group-hover/arrow:inline group-hover/arrow:pr-1" />Pembelian</Link>
                        <Link href='/penjualan' className="py-2 hover:font-semibold hover:pl-3 hover:scale-110 duration-150 group/arrow"><AiOutlineArrowRight className="hidden group-hover/arrow:inline group-hover/arrow:pr-1" />Penjualan</Link>
                    </div>
                </div>
                <div className="group w-20">
                    <button className="hover:text-violet-900 flex items-center gap-2 justify-center"><TbReportAnalytics />Laporan</button>
                    <div className="hidden absolute bg-white border rounded-lg w-40 px-5 group-hover:flex flex-col space-y-1 py-1">
                        <Link href='/pembelian/report' className="py-2 hover:font-semibold hover:pl-3 hover:scale-110 duration-150 group/arrow"><AiOutlineArrowRight className="hidden group-hover/arrow:inline group-hover/arrow:pr-1" />Pembelian</Link>
                        <Link href='/penjualan/report' className="py-2 hover:font-semibold hover:pl-3 hover:scale-110 duration-150 group/arrow"><AiOutlineArrowRight className="hidden group-hover/arrow:inline group-hover/arrow:pr-1" />Penjualan</Link>
                    </div>
                </div>
            </div>
            <div className="flex justify-evenly items-center gap-5">
                <p className="text-base">Hi, <span className="">{session?.data?.user?.name}</span> !</p>
                <button className="bg-white font-semibold px-3 py-1 rounded-md shadow-md hover:bg-slate-50 w-10 h-10" onClick={()=>signOut()}><RiLogoutCircleLine /></button>
            </div>
            </> 
            : 
            <div className="gap-5 w-full flex justify-end">
                <p className="px-3 py-2 flex justify-center gap-2 items-center drop-shadow-md"> Please Login First ... </p>
            </div>
            }
        </nav>
        </>
    )
}