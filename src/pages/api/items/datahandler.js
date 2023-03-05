import dbconnect from "@/lib/connectdb";

export default async function handler(req, res) {
    if(req.method === 'GET'){
        try {
            const query = 'SELECT barang.*, kategori.nm_kategori FROM barang INNER JOIN kategori ON barang.idkategori=kategori.idkategori ORDER BY barang.idbarang DESC'
            const data = await dbconnect(query)
            res.status(200).json({response:{
                message: 'Data berhasil diambil',
                data
            }})
        } catch (error) {
            console.log(error)
        }
    }

    if(req.method === 'POST'){
        try {
            const {idbarang, nm_barang, hrg_modal, hrg_satuan, stok, idkategori, nm_kategori} = req.body
            const query = 'INSERT INTO barang (idbarang, nm_barang, hrg_modal, hrg_satuan, stok, idkategori) VALUES (?, ?, ?, ?, ?, ?)'
            const values = [idbarang, nm_barang, hrg_modal, hrg_satuan, stok, idkategori]
            const data = await dbconnect(query, values)
            res.status(200).json({response:{
                message: "Data berhasil disimpan",
                data,
                returnData: {
                    idbarang: idbarang,
                    nm_barang: nm_barang,
                    hrg_modal: hrg_modal,
                    hrg_satuan: hrg_satuan,
                    stok: stok,
                    idkategori: idkategori,
                    nm_kategori: nm_kategori
                }
            }})
        } catch (error) {
            console.log(error)
        }
    }
}
  