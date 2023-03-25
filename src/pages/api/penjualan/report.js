import dbconnect from "@/lib/connectdb"

export default async function handler(req, res) {
    if(req.method === 'GET'){
        try {
            const query = "SELECT penjualan_detail.*, barang.nm_barang, konsumen.nm_konsumen, penjualan.no_nota, penjualan.tgl_nota FROM penjualan_detail INNER JOIN penjualan ON penjualan_detail.no_nota=penjualan.no_nota INNER JOIN konsumen ON penjualan.idpelanggan=konsumen.idpelanggan INNER JOIN barang ON penjualan_detail.idbarang=barang.idbarang ORDER BY penjualan.no_nota DESC"

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
  