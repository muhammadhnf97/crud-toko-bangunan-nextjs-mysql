"use client"

import { useState } from "react"

export default function Table ( {field, dataTable} ){
    
    const [itemsPerPage] = useState(15)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(dataTable.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    
    const handlePageChange = (currentNumber) => {
        setCurrentPage(currentNumber)
    }

    return(
        <>
        <table className="table-auto border-collapse mx-auto shadow-lg w-full rounded-lg overflow-hidden bg-white">
            <thead className="w-full h-12 bg-slate-100 border-b">
                <tr className="gap-5">
                    {field.map((data, index)=>{
                        return (
                            <th key={index} className="px-5 text-left">{data}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {
                    dataTable?.map((items, index)=>(
                        <tr key={index} className={`leading-loose group ${index % 2 === 0 ? 'bg-violet-50' : 'bg-white'} `}>
                            <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{index + 1}</td>
                            {
                                Object.values(items).map((value, index)=>(
                                    <td key={index} className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{value}</td>
                                ))
                            }
                        </tr>
                    )).slice(startIndex, endIndex)
                }
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
        </>
    )
}