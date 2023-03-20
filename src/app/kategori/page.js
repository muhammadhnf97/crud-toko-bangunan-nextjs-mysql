
"use client"
import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { FiRefreshCcw } from "react-icons/fi"
import { MdAdd } from "react-icons/md"
import ModalAddKategori from "../components/ModalAddKategori"
import ModalConfirm from "../components/ModalConfirm"

export default function Page () {
    const page = 'kategori'
    const [kategories, setKategories] = useState([])
    const [search, setSearch] = useState('')
    
    
    const [itemsPerPage] = useState(15)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(kategories.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    let no = 0

    const [addNewKategori, setAddNewKategori] = useState({
        idkategori:'',
        nm_kategori: ''
    })

    const [isDelete, setIsDelete] = useState('')
    const [aksi, setAksi] = useState('')

    const [showModalAddKategori, setShowModalAddKategori] = useState(false)

    
    const insertKategori = async() => {
        const res = await fetch('/api/kategori/datahandler',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nm_kategori: addNewKategori?.nm_kategori,
            })
        })

        const data = await res.json()
        console.log(data.response.message)
        console.log(data.response.returnData)
        setKategories(prev=>{
            return [{
                nm_kategori: data?.response?.returnData?.nm_kategori,
            }, ...prev,]
        })
    }

    const getKategori = async() => {
        const res = await fetch('/api/kategori/datahandler',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        console.log(data.response.message)
        setKategories(data.response.data)
    }
  
    const updateKategori = async() => {
        const res = await fetch('/api/kategori/datahandler',{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                idkategori: addNewKategori?.idkategori,
                nm_kategori: addNewKategori?.nm_kategori
            })
        })

        const data = await res.json()
        setKategories(prev=>{
            return prev.map(updated => {
                if(updated.idkategori === data.response.returnData.idkategori){
                    return {
                        idkategori: data?.response?.returnData?.idkategori,
                        nm_kategori: data?.response?.returnData?.nm_kategori,
                    }
                } else {
                    return updated
                }
            })
        })
    }

    const deleteKategori = async() => {
        const res = await fetch('/api/kategori/datahandler', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                idkategori: addNewKategori.idkategori
            })
        })
        const data = await res.json()
        setKategories(prev=>prev.filter(data=>data.idkategori !== addNewKategori.idkategori))
    }

    const handleChangeSearchKeyword = (e) => {
        setSearch(e.target.value)
    }
    
    const handleSubmitSearch = (e) => {
        e.preventDefault()
        setKategories(kategories.filter(data=>data.nm_kategori.toLowerCase().includes(search.toLowerCase())))
    }

    const handleRefresh = () => {
        getKategori()
    }

    const handleClickModalAddKategori = (idkategori, tipe) => {
        if(tipe === 'edit'){
            setAksi('Edit')
            setAddNewKategori(kategories.find(data=>data.idkategori == idkategori))
        } 

        if(tipe === 'tambah'){
            setAksi('Tambah')
            setAddNewKategori({
                idkategori: '',
                nm_kategori: '',
            })
        }

        setShowModalAddKategori(prev=>!prev)

    }

    const handleClickConfirmDelete = (idkategori) => {
            setIsDelete(prev=>!prev)
            setAksi('delete')
            setAddNewKategori(kategories?.find(data=>data.idkategori === idkategori))
    }

    const handleClickConfirmActionDelete = () => {
        deleteKategori()
        setIsDelete(prev=>!prev)
    }

    const handlePageChange = (currentNumber) => {
        setCurrentPage(currentNumber)
    }

    const handleSubmitAddNewKategori = (e, aksi) => {
        e.preventDefault()
        if(aksi === 'Tambah'){
            insertKategori()
            setShowModalAddKategori(prev=>!prev)
            setAddNewKategori({
                idkategori: '',
                nm_kategori: '',
            })
        }

        if(aksi === 'Edit'){
            updateKategori()
            setShowModalAddKategori(prev=>!prev)
            setAddNewKategori({
                idkategori: '',
                nm_kategori: '',
            })
        }
    }

    
    const handleChangeNewKategori = (e) => {
        if(e.target.name === "idkategori"){
            setAddNewKategori(prev=>{
                return {
                    ...prev,
                    idkategori: e.target.value
                }
            })
        } else if(e.target.name === "nm_kategori"){
            setAddNewKategori(prev=>{
                return {
                    ...prev,
                    nm_kategori: e.target.value
                }
            })
        }
    }
    console.log(addNewKategori)

    useEffect(()=>{
        getKategori()
    }, [])
    

    return (
        <>
        {
            showModalAddKategori && 
            <ModalAddKategori
            addNewKategori={addNewKategori}
            aksi={aksi}
            handleClickModalAddKategori={handleClickModalAddKategori}
            handleSubmitAddNewKategori={handleSubmitAddNewKategori}
            handleChangeNewKategori={handleChangeNewKategori} />
        }
        {
            isDelete &&
            <ModalConfirm
            page={page}
            aksi={aksi}
            value={addNewKategori.nm_kategori}
            handleClickConfirmDelete={handleClickConfirmDelete}
            handleClickConfirmActionDelete={handleClickConfirmActionDelete} />
        }
        <section className="max-w-7xl mx-auto space-y-3">
            <h2 className="text-center text-3xl font-bold">Data Kategori</h2>
            <div className="flex justify-between items-center">
                <form className="w-full flex items-center gap-2">
                    <div className="flex items-center group">
                        <input type={'text'} id='search' name='search' className="w-96 h-10 border-2 group-border-violet-200 px-3 outline-none group-hover:duration-150 group-hover:border-violet-400" placeholder="Cari barang disini" value={search} onChange={(e)=>handleChangeSearchKeyword(e)} />
                        <button type="submit" className="h-10 bg-violet-200 rounded-tr-lg rounded-br-lg border-2 border-violet-200 px-3 group-hover:bg-violet-400 group-hover:duration-150 group-hover:border-violet-400" onClick={e=>handleSubmitSearch(e)}><FaSearch /></button>
                    </div>
                    <button type="button" className="h-10 bg-violet-200 border-2 border-violet-200 px-3 rounded-lg hover:bg-violet-400 hover:duration-150 hover:border-violet-400" onClick={handleRefresh}><FiRefreshCcw /></button>
                </form>
            <button className="h-10 w-fit bg-violet-200 rounded-full border-2 border-violet-200 px-3 flex gap-1 items-center font-semibold group hover:w-36 hover:bg-violet-400 hover:duration-150 hover:border-violet-400" onClick={()=>handleClickModalAddKategori(null,'tambah')}><MdAdd className="w-6 h-6" /><span className="hidden w-36 group-hover:inline">Tambah Data</span></button>
            </div>
            <table className="table-auto border-collapse mx-auto shadow-lg w-full rounded-lg overflow-hidden">
            <thead className="w-full h-12 bg-slate-100 border-b">
                <tr className="gap-5">
                    <th className="px-5">No</th>
                    <th className="px-5 text-left">Nama Kategori</th>
                    <th className="px-5">Aksi</th>
                </tr>
            </thead>
            <tbody className="">
                {
                kategories.map((kat, index)=>{
                    no = no + 1
                    return(
                        <tr key={kat.idbarang} className={`leading-loose group ${index % 2 === 0 ? 'bg-violet-50' : ''} `}>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-center">{no}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{kat.nm_kategori}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-center flex justify-center items-center gap-2">
                                <button className="shadow-md rounded-lg bg-green-400 px-3" name="edit" onClick={()=>handleClickModalAddKategori(kat.idkategori, 'edit')}>Edit</button>
                                <button className="shadow-md rounded-lg bg-red-400 px-3" name="delete" onClick={(e)=>handleClickConfirmDelete(kat.idkategori)}>Delete</button>
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