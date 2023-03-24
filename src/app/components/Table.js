export default function Table ( {field, dataTable} ){
    return(
        <table className="table-auto border-collapse mx-auto shadow-lg w-full rounded-lg overflow-hidden">
            <thead className="w-full h-12 bg-slate-100 border-b">
                <tr className="gap-5">
                    {field.map(data=>{
                        return (
                            <th className="px-5 text-left">{data}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody className="">
                {
                // dataKonsumen.map((konsumen, index)=>{
                //     no = no + 1
                //     return(
                //         <tr key={konsumen.idbarang} className={`leading-loose group ${index % 2 === 0 ? 'bg-violet-50' : 'bg-white'} `}>
                //             <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-center">{no}</td>
                //             <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{konsumen.idpelanggan}</td>
                //             <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{konsumen.nm_konsumen}</td>
                //             <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{konsumen.alamat}</td>
                //             <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-left">{konsumen.no_telp}</td>
                //             <td className="px-5 py-1 group-hover:bg-violet-200 group-hover:duration-150 text-center flex justify-center items-center gap-2">
                //                 <button className="shadow-md rounded-lg bg-green-400 px-3" name="edit" onClick={()=>handleClickModalKonsumen(konsumen.idpelanggan, 'edit')}>Edit</button>
                //                 <button className="shadow-md rounded-lg bg-red-400 px-3" name="delete" onClick={(e)=>handleClickConfirmDelete(konsumen.idpelanggan)}>Delete</button>
                //             </td>
                //         </tr>
                //     ) 
                // }).slice(startIndex, endIndex)
                }
            </tbody>
        </table>
    )
}