import { formatter } from "@/lib/lib";

export default function Table () {
    return (
        <>
        <table className="table-auto border-collapse mx-auto shadow-lg w-full rounded-lg overflow-hidden">
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
        </div>
        </>
        )
}