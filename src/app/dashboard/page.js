'use client'
import { useEffect, useState } from "react"
import Card from "../components/Card"
import { formatter } from "@/lib/lib"

export default function Dashboard(){
    const [items, setItems] = useState([])
    
    const totalStock = items.reduce((accumulator, currentValue)=>{
        return accumulator + currentValue.stok
    },0)
    
    const totalAset = items.reduce((accumulator, currentValue)=>{
        return accumulator + currentValue.hrg_satuan
    },0)
    
    const getItems = async() => {
        const res = await fetch('/api/dashboard/items',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await res.json()
        setItems(data?.response?.data)
    }
    useEffect(()=>{
        getItems()
    },[])

    return(
        <section className="max-w-7xl mx-auto py-5">
            <div className="p-1 flex flex-warp gap-5 justify-center">
                <Card
                title={'Total Items'}
                items={items.length} 
                borderColor={'border-red-500'} />
                <Card 
                title={'Total Aset'}
                items={formatter.format(totalAset)} 
                borderColor={'border-blue-500'} />
                <Card 
                title={'Total Stok'}
                items={totalStock} 
                borderColor={'border-green-500'} /> 
            </div>
        </section>
    )
}