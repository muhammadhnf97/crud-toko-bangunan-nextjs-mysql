import dbconnect from "@/lib/connectdb"

export default async function handler(req, res) {
    if(req.method === 'GET'){
        try {
            const query = "SELECT pembelian_detail.*, barang.nm_barang, supplier.nm_supplier, pembelian.no_notabeli, pembelian.tgl_masuk FROM pembelian_detail INNER JOIN pembelian ON pembelian_detail.no_pembelian=pembelian.no_pembelian INNER JOIN supplier ON pembelian.idsupplier=supplier.idsupplier INNER JOIN barang ON pembelian_detail.idbarang=barang.idbarang ORDER BY pembelian.no_pembelian DESC"

            const data = await dbconnect(query)
            res.status(200).json({
                message: 'Data berhasil diambil',
                returnData: data
            })
        } catch (error) {
            console.log(error)
        }
    }
  }
  