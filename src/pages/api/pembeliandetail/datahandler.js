import dbconnect from "@/lib/connectdb"

export default async function handler(req, res) {    
    const getDataBarang = await dbconnect('SELECT * FROM barang ORDER BY idbarang DESC')

    if (req.method === 'POST') {
        try {
          const keranjangBelanja = req.body;
          const queryDetailPembelian = 'INSERT INTO pembelian_detail (no_pembelian, idbarang, harga_beli, jumlah) VALUES (?, ?, ?, ?)';
          
          for (let i = 0; i < keranjangBelanja.length; i++) {
            const belanja = keranjangBelanja[i];
            const valuesDetailPembelian = [belanja.no_pembelian, belanja.idbarang, belanja.hrg_modal, belanja.jumlah];
            await dbconnect(queryDetailPembelian, valuesDetailPembelian);

            const getSingleBarang = getDataBarang.find(data=>data.idbarang === belanja.idbarang)
            const getStok = getSingleBarang.stok + belanja.jumlah
            const getHargaSatuan = ((getSingleBarang.stok * getSingleBarang.hrg_modal) + (belanja.jumlah * belanja.hrg_modal)) / (getSingleBarang.stok + belanja.jumlah)

              
            const valuesUpdateItems = [belanja.hrg_modal, getHargaSatuan, getStok, belanja.idbarang]
            const queryUpdateItem = 'UPDATE barang SET hrg_modal = ?, hrg_satuan = ?, stok = ? WHERE idbarang = ?'
            await dbconnect(queryUpdateItem, valuesUpdateItems)
          }
          
      
          res.status(200).json({
            message: 'Data berhasil disimpan',
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
  