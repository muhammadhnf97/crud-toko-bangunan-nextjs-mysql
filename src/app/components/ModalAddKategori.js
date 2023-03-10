export default function ModalAddKategori ({ addNewKategori, handleClickModalAddKategori, handleSubmitAddNewKategori, handleChangeNewKategori, aksi }) {

    return (
        <div className="w-full h-full fixed top-0 left-0">
            <button className="w-full h-full top-0 left-0 bg-black bg-opacity-70 absolute -z-10" onClick={handleClickModalAddKategori}></button>
            <div className="w-fit h-fit p-10 rounded-lg bg-white right-1/2 top-1/2 absolute transform  translate-x-1/2 -translate-y-1/2 shadow-lg">
                <form className="space-y-3" onSubmit={(e)=>handleSubmitAddNewKategori(e, aksi)}>
                    <h2 className="text-center text-2xl font-semibold">{aksi} Kategori</h2>
                    <div className="flex items-center hidden">
                        <p className="w-28">Nama Item</p>
                        <input type={'text'} id='nm_barang' name="idkategori" value={addNewKategori.idkategori} className="border px-3"  onChange={(e)=>handleChangeNewKategori(e)} />
                    </div>
                    <div className="flex items-center">
                        <p className="w-28">Nama Item</p>
                        <input type={'text'} id='nm_barang' name="nm_kategori" value={addNewKategori.nm_kategori} className="border px-3"  onChange={(e)=>handleChangeNewKategori(e)} required />
                    </div>
                    <button className='w-full h-10 bg-violet-200 font-semibold border-2 border-violet-200 px-3 rounded-lg hover:bg-violet-400 hover:duration-150 hover:border-violet-400'>{aksi}</button>
                </form>
            </div>
        </div>
    )
}