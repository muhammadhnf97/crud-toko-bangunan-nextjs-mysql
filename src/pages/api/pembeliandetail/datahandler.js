import dbconnect from "@/lib/connectdb"

export default async function handler(req, res) {    
    if (req.method === 'POST') {
        try {
          const keranjangBelanja = req.body;
          const queryDetailPembelian = 'INSERT INTO pembelian_detail (no_pembelian, idbarang, harga_beli, jumlah) VALUES (?, ?, ?, ?)';
          
          for (let i = 0; i < keranjangBelanja.length; i++) {
            const belanja = keranjangBelanja[i];
            const valuesDetailPembelian = [belanja.no_pembelian, belanja.idbarang, belanja.hrg_modal, belanja.jumlah];
            await dbconnect(queryDetailPembelian, valuesDetailPembelian);
          }
      
          res.status(200).json({
            message: 'Data berhasil disimpan'
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            message: 'Terjadi kesalahan saat menyimpan data',
            error: error
          });
        }
      }
    

  }
  