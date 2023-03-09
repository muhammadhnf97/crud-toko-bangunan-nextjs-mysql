'use client'
import { useEffect, useState } from "react"
import { formatter } from "@/lib/lib"
import { FaSearch } from "react-icons/fa"
import { FiRefreshCcw } from "react-icons/fi"
import { MdAdd } from "react-icons/md"
import ModalAddItems from "../components/ModalAddItems"
import ModalConfirm from "../components/ModalConfirm"
import { tableItems } from "@/lib/lib"

export default function Items () {
    const [items, setItems] = useState([])
    const [addItems, setAddItems] = useState({
        idbarang: '',
        nm_barang: '',
        hrg_modal: '',
        hrg_satuan: '',
        stok: '',
        idkategori: '',
        nm_kategori: ''
    })
    const [search, setSearch] = useState('')
    const [isAddItem, setIsAddItem] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [aksi, setAksi] = useState('')
    const [getId, setGetId] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(15)

    const totalPages = Math.ceil(items.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    let no = 0
    
    const [listKategori, setListKategori] = useState([])

    const getKategori = async() => {
        const res = await fetch('/api/kategori/datahandler',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        console.log(data.response.message)
        setListKategori(data.response.data)
    }
    
    const getItems = async() => {
        const res = await fetch('/api/items/datahandler',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setItems(data.response.data)
    }

    const insertItems = async() => {
        const res = await fetch('/api/items/datahandler',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                idbarang: addItems?.idbarang,
                nm_barang: addItems?.nm_barang,
                hrg_modal: addItems?.hrg_modal,
                hrg_satuan: addItems?.hrg_satuan,
                stok: addItems?.stok,
                idkategori: addItems?.idkategori,
                nm_kategori: addItems?.nm_kategori
            })
        })

        const data = await res.json()
        console.log(data.response.message)
        console.log(data.response.returnData)
        setItems(prev=>{
            return [{
                idbarang: data?.response?.returnData?.idbarang,
                nm_barang: data?.response?.returnData?.nm_barang,
                hrg_modal: data?.response?.returnData?.hrg_modal,
                hrg_satuan: data?.response?.returnData?.hrg_satuan,
                stok: data?.response?.returnData?.stok,
                idkategori: data?.response?.returnData?.idkategori,
                nm_kategori: data?.response?.returnData?.nm_kategori
            }, ...prev,]
        })
    }

    
    const deleteItem = async() => {
        const res = await fetch('/api/items/datahandler', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                idbarang: getId
            })
        })
        const data = await res.json()
        console.log(data)
        setItems(prev=>prev.filter(data=>data.idbarang !== getId))
        setGetId('')
    }

    const updateItem = async() => {
        const res = await fetch('/api/items/datahandler',{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                idbarang: addItems?.idbarang,
                nm_barang: addItems?.nm_barang,
                hrg_modal: addItems?.hrg_modal,
                hrg_satuan: addItems?.hrg_satuan,
                stok: addItems?.stok,
                idkategori: addItems?.idkategori,
                nm_kategori: addItems?.nm_kategori
            })
        })

        const data = await res.json()
        console.log(data.response)
        setItems(prev=>{
            return prev.map(updateItem => {
                if(updateItem.idbarang === data.response.returnData.idbarang){
                    return {
                        idbarang: data?.response?.returnData?.idbarang,
                        nm_barang: data?.response?.returnData?.nm_barang,
                        hrg_modal: data?.response?.returnData?.hrg_modal,
                        hrg_satuan: data?.response?.returnData?.hrg_satuan,
                        stok: data?.response?.returnData?.stok,
                        idkategori: data?.response?.returnData?.idkategori,
                        nm_kategori: data?.response?.returnData?.nm_kategori
                    }
                } else {
                    return updateItem
                }
            })
        })
    }

    useEffect(()=>{
        getKategori()
        getItems()
        setItems(prev=>prev.filter(data=>data.idbarang !== getId))
    }, [])

    const handleClickConfirm = (e, idbarang) => {
        setGetId(idbarang)
        if(e?.target?.name === "delete" || e === "delete"){
            setIsDelete(prev=>!prev)
            setAksi('delete')
        }
    
        if(e?.target?.name === "edit" || e === "edit"){
            setIsEdit(prev=>!prev)
            setAksi('Edit')
        }
    }

    const handleClickConfirmAction = (aksi) => {
        if(aksi === "delete"){
            deleteItem()
            setIsDelete(prev=>!prev)
        }

        if(aksi === "edit"){
            setIsEdit(prev=>!prev)
        }
    } 

    const handlePageChange = (currentNumber) => {
        setCurrentPage(currentNumber)
    }

    const handleSubmitSearch = (e) => {
        e.preventDefault()
        setItems(items.filter(data=>data.nm_barang.toLowerCase().includes(search.toLowerCase())))
    }
    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleRefresh = () => {
        getItems()
        return
    }

    const handleClickModalAddItem = (idbarang, tipe) => {
        if(tipe === 'edit'){
            setGetId(idbarang)
            setAksi('Edit')
            setAddItems(items.find(data=>data.idbarang == idbarang))
        } 

        if(tipe === 'tambah'){
            setAksi('Tambah')
            setAddItems({
                idbarang: '',
                nm_barang: '',
                hrg_modal: '',
                hrg_satuan: '',
                stok: '',
                idkategori: '',
                nm_kategori: ''
            })
        }

        setIsAddItem(prev=>!prev)
    }

    const handleSubmitAddItem = (e, aksi) => {
        e.preventDefault()
        if(aksi === 'Tambah'){
            insertItems()
            setIsAddItem(prev=>!prev)
        }

        if(aksi === 'Edit'){
            updateItem()
            setIsAddItem(prev=>!prev)
        }

    }

    const handleChangeAddItem = (e) => {
        if(e.target.name === "nm_barang"){
            setAddItems(prev=>{
                return {
                    ...prev,
                    nm_barang: e.target.value
                }
            })
        } else if(e.target.name === "modal_beli"){
            setAddItems(prev=>{
                return {
                    ...prev,
                    hrg_modal: e.target.value
                }
            })
        } else if(e.target.name === "harga_jual"){
            setAddItems(prev=>{
                return {
                    ...prev,
                    hrg_satuan: e.target.value
                }
            })
        } else if(e.target.name === "stok"){
            setAddItems(prev=>{
                return {
                    ...prev,
                    stok: e.target.value
                }
            })
        } else if(e.target.name === "kategori"){
            const getKategoriName = listKategori?.find(data=>data.idkategori == e.target.value)
            const getName = getKategoriName?.nm_kategori

            if(aksi==='Edit'){
                setAddItems(prev=>{
                    return {
                        ...prev,
                        idkategori: e.target.value,
                        nm_kategori: getName
                    }
                })
                return
            }
            
            const getMaxItemsInKategori = items?.filter(data=>data.idkategori === e.target.value).map(obj => parseInt(obj.idbarang.substring(10)))

            setAddItems(prev=>{
                const maxItemsInKategori = Math.max(...getMaxItemsInKategori) + 1
                return {
                    ...prev,
                    idkategori: e.target.value,
                    idbarang : '9990001' + e.target.value.toString().padStart(3, '0') + maxItemsInKategori.toString().padStart(3, '0'),
                    nm_kategori: getName
                }
            })
        }
    }

    return (
        <>
        {
            isAddItem && 
            <ModalAddItems
            addItems={addItems}
            listKategori={listKategori}
            items={items}
            aksi={aksi}
            handleClickModalAddItem={handleClickModalAddItem}
            handleSubmitAddItem={handleSubmitAddItem}
            handleChangeAddItem={handleChangeAddItem} />
        }
        {
            isDelete &&
            <ModalConfirm
            aksi={aksi}
            handleChangeAddItem={handleChangeAddItem}
            handleClickConfirm={handleClickConfirm}
            handleClickConfirmAction={handleClickConfirmAction} />
        }

        <section className="max-w-7xl mx-auto space-y-3">
            <h2 className="text-center text-3xl font-bold">Data Barang</h2>
            <div className="flex justify-between items-center">
                <form className="w-full flex items-center gap-2">
                    <div className="flex items-center group">
                        <input type={'text'} id='search' name='search' className="w-96 h-10 border-2 group-border-violet-200 px-3 outline-none group-hover:duration-150 group-hover:border-violet-400" placeholder="Cari barang disini" value={search} onChange={(e)=>handleChangeSearch(e)} />
                        <button type="submit" className="h-10 bg-violet-200 rounded-tr-lg rounded-br-lg border-2 border-violet-200 px-3 group-hover:bg-violet-400 group-hover:duration-150 group-hover:border-violet-400" onClick={e=>handleSubmitSearch(e)}><FaSearch /></button>
                    </div>
                    <button type="button" className="h-10 bg-violet-200 border-2 border-violet-200 px-3 rounded-lg hover:bg-violet-400 hover:duration-150 hover:border-violet-400" onClick={handleRefresh}><FiRefreshCcw /></button>
                </form>
            <button className="h-10 w-fit bg-violet-200 rounded-full border-2 border-violet-200 px-3 flex gap-1 items-center font-semibold group hover:w-36 hover:bg-violet-400 hover:duration-150 hover:border-violet-400" onClick={()=>handleClickModalAddItem(null,'tambah')}><MdAdd className="w-6 h-6" /><span className="hidden w-36 group-hover:inline">Tambah Data</span></button>
            </div>
            {/* <table className="table-auto border-collapse mx-auto shadow-lg w-full rounded-lg overflow-hidden">
            <thead className="w-full h-12 bg-slate-100 border-b">
                <tr className="gap-5">
                    <th className="px-5">No</th>
                    <th className="px-5 text-left">ID</th>
                    <th className="px-5 text-left">Nama Item</th>
                    <th className="px-5 text-left">Modal Beli</th>
                    <th className="px-5 text-left">Harga Jual</th>
                    <th className="px-5">Stok tersisa</th>
                    <th className="px-5">Kategori</th>
                    <th className="px-5">Aksi</th>
                </tr>
            </thead>
            <tbody className="">
                {
                items.map((item, index)=>{
                    no = no + 1
                    return(
                        <tr key={item.idbarang} className={`leading-loose group ${index % 2 === 0 ? 'bg-violet-50' : ''} `}>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-center">{no}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{item.idbarang}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{item.nm_barang}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{formatter.format(item.hrg_modal)}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{formatter.format(item.hrg_satuan)}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-center">{item.stok}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-center">{item.nm_kategori}</td>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-center flex justify-center items-center gap-2">
                                <button className="shadow-md rounded-lg bg-green-400 px-3" name="edit" onClick={()=>handleClickModalAddItem(item.idbarang, 'edit')}>Edit</button>
                                <button className="shadow-md rounded-lg bg-red-400 px-3" name="delete" onClick={(e)=>handleClickConfirm(e, item.idbarang)}>Delete</button>
                            </td>
                        </tr>
                    ) 
                }).slice(startIndex,endIndex)}
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
            </div> */}
        </section>
        </>
    )
}