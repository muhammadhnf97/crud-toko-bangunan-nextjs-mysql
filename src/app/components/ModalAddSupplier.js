export default function ModalAddSupplier ({ supplierNewValue, handleClickModalSupplier, handleSubmitAddNewsupplier, handleChangeSupplierValue, aksi }) {

    return (
        <div className="w-full h-full fixed top-0 left-0">
            <button className="w-full h-full top-0 left-0 bg-black bg-opacity-70 absolute -z-10" onClick={handleClickModalSupplier}></button>
            <div className="w-fit h-fit p-10 rounded-lg bg-white right-1/2 top-1/2 absolute transform  translate-x-1/2 -translate-y-1/2 shadow-lg">
                <form className="space-y-3" onSubmit={(e)=>handleSubmitAddNewsupplier(e, aksi)}>
                    <h2 className="text-center text-2xl font-semibold">{aksi} Kategori</h2>
                    <div className="items-center hidden">
                        <p className="w-28">idsupplier</p>
                        <input type={'text'} id='idsupplier' name="idsupplier" value={supplierNewValue.idsupplier} className="border px-3"  onChange={(e)=>handleChangeSupplierValue(e)} />
                    </div>
                    <div className="flex items-center">
                        <p className="w-28">Nama</p>
                        <input type={'text'} id='nm_supplier' name="nm_supplier" value={supplierNewValue.nm_supplier} className="border px-3"  onChange={(e)=>handleChangeSupplierValue(e)} required />
                    </div>
                    <div className="flex items-center">
                        <p className="w-28">Alamat</p>
                        <input type={'text'} id='alamat' name="alamat" value={supplierNewValue.alamat} className="border px-3"  onChange={(e)=>handleChangeSupplierValue(e)} />
                    </div>
                    <div className="flex items-center">
                        <p className="w-28">No Telp</p>
                        <input type={'text'} id='no_telp' name="no_telp" value={supplierNewValue.no_telp} className="border px-3"  onChange={(e)=>handleChangeSupplierValue(e)} />
                    </div>
                    <div className="flex items-center">
                        <p className="w-28">Kontak</p>
                        <input type={'text'} id='kontak' name="kontak" value={supplierNewValue.kontak} className="border px-3"  onChange={(e)=>handleChangeSupplierValue(e)} />
                    </div>
                    <button className='w-full h-10 bg-violet-200 font-semibold border-2 border-violet-200 px-3 rounded-lg hover:bg-violet-400 hover:duration-150 hover:border-violet-400'>{aksi}</button>
                </form>
            </div>
        </div>
    )
}