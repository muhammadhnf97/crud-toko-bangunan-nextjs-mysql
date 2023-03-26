"use client"
import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { FiRefreshCcw } from "react-icons/fi"
import { MdAdd } from "react-icons/md"
import ModalAddSupplier from "../components/ModalAddSupplier"
import ModalConfirm from "../components/ModalConfirm"

export default function Page () {
    const page = 'supplier'
    const [dataSupplier, setDataSupplier] = useState([])
    const [search, setSearch] = useState('')
    const [supplierNewValue, setSupplierNewValue] = useState({
        idsupplier: '',
        nm_supplier: '',
        alamat: '',
        no_telp: '',
        kontak: ''
    })
    
    const [itemsPerPage] = useState(15)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(dataSupplier.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    let no = 0

    const [showModalSupplier, setShowModalSupplier] = useState(false)
    const [aksi, setAksi] = useState('')
    const [isDelete, setIsDelete] = useState(false)

    const getdataSupplier = async() => {
        const res = await fetch('/api/supplier/datahandler', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setDataSupplier(data.data)
    }

    const insertSupplier = async() => {
        const res = await fetch('/api/supplier/datahandler',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                idsupplier: supplierNewValue?.idsupplier,
                nm_supplier: supplierNewValue?.nm_supplier,
                alamat: supplierNewValue?.alamat,
                no_telp: supplierNewValue?.no_telp,
                kontak:supplierNewValue?.kontak
            })
        })

        const data = await res.json()
        setDataSupplier(prev=>{
            return [{
                idsupplier: data?.returnData?.idsupplier,
                nm_supplier: data?.returnData?.nm_supplier,
                alamat: data?.returnData?.alamat,
                no_telp: data?.returnData?.no_telp,
                kontak: data?.returnData?.kontak
            }, ...prev,]
        })
    }
    

    const updateSupplier = async() => {
        const res = await fetch('/api/supplier/datahandler',{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                idsupplier: supplierNewValue?.idsupplier,
                nm_supplier: supplierNewValue?.nm_supplier,
                alamat: supplierNewValue?.alamat,
                no_telp: supplierNewValue?.no_telp,
                kontak:supplierNewValue?.kontak
            })
        })

        const data = await res.json()
        setDataSupplier(prev=>{
            return prev.map(supplierUpdate => {
                if(supplierUpdate.idsupplier === data.returnData.idsupplier){
                    return {
                        idsupplier: data?.returnData?.idsupplier,
                        nm_supplier: data?.returnData?.nm_supplier,
                        alamat: data?.returnData?.alamat,
                        no_telp: data?.returnData?.no_telp,
                        kontak: data?.returnData?.kontak
                    }
                } else {
                    return supplierUpdate
                }
            })
        })
    }

    const deleteSupplier = async() => {
        const res = await fetch('/api/supplier/datahandler', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                idsupplier: supplierNewValue.idsupplier
            })
        })
        await res.json()
        setDataSupplier(prev=>prev.filter(data=>data.idsupplier !== supplierNewValue.idsupplier))
    }

    useEffect(()=>{
        getdataSupplier()
    }, [])

    const handleChangeSearchKeyword = (e) =>{
        setSearch(e.target.value)
    }

    const handleSubmitSearch = (e) => {
        e.preventDefault()
        setDataSupplier(dataSupplier.filter(data=>data.nm_supplier.toLowerCase().includes(search.toLowerCase())))
    }

    const handleRefresh = () => {
        getdataSupplier()
    }

    const handleClickModalSupplier = (idsupplier, tipe) => {
        if(tipe === 'edit'){
            setAksi('Edit')
            setSupplierNewValue(dataSupplier.find(data=>data.idsupplier === idsupplier))
        } 

        if(tipe === 'tambah'){
            setAksi('Tambah')
            setSupplierNewValue({
                idsupplier: '',
                nm_supplier: '',
                alamat: '',
                no_telp: '',
                kontak: ''
            })
        }

        setShowModalSupplier(prev=>!prev)
    }

    const handleClickConfirmDelete = (idsupplier) => {
        setIsDelete(prev=>!prev)
        setAksi('delete')
        setSupplierNewValue(dataSupplier?.find(data=>data.idsupplier === idsupplier))
    }

    const handleClickConfirmActionDelete = () => {
        deleteSupplier()
        setIsDelete(prev=>!prev)
    }

    const handlePageChange = (currentNumber) => {
        setCurrentPage(currentNumber)
    }

    const handleSubmitAddNewsupplier = (e, aksi) => {
        e.preventDefault()
        if(aksi === 'Tambah'){
            insertSupplier()
            setShowModalSupplier(prev=>!prev)
        }

        if(aksi === 'Edit'){
            updateSupplier()
            setShowModalSupplier(prev=>!prev)
        }
    }

    const handleChangeSupplierValue = (e) => {
        if(e.target.name === "nm_supplier"){
            setSupplierNewValue(prev=>{
                return {
                    ...prev,
                    nm_supplier: e.target.value
                }
            })
        }
        if(e.target.name === "alamat"){
            setSupplierNewValue(prev=>{
                return {
                    ...prev,
                    alamat: e.target.value
                }
            })
        }
        if(e.target.name === "no_telp"){
            setSupplierNewValue(prev=>{
                return {
                    ...prev,
                    no_telp: e.target.value
                }
            })
        }
        if(e.target.name === "kontak"){
            setSupplierNewValue(prev=>{
                return {
                    ...prev,
                    kontak: e.target.value
                }
            })
        }

        
        if(aksi==='Edit'){
            setSupplierNewValue(prev=>{
                return {
                    ...prev,
                    idsupplier: supplierNewValue.idsupplier,
                }
            })
            return
        }
        
        const idSup = dataSupplier.map(data=>parseInt(data.idsupplier.substring(3)))
        const maxIdSup = Math.max(...idSup)+1
        setSupplierNewValue(prev=>{
            return {
                ...prev,
                idsupplier: maxIdSup.toString().padStart(6, 'PS-0')
            }
        })
    }
    return (
        <>
        {
            showModalSupplier && 
            <ModalAddSupplier
            supplierNewValue={supplierNewValue}
            aksi={aksi}
            handleClickModalSupplier={handleClickModalSupplier}
            handleSubmitAddNewsupplier={handleSubmitAddNewsupplier}
            handleChangeSupplierValue={handleChangeSupplierValue} />
        }
        {
            isDelete &&
            <ModalConfirm
            page={page}
            aksi={aksi}
            value={supplierNewValue.nm_supplier}
            handleClickConfirmDelete={handleClickConfirmDelete}
            handleClickConfirmActionDelete={handleClickConfirmActionDelete} />
        }
        <section className="max-w-7xl mx-auto space-y-3">
            <h2 className="text-center text-3xl font-bold">Data supplier</h2>
            <div className="flex justify-between items-center">
                <form className="w-full flex items-center gap-2">
                    <div className="flex items-center group">
                        <input type={'text'} id='search' name='search' className="w-96 h-10 border-2 group-border-violet-200 px-3 outline-none group-hover:duration-150 group-hover:border-violet-400" placeholder="Cari barang disini" value={search} onChange={(e)=>handleChangeSearchKeyword(e)} />
                        <button type="submit" className="h-10 bg-violet-200 rounded-tr-lg rounded-br-lg border-2 border-violet-200 px-3 group-hover:bg-violet-400 group-hover:duration-150 group-hover:border-violet-400" onClick={e=>handleSubmitSearch(e)}><FaSearch /></button>
                    </div>
                    <button type="button" className="h-10 bg-violet-200 border-2 border-violet-200 px-3 rounded-lg hover:bg-violet-400 hover:duration-150 hover:border-violet-400" onClick={handleRefresh}><FiRefreshCcw /></button>
                </form>
            <button className="h-10 w-fit bg-violet-200 rounded-full border-2 border-violet-200 px-3 flex gap-1 items-center font-semibold group hover:w-36 hover:bg-violet-400 hover:duration-150 hover:border-violet-400" onClick={()=>handleClickModalSupplier(null,'tambah')}><MdAdd className="w-6 h-6" /><span className="hidden w-36 group-hover:inline">Tambah Data</span></button>
            </div>
            <table className="table-auto border-collapse mx-auto shadow-lg w-full rounded-lg overflow-hidden">
            <thead className="w-full h-12 bg-slate-100 border-b">
                <tr className="gap-5">
                    <th className="px-5">No</th>
                    <th className="px-5 text-left">ID Supplier</th>
                    <th className="px-5 text-left">Nama Supplier</th>
                    <th className="px-5 text-left">Alamat</th>
                    <th className="px-5 text-left">No Telp</th>
                    <th className="px-5 text-left">Kontak</th>
                    <th className="px-5">Aksi</th>
                </tr>
            </thead>
            <tbody className="">
                {
                dataSupplier.map((supplier, index)=>{
                    no = no + 1
                    return(
                        <tr key={supplier.idbarang} className={`leading-loose group ${index % 2 === 0 ? 'bg-violet-50' : ''} `}>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-center">{no}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{supplier.idsupplier}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{supplier.nm_supplier}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{supplier.alamat}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{supplier.no_telp}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{supplier.kontak}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-center flex justify-center items-center gap-2">
                                <button className="shadow-md rounded-lg bg-green-400 px-3" name="edit" onClick={()=>handleClickModalSupplier(supplier.idsupplier, 'edit')}>Edit</button>
                                <button className="shadow-md rounded-lg bg-red-400 px-3" name="delete" onClick={(e)=>handleClickConfirmDelete(supplier.idsupplier)}>Delete</button>
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