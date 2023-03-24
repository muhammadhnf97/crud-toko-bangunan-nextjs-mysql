"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { formatter } from "@/lib/lib"
import { FaSearch } from "react-icons/fa"
import { FiRefreshCcw } from "react-icons/fi"
import { BsCart4 } from "react-icons/bs"
import { ImCross } from "react-icons/im"

export default function Page() {
    const page="penjualan"
    const session = useSession()
    
    const [dataPelanggan, setDataPelanggan] = useState([])
    const [newPenjualan, setNewPenjualan] = useState({
        no_nota: null,
        user: null,
        idpelanggan: null,
    })

    const [isNewEntry, setIsNewEntry] = useState(false)

    const [dataItems, setDataItems] = useState([])
    
    const [itemsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(dataItems?.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const [search, setSearch] = useState('')
    
    const [confirmPenjualan, setConfirmPenjualan] = useState({
        no_nota: null,
        idbarang: null,
        nm_barang: null,
        hrg_satuan: null,
        stok: null,
        jumlah: null,
        total: null
    })
    const [keranjangBelanja, setKeranjangBelanja] = useState([])
    const [lanjutTambahBarang, setLanjutTambahBarang] = useState(false)
    let no

    const [dibayarkan, setDibayarkan] = useState('')
    const [kembalian, setKembalian] = useState(0)

    
    const handleSubmitVerificationFornextAction = (e) => {
        e.preventDefault()
        if(newPenjualan.idpelanggan !== null && newPenjualan.no_nota !== null){
            setLanjutTambahBarang(true)
            setIsNewEntry(true)
        }
    }

    const getPelanggan = async() => {
        const res = await fetch('/api/konsumen/datahandler', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setDataPelanggan(data.data)
    }

    const getPenjualan = async() => {
        const res = await fetch('/api/penjualan/datahandler', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setNewPenjualan(penjualan=>({...penjualan, no_nota: data.no_nota}))
    }

    const getItems = async() => {
        const res = await fetch('/api/items/datahandler', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setDataItems(data.response.data)
    }
    const insertPenjualan = async() => {
        const res = await fetch('/api/penjualan/datahandler', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                no_nota: newPenjualan?.no_nota,
                user: session.data.user.name ,
                idpelanggan: newPenjualan?.idpelanggan,
                jenis: newPenjualan?.jenis
            })
        })

        const data = await res.json()
        console.log(data)
    }

    const insertDetailPenjualan = async() =>{
        const res = await fetch('/api/penjualandetail/datahandler', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(keranjangBelanja)
        })
        
        const data = await res.json()
        console.log(data)
    }

    useEffect(()=>{
        getPelanggan()
        getPenjualan()
        getItems()
    }, [isNewEntry])

    const handleChangePenjualan = (e) => {
        setNewPenjualan(data=>({...data, idpelanggan: e.target.value}))
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleChangeSearchKeyword = (e) =>{
        setSearch(e.target.value)
    }

    const handleSubmitSearch = (e) => { 
        e.preventDefault()
        setDataItems(dataItems?.filter(data=>data.nm_barang.toLowerCase().includes(search.toLowerCase())))
    }

    const handleRefresh = () => {
        getItems()
    }

    const handleClickKonfirmasiBarang = (idbarang) => {
        const getSingleItem = dataItems?.find(data=>data.idbarang === idbarang)

        setConfirmPenjualan(()=>{
            return {
                no_nota: newPenjualan?.no_nota,
                idbarang: getSingleItem?.idbarang,
                nm_barang: getSingleItem?.nm_barang,
                stok: getSingleItem?.stok,
                hrg_satuan: getSingleItem?.hrg_satuan,
                jumlah: "",
                }
        })
    }

    const handleChangeDetailKonfirmasiBelanja = (e) => {
        if(e.target.name === 'hrg_satuan'){
            setConfirmPenjualan(data=>{
                return {
                    ...data,
                    hrg_satuan: parseInt(e.target.value)
                }
            })
            return
        }

        setConfirmPenjualan(data=>{
            return {
                ...data,
                jumlah: parseInt(e.target.value)
            }
        })
    }

    const handleSubmitPindahKeKeranjang = (e) => {
        e.preventDefault()

        setKeranjangBelanja(data=>{
            return [
                ...data, {
                    no_nota: confirmPenjualan?.no_nota,
                    idbarang: confirmPenjualan?.idbarang,
                    nm_barang: confirmPenjualan?.nm_barang,
                    hrg_satuan: confirmPenjualan?.hrg_satuan,
                    stok: confirmPenjualan?.stok,
                    jumlah: confirmPenjualan?.jumlah,
                    total: confirmPenjualan?.jumlah * confirmPenjualan?.hrg_satuan
                }]
        })
        setConfirmPenjualan({
            no_nota: null,
            idbarang: null,
            nm_barang: null,
            hrg_satuan: null,
            stok: null,
            jumlah: null,
            total: null
        })
    }

    const handleClickBatalKonfirmasiBarang = (e) => {
        e.preventDefault()
        setConfirmPenjualan({
            no_nota: null,
            idbarang: null,
            nm_barang: null,
            hrg_satuan: null,
            stok: null,
            jumlah: null,
            total: null
        })
    }

    const handleClickDeleteFromKeranjang = (idbarang) => {
        setKeranjangBelanja(prev=>prev.filter(data=>data.idbarang !== idbarang))
    }

    const handleChangeDibayarkan = (e) => {
        setDibayarkan(e.target.value)
    }

    const handleClickBatalPenjualan = () => {
        setNewPenjualan({
            no_nota: null,
            user: null,
            idpelanggan: null,
            jenis: null
        })
        setConfirmPenjualan({
            no_nota: null,
            idbarang: null,
            nm_barang: null,
            hrg_satuan: null,
            stok: null,
            jumlah: null,
            total: null
        })
        setKeranjangBelanja([])
        setLanjutTambahBarang(false)
        setIsNewEntry(false)
    }

    const handleClickSimpanSeluruhPenjualan = async () => {
      insertPenjualan()
      insertDetailPenjualan()
      setNewPenjualan({
        no_nota: null,
        no_nota: null,
        user: null,
        idpelanggan: null,
        jenis: null
      })
      setConfirmPenjualan({
          no_nota: null,
          idbarang: null,
          nm_barang: null,
          hrg_satuan: null,
          stok: null,
          jumlah: null,
          total: null
      })
      setKeranjangBelanja([])
      setLanjutTambahBarang(false)
      setIsNewEntry(false)
    }

    useEffect(() => {
        if (newPenjualan?.idpelanggan === null) {
        document.getElementById('pelanggan').value = '';
        }
    }, [newPenjualan]);


    const grandTotal = keranjangBelanja.reduce((gtotal, obj) => gtotal + obj.total, 0)
    
    const handleClickHitungBelanja = () => {
        setKembalian(dibayarkan - grandTotal)
    }

    return (
    <div className="space-y-3 max-w-7xl mx-auto bg-white shadow-md p-3 rounded-lg bg-opacity-40">
        <div className='flex shadow-md rounded-lg p-3 gap-5 bg-white'>
            <div className="max-w-2xl space-y-3 px-2 rounded-lg">
                <form className="space-y-3" onSubmit={(e)=>handleSubmitVerificationFornextAction(e)}>
                    <div className="flex items-center">
                        <p className="w-28">Pelanggan</p>
                        <select id="pelanggan" className="border px-3 w-full" name="pelanggan" onChange={e=>handleChangePenjualan(e)} value={newPenjualan?.idpelanggan === null ? 'Pilih Pelanggan' : newPenjualan?.idpelanggan} required>
                            <option value="">{newPenjualan?.idpelanggan === null ? 'Pilih Pelanggan' : newPenjualan?.idpelanggan}</option>
                            {dataPelanggan?.map(data => (
                            <option key={data.idpelanggan} value={data.idpelanggan}>{data.nm_konsumen}</option>
                            ))}
                        </select>
                    </div>
                    <button className="w-full bg-violet-300 hover:bg-violet-400 active:bg-violet-500 active:shadow-inner active:text-violet-50 font-semibold duration-100 rounded-lg shadow-sm py-2">Lanjut</button>
                </form>
                <div className={`flex justify-between items-center`}>
                    <form className="w-full flex items-center gap-2 justify-between">
                        <div className="flex items-center group">
                            <input type={'text'} id='search' name='search' className="w-96 h-10 border-2 group-border-violet-200 px-3 outline-none group-hover:duration-150 group-hover:border-violet-400" disabled={lanjutTambahBarang ? false : true } placeholder="Cari barang disini" value={search} onChange={(e)=>handleChangeSearchKeyword(e)} />
                            <button type="submit" className="h-10 bg-violet-200 rounded-tr-lg rounded-br-lg border-2 border-violet-200 px-3 group-hover:bg-violet-400 group-hover:duration-150 group-hover:border-violet-400"  disabled={lanjutTambahBarang  ? false : true } onClick={e=>handleSubmitSearch(e)}><FaSearch /></button>
                        </div>
                        <button type="button" className="h-10 bg-violet-200 border-2 border-violet-200 px-3 rounded-lg hover:bg-violet-400 hover:duration-150 hover:border-violet-400"  disabled={lanjutTambahBarang  ? false : true } onClick={handleRefresh}><FiRefreshCcw /></button>
                    </form>
                </div>
                <div className="space-y-3 flex flex-col justify-between h-[24rem] py-3">
                    <table className="table-fixed border-collapse mx-auto w-[30rem]">
                        <thead className="w-full h-12 bg-slate-100 border">
                            <tr className="">
                                <th className="px-2 text-left">Nama Item</th>
                                <th className="px-2 text-left">Harga Jual</th>
                                <th className="px-2 text-center">Stok</th>
                                <th className="px-2 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className={`${!lanjutTambahBarang ? 'hidden' : '' }`}>
                            {
                            dataItems?.map((item, index)=>{
                                return(
                                    <tr key={item.idbarang} className={`leading-tight group ${index % 2 === 0 ? 'bg-violet-50' : ''} `}>
                                        <td className="py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-left">{item.nm_barang}</td>
                                        <td className="py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-left">{formatter.format(item.hrg_satuan)}</td>
                                        <td className="py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-center">{item.stok}</td>
                                        <td className="py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-center">
                                            <button className="shadow-sm rounded-lg bg-yellow-200 hover:bg-yellow-300 active:bg-yellow-400 py-1 px-3" name="pilih" onClick={()=>handleClickKonfirmasiBarang(item.idbarang)}>Pilih</button>
                                        </td>
                                    </tr>
                                ) 
                            }).slice(startIndex,endIndex)}
                        </tbody>
                    </table>
                    <div className={`w-full flex flex-wrap gap-5 justify-center text-lg ${!lanjutTambahBarang ? 'hidden' : '' } }`}>
                        {Array.from({ length: totalPages }, (_, i) => {
                            if (
                            i === 0 ||
                            i === totalPages - 1 ||
                            (i >= currentPage - 2 && i <= currentPage + 2)
                            ) {
                            return (
                                <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`font-semibold ${i + 1 === currentPage ? 'border-2 px-2 py-1 rounded-md border-violet-200' : ''}`}
                                >
                                {i + 1}
                                </button>
                            );
                            } else if (i === currentPage - 3 || i === currentPage + 3) {
                            return <span key={i}>...</span>;
                            } else {
                            return null;
                            }
                        })}
                    </div>
                </div>
            </div>
            <div className="flex-1 w-full flex flex-col space-y-3">
                <div className="w-full rounded-lg bg-violet-50 p-3">
                    <h2 className="text-center text-lg font-semibold">Detail Barang</h2>
                    <form className="w-full space-y-3 p-2">
                        <div className="flex w-full gap-3">
                            <div className="flex flex-col flex-1">
                                <div className="space-y-2">
                                    <p>ID Barang</p>
                                    <input type='text' name="idbarang" className="w-full border px-3" value={confirmPenjualan?.idbarang === null ? '' : confirmPenjualan?.idbarang} disabled />
                                </div>
                                <div className="space-y-2">
                                    <p>Nama Barang</p>
                                    <input type='text' name="nm_barang" className="w-full border px-3" value={confirmPenjualan?.nm_barang === null ? '' : confirmPenjualan?.nm_barang} disabled />
                                </div>
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="space-y-2">
                                    <p>Harga Jual</p>
                                    <input type='text' name="hrg_satuan" className="w-full border px-3" value={confirmPenjualan?.hrg_satuan === null ? '' : confirmPenjualan?.hrg_satuan} disabled={confirmPenjualan?.hrg_satuan === null ? true : false} onChange={(e)=>handleChangeDetailKonfirmasiBelanja(e)} />
                                </div>
                                <div className="space-y-2">
                                    <p>Stok Tersisa</p>
                                    <input type='number' name="stok" className="w-full border px-3" value={confirmPenjualan?.stok === null ? '' : confirmPenjualan?.stok} disabled />
                                </div>
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="space-y-2">
                                    <p>Jumlah Jual</p>
                                    <input type='number' name="jumlah" className="w-full border px-3" disabled={confirmPenjualan?.jumlah === null ? true : false} value={confirmPenjualan?.jumlah === null ? '' : confirmPenjualan?.jumlah} onChange={(e)=>handleChangeDetailKonfirmasiBelanja(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex gap-3 justify-center items-center py-[0.5rem]">
                            <button className="rounded-lg flex-1 py-2 bg-green-300 hover:bg-green-400 active:bg-green-500 font-semibold flex items-center justify-center gap-3" onClick={(e)=>handleSubmitPindahKeKeranjang(e)}><BsCart4 />Add to Chart</button>
                            <button className="rounded-lg flex-1 py-2 bg-red-300 hover:bg-red-400 active:bg-red-500 font-semibold flex items-center justify-center gap-3" onClick={(e)=>handleClickBatalKonfirmasiBarang(e)}><ImCross />Cancel</button>
                        </div>
                    </form>
                </div>
                <div className="w-full shadow-sm h-80 overflow-scroll">
                    <table className="table-fixed border-collapse mx-auto w-full">
                        <thead className="w-full h-12 bg-slate-50 border">
                            <tr className="">
                                <th className="px-2 text-left w-fit">No</th>
                                <th className="px-2 text-left">Nama Item</th>
                                <th className="px-2 text-left">Harga Jual</th>
                                <th className="px-2 text-center">Jumlah</th>
                                <th className="px-2 text-center">Total</th>
                                <th className="px-2 text-center">Aksi</th>
                            </tr>
                        </thead>
                    <tbody>
                        {
                        keranjangBelanja?.map((item, index)=>{
                            no = index + 1
                            return(
                                <tr key={item.idbarang} className={`leading-normal group ${index % 2 === 0 ? 'bg-violet-50' : ''} `} onClick={()=>handleClickKonfirmasiBarang(item.idbarang)}>
                                    <td className="py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-left w-fit">{no}</td>
                                    <td className="py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-left">{item.nm_barang}</td>
                                    <td className="py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-center">{formatter.format(item.hrg_satuan)}</td>
                                    <td className="py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-center">{item.jumlah}</td>
                                    <td className="py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-center">{formatter.format(item.total)}</td>
                                    <td className="py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-center">
                                        <button className="shadow-md rounded-lg bg-red-300 hover:red-400 active:red-500 py-1 px-3 flex items-center justify-center" name="delete" onClick={()=>handleClickDeleteFromKeranjang(item.idbarang)}><ImCross /></button>
                                    </td>
                                </tr>
                            ) 
                        })}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="w-full shadow-md gap-5 p-3 flex h-full bg-white rounded-lg">
            <div className="w-full flex flex-col space-y-2">
                <div className="w-full flex">
                    <div className="w-40 py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-center border border-biolet-100 text-lg h-full bg-violet-50" colSpan={3}>Total Belanja</div>
                    <div className="flex-1 py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-left border border-biolet-100 text-xl font-semibold" colSpan={3}>{formatter.format(grandTotal)}</div>
                </div>
                <div className="w-full flex">
                    <div className="w-40 py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-center border border-biolet-100 text-lg h-full bg-violet-50" colSpan={3}>Dibayarkan</div>
                    <div className="flex-1 py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-center border border-biolet-100 text-lg h-full bg-violet-5" colSpan={3}><input type={'number'} className="px-3 py-1 w-full" name="dibayarkan" value={dibayarkan} onChange={(e)=>handleChangeDibayarkan(e)} /></div>
                </div>
                <div className="w-full flex">
                    <button className="w-full mx-auto px-5 py-3 rounded-lg bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500" colSpan={3} onClick={handleClickHitungBelanja}>Hitung</button>
                </div>
                <div className="w-full flex">
                    <div className="w-40 py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-center border border-biolet-100 text-lg h-full bg-violet-50" colSpan={3}>Kembalian</div>
                    <div className="flex-1 py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-left border border-biolet-100 text-xl font-semibold" colSpan={3}>{dibayarkan === null ? 0 : formatter.format(kembalian)}</div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-3 font-semibold">
                <button className="w-full h-full px-5 py-3 rounded-lg bg-green-300 hover:bg-green-400 active:bg-green-500" onClick={handleClickSimpanSeluruhPenjualan}>Selesai</button>
                <button className="w-full h-full px-5 py-3 rounded-lg bg-red-300 hover:bg-red-400 active:bg-red-500" onClick={handleClickBatalPenjualan}>Batal</button>
            </div>
        </div>
    </div>
    )
}