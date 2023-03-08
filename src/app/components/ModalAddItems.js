export default function ModalAddItems ({ addItems, handleClickModalAddItem, handleSubmitAddItem, handleChangeAddItem, listKategori, aksi }) {

    return (
        <div className="w-full h-full fixed top-0 left-0">
            <button className="w-full h-full top-0 left-0 bg-black bg-opacity-70 absolute -z-10" onClick={handleClickModalAddItem}></button>
            <div className="w-fit h-fit p-10 rounded-lg bg-white right-1/2 top-1/2 absolute transform  translate-x-1/2 -translate-y-1/2 shadow-lg">
                <form className="space-y-3" onSubmit={(e)=>handleSubmitAddItem(e, aksi)}>
                    <h2 className="text-center text-2xl font-semibold">{aksi} Item</h2>
                    <div className="items-center hidden">
                        <p className="w-28">ID Barang</p>
                        <input type={'text'} id='idbarang' name="nm_barang" value={addItems.idbarang} className="border px-3"  onChange={(e)=>handleChangeAddItem(e)} required />
                    </div>
                    <div className="flex items-center">
                        <p className="w-28">Nama Item</p>
                        <input type={'text'} id='nm_barang' name="nm_barang" value={addItems.nm_barang} className="border px-3"  onChange={(e)=>handleChangeAddItem(e)} required />
                    </div>
                    <div className="flex items-center">
                        <p className="w-28">Modal Beli</p>
                        <input type={'number'} id='modal_beli' name="modal_beli" value={addItems.hrg_modal} className="border px-3" onChange={(e)=>handleChangeAddItem(e)} required />
                    </div>
                    <div className="flex items-center">
                        <p className="w-28">Harga Jual</p>
                        <input type={'number'} id='harga_jual' name="harga_jual" value={addItems.hrg_satuan} className="border px-3" onChange={(e)=>handleChangeAddItem(e)} required />
                    </div>
                    <div className="flex items-center">
                        <p className="w-28">Stok</p>
                        <input type={'number'} id='stok' name="stok" value={addItems.stok} className="border px-3" onChange={(e)=>handleChangeAddItem(e)} required />
                    </div>
                    <div className="flex items-center">
                        <p className="w-28">Kategori</p>
                        <select className="border px-3" name="kategori" onChange={(e)=>handleChangeAddItem(e)} required>
                            <option value={addItems?.idkategori ? addItems.idkategori : null}>{addItems.nm_kategori? addItems.nm_kategori : 'Pilih Kategori'}</option>
                            {listKategori.map(data => (
                                <option key={data.idkategori} value={data.idkategori}>
                                {data.nm_kategori}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className='w-full h-10 bg-violet-200 font-semibold border-2 border-violet-200 px-3 rounded-lg hover:bg-violet-400 hover:duration-150 hover:border-violet-400'>{aksi}</button>
                </form>
            </div>
        </div>
    )
}