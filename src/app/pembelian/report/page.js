"use client"
import Table from "@/app/components/Table"
import { useEffect, useState } from "react"

export default function Page() {
    const [reportPembelian, setReportPembelian] = useState([])

    useEffect(()=>{
        const getReportPembelian = async() => {
            const res = await fetch('/api/pembelian/report',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            console.log(data.returnData)
            const newData = data.returnData.map(dats=>{
                return {
                    no_pembelian: dats?.no_pembelian,
                    no_notabeli: dats?.no_notabeli,
                    nm_supplier: dats?.nm_supplier,
                    tgl_masuk: dats?.tgl_masuk,
                    nm_barang: dats?.nm_barang,
                    harga_beli: dats?.harga_beli,
                    jumlah_beli : dats?.jumlah,
                    total: dats?.jumlah * dats?.harga_beli 
                }

            })
            console.log(newData)
            setReportPembelian()
        }

        getReportPembelian()
    }, [])

    // console.log(reportPembelian)
    
    const field = ['No Pembelian','No Nota Beli','Nama Supplier','Tanggal Masuk','Nama Barang','Harga Beli','Jumlah Beli','Total']


    return (
        <div className="max-w-7xl mx-auto bg-white rounded-lg bg-opacity-40 shadow-md p-3">
            <Table field={field} />
        </div>
    )
}