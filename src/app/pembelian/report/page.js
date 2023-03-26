"use client"
import Table from "@/app/components/Table"
import { formatter } from "@/lib/lib"
import { useEffect, useState } from "react"
import { FaSearch } from 'react-icons/fa'
import { FiRefreshCcw } from 'react-icons/fi'
import { AiTwotoneCalendar } from 'react-icons/ai'

export default function Page() {
    const field = ['No', 'No Pembelian','No Nota Beli','Nama Supplier','Tanggal Masuk','Nama Barang','Harga Beli','Jumlah Beli','Total Bayar']
    const [dataTable, setDataTable] = useState([])
    const [search, setSearch] = useState('')
    
    const getdataTable = async() => {
        const res = await fetch('http://hanifdeveloper.site/api/pembelian/report',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        const newData = data.returnData.map(dats=>{
            return {
                no_pembelian: dats?.no_pembelian,
                no_notabeli: dats?.no_notabeli,
                nm_supplier: dats?.nm_supplier,
                tgl_masuk: dats?.tgl_masuk.toString().slice(0,10),
                nm_barang: dats?.nm_barang,
                harga_beli: formatter.format(dats?.harga_beli),
                jumlah_beli : dats?.jumlah,
                total: formatter.format(dats?.jumlah * dats?.harga_beli) 
            }

        })
        setDataTable(newData)
    }

    useEffect(()=>{
        getdataTable()
    }, [])
    

    const handleChangeSearchKeyword = (e) => {
        setSearch(e.target.value.toString())
    }
    
    const handleSubmitSearch = (e) => {
        e.preventDefault()
        const filteredData = dataTable.filter((data) => {
            const lowerCaseSearch = search.toLowerCase();
            if (data.nm_supplier.toLowerCase().includes(lowerCaseSearch)) {
              return true;
            }
            if (data.nm_barang.toLowerCase().includes(lowerCaseSearch)) {
              return true;
            }
            if (data.tgl_masuk.toLowerCase().includes(lowerCaseSearch)) {
              return true;
            }
            return false;
          });
          
        setDataTable(filteredData); 
    }

    const handleRefresh = () => {
        getdataTable()
    }

    const handleChangeDate = (e) => {
        setSearch(e.target.value.toString())
    }

    return (
        <div className="max-w-7xl mx-auto bg-white rounded-lg bg-opacity-40 shadow-md p-3 space-y-3">
            <h2 className="text-center font-bold text-3xl">Laporan Pembelian</h2>
            <div className="flex justify-between items-center">
                <form className="w-full flex items-center gap-2">
                    <div className="flex items-center group">
                        <input type={'text'} id='search' name='search' className="w-96 h-10 border-2 group-border-violet-200 px-3 outline-none group-hover:duration-150 group-hover:border-violet-400" placeholder="Cari barang disini" value={search} onChange={(e)=>handleChangeSearchKeyword(e)} />
                        <button type="submit" className="h-10 bg-violet-200 rounded-tr-lg rounded-br-lg border-2 border-violet-200 px-3 group-hover:bg-violet-400 group-hover:duration-150 group-hover:border-violet-400" onClick={e=>handleSubmitSearch(e)}><FaSearch /></button>
                    </div>
                    <div className="relative overflow-hidden h-10 w-10 bg-violet-200 border-2 border-violet-200 rounded-lg hover:bg-violet-400 hover:duration-150 hover:border-violet-400">
                        <AiTwotoneCalendar className="w-full h-full absolute " />
                        <input type={'date'} name='date' className="absolute py-2 rounded-lg right-0 opacity-0 z-10" onChange={(e)=>handleChangeDate(e)} />
                    </div>
                    <button type="button" className="h-10 bg-violet-200 border-2 border-violet-200 px-3 rounded-lg hover:bg-violet-400 hover:duration-150 hover:border-violet-400" onClick={handleRefresh}><FiRefreshCcw /></button>
                </form>
            </div>
            <Table field={field} dataTable={dataTable} />
        </div>
    )
}