"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { formatter } from "@/lib/lib"
import { FaSearch } from "react-icons/fa"
import { FiRefreshCcw } from "react-icons/fi"
import { BsCart4 } from "react-icons/bs"
import { ImCross } from "react-icons/im"

export default function Page() {
    const page="pembelian"
    const session = useSession()
    
    const [dataSupplier, setDataSupplier] = useState([])
    const [newPembelian, setNewPembelian] = useState({
        no_notabeli: null,
        no_pembelian: null,
        user: null,
        idsupplier: null,
        jenis: null
    })

    const [isNewEntry, setIsNewEntry] = useState(false)

    const [dataItems, setDataItems] = useState([])
    
    const [itemsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(dataItems?.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const [search, setSearch] = useState('')
    
    const [confirmBelanja, setConfirmBelanja] = useState({
        no_pembelian: null,
        idbarang: null,
        nm_barang: null,
        hrg_satuan: null,
        stok: null,
        hrg_modal: null,
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
        if(newPembelian.idsupplier !== null && newPembelian.jenis !== null && newPembelian.no_notabeli !== null ){
            setLanjutTambahBarang(true)
            setIsNewEntry(true)
        }
    }

    const getSupplier = async() => {
        const res = await fetch('http://hanifdeveloper.site/api/supplier/datahandler', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setDataSupplier(data.data)
    }

    const getPembelian = async() => {
        const res = await fetch('http://hanifdeveloper.site/api/pembelian/datahandler', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setNewPembelian(pembelian=>({...pembelian, no_pembelian: data.no_pembelian}))
    }

    const getItems = async() => {
        const res = await fetch('http://hanifdeveloper.site/api/items/datahandler', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setDataItems(data.response.data)
    }

    const insertPembelian = async() => {
        const res = await fetch('http://hanifdeveloper.site/api/pembelian/datahandler', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                no_notabeli: newPembelian?.no_notabeli,
                user: session.data.user.name ,
                idsupplier: newPembelian?.idsupplier,
                jenis: newPembelian?.jenis
            })
        })

        const data = await res.json()
    }

    const insertDetailPembelian = async() =>{
        const res = await fetch('http://hanifdeveloper.site/api/pembeliandetail/datahandler', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(keranjangBelanja)
        })
        
        await res.json()
    }

    useEffect(()=>{
        getSupplier()
        getPembelian()
        getItems()
    }, [isNewEntry])

    const handleChangePembelian = (e) => {
        if(e.target.name === 'supplier'){
            setNewPembelian(data=>({...data, idsupplier: e.target.value}))
        } else if(e.target.name === 'jenis'){
            setNewPembelian(data=>({...data, jenis: e.target.value}))
        } else if(e.target.name === 'no_notabeli'){
            setNewPembelian(data=>({ ...data, no_notabeli: e.target.value}))
        }
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

        setConfirmBelanja(()=>{
            return {
                no_pembelian: newPembelian?.no_pembelian,
                idbarang: getSingleItem?.idbarang,
                nm_barang: getSingleItem?.nm_barang,
                stok: getSingleItem?.stok,
                hrg_satuan: getSingleItem?.hrg_satuan,
                jumlah: "",
                hrg_modal: getSingleItem?.hrg_modal,
                }
        })
    }

    const handleChangeDetailKonfirmasiBelanja = (e) => {
        if(e.target.name === 'hrg_modal'){
            setConfirmBelanja(data=>{
                return {
                    ...data,
                    hrg_modal: parseInt(e.target.value)
                }
            })
        } else if(e.target.name === 'jumlah'){
            setConfirmBelanja(data=>{
                return {
                    ...data,
                    jumlah: parseInt(e.target.value)
                }
            })
        }
    }

    const handleSubmitPindahKeKeranjang = (e) => {
        e.preventDefault()

        setKeranjangBelanja(data=>{
            return [
                ...data, {
                    no_pembelian: confirmBelanja?.no_pembelian,
                    idbarang: confirmBelanja?.idbarang,
                    nm_barang: confirmBelanja?.nm_barang,
                    hrg_satuan: confirmBelanja?.hrg_satuan,
                    stok: confirmBelanja?.stok,
                    hrg_modal: confirmBelanja?.hrg_modal,
                    jumlah: confirmBelanja?.jumlah,
                    total: confirmBelanja?.jumlah * confirmBelanja?.hrg_modal
                }]
        })
        setConfirmBelanja({
            no_pembelian: null,
            idbarang: null,
            nm_barang: null,
            hrg_satuan: null,
            stok: null,
            hrg_modal: null,
            jumlah: null,
            total: null
        })
    }

    const handleClickBatalKonfirmasiBarang = (e) => {
        e.preventDefault()
        setConfirmBelanja({
            no_pembelian: null,
            idbarang: null,
            nm_barang: null,
            hrg_satuan: null,
            stok: null,
            hrg_modal: null,
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

    const handleClickBatalPembelian = () => {
        setNewPembelian({
            no_notabeli: null,
            no_pembelian: null,
            user: null,
            idsupplier: null,
            jenis: null
        })
        setConfirmBelanja({
            no_pembelian: null,
            idbarang: null,
            nm_barang: null,
            hrg_satuan: null,
            stok: null,
            hrg_modal: null,
            jumlah: null,
            total: null
        })
        setKeranjangBelanja([])
        setLanjutTambahBarang(false)
        setIsNewEntry(false)
    }

    const handleClickSimpanSeluruhPembelian = async () => {
      insertPembelian()
      insertDetailPembelian()
      setNewPembelian({
        no_notabeli: null,
        no_pembelian: null,
        user: null,
        idsupplier: null,
        jenis: null
      })
      setConfirmBelanja({
          no_pembelian: null,
          idbarang: null,
          nm_barang: null,
          hrg_satuan: null,
          stok: null,
          hrg_modal: null,
          jumlah: null,
          total: null
      })
      setKeranjangBelanja([])
      setLanjutTambahBarang(false)
      setIsNewEntry(false)
    }

    let gtot
    
    useEffect(() => {
        if (newPembelian?.idsupplier === null) {
        document.getElementById('supplier').value = '';
        }
        if (newPembelian?.jenis === null) {
        document.getElementById('jenis').value = '';
        }
    }, [newPembelian]);


    const grandTotal = keranjangBelanja.reduce((gtotal, obj) => gtotal + obj.total, 0)
    
    const handleClickHitungBelanja = () => {
        setKembalian(dibayarkan - grandTotal)
    }

    return (
    <div className="space-y-5 max-w-7xl mx-auto bg-white rounded-lg bg-opacity-40 p-3 shadow-md">
        <div className='flex shadow-md rounded-lg p-3 gap-5 bg-white'>
            <div className="max-w-2xl space-y-3 px-2 rounded-lg">
                <form className="space-y-3" onSubmit={(e)=>handleSubmitVerificationFornextAction(e)}>
                    <div className="flex items-center">
                        <p className="w-28">Supplier</p>
                        <select id="supplier" className="border px-3" name="supplier" onChange={e=>handleChangePembelian(e)} value={newPembelian?.idsupplier === null ? 'Pilih Supplier' : newPembelian?.idsupplier} required>
                            <option value="">{newPembelian?.idsupplier === null ? 'Pilih Supplier' : newPembelian?.idsupplier}</option>
                            {dataSupplier?.map(data => (
                            <option key={data.idsupplier} value={data.idsupplier}>{data.nm_supplier}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <p className="w-28">Nota Beli</p>
                        <input type={'text'} id='no_notabeli' name="no_notabeli" value={newPembelian?.no_notabeli === null ? '' : newPembelian?.no_notabeli} className="border px-3"  onChange={(e)=>handleChangePembelian(e)} required />
                    </div>
                    <div className="flex items-center">
                        <p className="w-28">Jenis</p>
                        <select id="jenis" className="border px-3" name="jenis" value={newPembelian?.jenis === null ? 'Pilih Supplier' : newPembelian?.jenis} onChange={e=>handleChangePembelian(e)} required>
                            <option value="">{newPembelian?.jenis === null ? 'Pilih Jenis' : newPembelian?.jenis}</option>
                            <option value='Tunai'>Tunai</option>
                            <option value='Kredit'>Kredit</option>
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
                        <tbody className={`${!lanjutTambahBarang ? 'hidden bg-white' : '' }`}>
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
                                    <input type='text' name="idbarang" className="w-full border px-3" value={confirmBelanja?.idbarang === null ? '' : confirmBelanja?.idbarang} disabled />
                                </div>
                                <div className="space-y-2">
                                    <p>Nama Barang</p>
                                    <input type='text' name="nm_barang" className="w-full border px-3" value={confirmBelanja?.nm_barang === null ? '' : confirmBelanja?.nm_barang} disabled />
                                </div>
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="space-y-2">
                                    <p>Harga Jual</p>
                                    <input type='text' name="hrg_satuan" className="w-full border px-3" value={confirmBelanja?.hrg_satuan === null ? '' : formatter.format(confirmBelanja?.hrg_satuan)} disabled />
                                </div>
                                <div className="space-y-2">
                                    <p>Stok Tersisa</p>
                                    <input type='number' name="stok" className="w-full border px-3" value={confirmBelanja?.stok === null ? '' : confirmBelanja?.stok} disabled />
                                </div>
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="space-y-2">
                                    <p>Harga Beli</p>
                                    <input type='number' name="hrg_modal" className="w-full border px-3" disabled={confirmBelanja?.hrg_modal === null ? true : false} value={confirmBelanja?.hrg_modal === null ? '' : confirmBelanja?.hrg_modal} onChange={(e)=>handleChangeDetailKonfirmasiBelanja(e)} />
                                </div>
                                <div className="space-y-2">
                                    <p>Jumlah Beli</p>
                                    <input type='number' name="jumlah" className="w-full border px-3" disabled={confirmBelanja?.jumlah === null ? true : false} value={confirmBelanja?.jumlah === null ? '' : confirmBelanja?.jumlah} onChange={(e)=>handleChangeDetailKonfirmasiBelanja(e)} />
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
                                <th className="px-2 text-center">Modal Beli</th>
                                <th className="px-2 text-center">Jumlah</th>
                                <th className="px-2 text-center">Total</th>
                                <th className="px-2 text-center">Aksi</th>
                            </tr>
                        </thead>
                    <tbody>
                        {
                        keranjangBelanja?.map((item, index)=>{
                            return(
                                <tr key={item.idbarang} className={`leading-normal group ${index % 2 === 0 ? 'bg-violet-50' : ''} `} onClick={()=>handleClickKonfirmasiBarang(item.idbarang)}>
                                    <td className="py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-left w-fit">{no = index + 1}</td>
                                    <td className="py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-left">{item.nm_barang}</td>
                                    <td className="py-1 px-2 group-hover:bg-violet-200 group-hover:duration-150 text-left">{formatter.format(item.hrg_modal)}</td>
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
        <div className="w-full gap-5 p-3 flex font-semibold bg-white rounded-lg shadow-md">
            <button className="w-full h-full px-5 py-3 rounded-lg bg-green-300 hover:bg-green-400 active:bg-green-500" onClick={handleClickSimpanSeluruhPembelian}>Simpan</button>
            <button className="w-full h-full px-5 py-3 rounded-lg bg-red-300 hover:bg-red-400 active:bg-red-500" onClick={handleClickBatalPembelian}>Batal</button>
        </div>
    </div>
    )
}