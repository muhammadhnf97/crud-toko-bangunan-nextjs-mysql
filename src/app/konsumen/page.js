"use client"
import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { FiRefreshCcw } from "react-icons/fi"
import { MdAdd } from "react-icons/md"
import ModalAddKonsumen from "../components/ModalAddKonsumen"
import ModalConfirm from "../components/ModalConfirm"

export default function Page () {
    const page = 'konsumen'
    const [dataKonsumen, setDataKonsumen] = useState([])
    const [search, setSearch] = useState('')
    const [konsumenNewValue, setKonsumenNewValue] = useState({
        idpelanggan: '',
        nm_konsumen: '',
        alamat: '',
        no_telp: ''
    })
    
    const [itemsPerPage] = useState(15)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(dataKonsumen.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    let no = 0

    const [showModalKonsumen, setShowModalKonsumen] = useState(false)
    const [aksi, setAksi] = useState('')
    const [isDelete, setIsDelete] = useState(false)

    const getdataKonsumen = async() => {
        const res = await fetch('/api/konsumen/datahandler', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        console.log(data.message)
        setDataKonsumen(data.data)
    }

    const insertKonsumen = async() => {
        const res = await fetch('/api/konsumen/datahandler',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                idpelanggan: konsumenNewValue?.idpelanggan,
                nm_konsumen: konsumenNewValue?.nm_konsumen,
                alamat: konsumenNewValue?.alamat,
                no_telp: konsumenNewValue?.no_telp,
            })
        })

        const data = await res.json()
        console.log(data.message)
        console.log(data.returnData)
        setDataKonsumen(prev=>{
            return [{
                idpelanggan: data?.returnData?.idpelanggan,
                nm_konsumen: data?.returnData?.nm_konsumen,
                alamat: data?.returnData?.alamat,
                no_telp: data?.returnData?.no_telp,
            }, ...prev,]
        })
    }
    

    const updateKonsumen = async() => {
        const res = await fetch('/api/konsumen/datahandler',{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                idpelanggan: konsumenNewValue?.idpelanggan,
                nm_konsumen: konsumenNewValue?.nm_konsumen,
                alamat: konsumenNewValue?.alamat,
                no_telp: konsumenNewValue?.no_telp,
            })
        })

        const data = await res.json()
        console.log(data.message)
        setDataKonsumen(prev=>{
            return prev.map(updateKonsumen => {
                if(updateKonsumen.idpelanggan === data.returnData.idpelanggan){
                    return {
                        idpelanggan: data?.returnData?.idpelanggan,
                        nm_konsumen: data?.returnData?.nm_konsumen,
                        alamat: data?.returnData?.alamat,
                        no_telp: data?.returnData?.no_telp,
                    }
                } else {
                    return updateKonsumen
                }
            })
        })
    }

    const deleteKonsumen = async() => {
        const res = await fetch('/api/konsumen/datahandler', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                idpelanggan: konsumenNewValue.idpelanggan
            })
        })
        await res.json()
        setDataKonsumen(prev=>prev.filter(data=>data.idpelanggan !== konsumenNewValue.idpelanggan))
    }

    useEffect(()=>{
        getdataKonsumen()
    }, [])

    const handleChangeSearchKeyword = (e) =>{
        setSearch(e.target.value)
    }

    const handleSubmitSearch = (e) => {
        e.preventDefault()
        setDataKonsumen(dataKonsumen.filter(data=>data.nm_konsumen.toLowerCase().includes(search.toLowerCase())))
    }

    const handleRefresh = () => {
        getdataKonsumen()
    }

    const handleClickModalKonsumen = (idpelanggan, tipe) => {
        if(tipe === 'edit'){
            setAksi('Edit')
            setKonsumenNewValue(dataKonsumen.find(data=>data.idpelanggan === idpelanggan))
        } 

        if(tipe === 'tambah'){
            setAksi('Tambah')
            setKonsumenNewValue({
                idpelanggan: '',
                nm_konsumen: '',
                alamat: '',
                no_telp: ''
            })
        }

        setShowModalKonsumen(prev=>!prev)
    }

    const handleClickConfirmDelete = (idpelanggan) => {
        setIsDelete(prev=>!prev)
        setAksi('delete')
        setKonsumenNewValue(dataKonsumen?.find(data=>data.idpelanggan === idpelanggan))
    }

    const handleClickConfirmActionDelete = () => {
        deleteKonsumen()
        setIsDelete(prev=>!prev)
    }

    const handlePageChange = (currentNumber) => {
        setCurrentPage(currentNumber)
    }

    const handleSubmitAddNewKonsumen = (e, aksi) => {
        e.preventDefault()
        if(aksi === 'Tambah'){
            insertKonsumen()
            setShowModalKonsumen(prev=>!prev)
        }

        if(aksi === 'Edit'){
            updateKonsumen()
            setShowModalKonsumen(prev=>!prev)
        }
    }

    const handleChangeKonsumenValue = (e) => {
        if(e.target.name === "nm_konsumen"){
            setKonsumenNewValue(prev=>{
                return {
                    ...prev,
                    nm_konsumen: e.target.value
                }
            })
        }
        if(e.target.name === "alamat"){
            setKonsumenNewValue(prev=>{
                return {
                    ...prev,
                    alamat: e.target.value
                }
            })
        }
        if(e.target.name === "no_telp"){
            setKonsumenNewValue(prev=>{
                return {
                    ...prev,
                    no_telp: e.target.value
                }
            })
        }

        
        if(aksi==='Edit'){
            setKonsumenNewValue(prev=>{
                return {
                    ...prev,
                    idpelanggan: konsumenNewValue.idpelanggan,
                }
            })
            return
        }
        
        const idpel = dataKonsumen.map(data=>parseInt(data.idpelanggan.substring(3)))
        const maxIdPel = Math.max(...idpel)+1
        setKonsumenNewValue(prev=>{
            return {
                ...prev,
                idpelanggan: maxIdPel.toString().padStart(6, 'PL-0')
            }
        })
    }

    return (
        <>
        {
            showModalKonsumen && 
            <ModalAddKonsumen
            konsumenNewValue={konsumenNewValue}
            aksi={aksi}
            handleClickModalKonsumen={handleClickModalKonsumen}
            handleSubmitAddNewKonsumen={handleSubmitAddNewKonsumen}
            handleChangeKonsumenValue={handleChangeKonsumenValue} />
        }
        {
            isDelete &&
            <ModalConfirm
            page={page}
            aksi={aksi}
            value={konsumenNewValue.nm_konsumen}
            handleClickConfirmDelete={handleClickConfirmDelete}
            handleClickConfirmActionDelete={handleClickConfirmActionDelete} />
        }
        <section className="max-w-7xl mx-auto space-y-3 bg-white p-3 shadow-md rounded-lg bg-opacity-40">
            <h2 className="text-center text-3xl font-bold">Data Konsumen</h2>
            <div className="flex justify-between items-center">
                <form className="w-full flex items-center gap-2">
                    <div className="flex items-center group">
                        <input type={'text'} id='search' name='search' className="w-96 h-10 border-2 group-border-violet-200 px-3 outline-none group-hover:duration-150 group-hover:border-violet-400" placeholder="Cari barang disini" value={search} onChange={(e)=>handleChangeSearchKeyword(e)} />
                        <button type="submit" className="h-10 bg-violet-200 rounded-tr-lg rounded-br-lg border-2 border-violet-200 px-3 group-hover:bg-violet-400 group-hover:duration-150 group-hover:border-violet-400" onClick={e=>handleSubmitSearch(e)}><FaSearch /></button>
                    </div>
                    <button type="button" className="h-10 bg-violet-200 border-2 border-violet-200 px-3 rounded-lg hover:bg-violet-400 hover:duration-150 hover:border-violet-400" onClick={handleRefresh}><FiRefreshCcw /></button>
                </form>
            <button className="h-10 w-fit bg-violet-200 rounded-full border-2 border-violet-200 px-3 flex gap-1 items-center font-semibold group hover:w-36 hover:bg-violet-400 hover:duration-150 hover:border-violet-400" onClick={()=>handleClickModalKonsumen(null,'tambah')}><MdAdd className="w-6 h-6" /><span className="hidden w-36 group-hover:inline">Tambah Data</span></button>
            </div>
            <table className="table-auto border-collapse mx-auto shadow-lg w-full rounded-lg overflow-hidden">
            <thead className="w-full h-12 bg-slate-100 border-b">
                <tr className="gap-5">
                    <th className="px-5">No</th>
                    <th className="px-5 text-left">ID Konsumen</th>
                    <th className="px-5 text-left">Nama Konsumen</th>
                    <th className="px-5 text-left">Alamat</th>
                    <th className="px-5 text-left">No Telp</th>
                    <th className="px-5">Aksi</th>
                </tr>
            </thead>
            <tbody className="">
                {
                dataKonsumen.map((konsumen, index)=>{
                    no = no + 1
                    return(
                        <tr key={konsumen.idbarang} className={`leading-loose group ${index % 2 === 0 ? 'bg-violet-50' : 'bg-white'} `}>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-center">{no}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{konsumen.idpelanggan}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{konsumen.nm_konsumen}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{konsumen.alamat}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{konsumen.no_telp}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-center flex justify-center items-center gap-2">
                                <button className="shadow-md rounded-lg bg-green-400 px-3" name="edit" onClick={()=>handleClickModalKonsumen(konsumen.idpelanggan, 'edit')}>Edit</button>
                                <button className="shadow-md rounded-lg bg-red-400 px-3" name="delete" onClick={(e)=>handleClickConfirmDelete(konsumen.idpelanggan)}>Delete</button>
                            </td>
                        </tr>
                    ) 
                }).slice(startIndex, endIndex)}
            </tbody>
            </table>
            <div className="w-full flex flex-wrap gap-5 justify-center text-lg">
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
        </section>
        </>
    )
}