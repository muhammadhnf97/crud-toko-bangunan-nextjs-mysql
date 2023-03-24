import dbconnect from "@/lib/connectdb"

export default async function handler(req, res) {    
    const getDataBarang = await dbconnect('SELECT * FROM barang ORDER BY idbarang DESC')

    if (req.method === 'POST') {
        try {
          const keranjangBelanja = req.body;
          const queryDetailPenjualan = 'INSERT INTO penjualan_detail (no_nota, idbarang, jumlah, harga_jual, laba) VALUES (?, ?, ?, ?, ?)';
          const queryUpdateItem = 'UPDATE barang SET stok = ? WHERE idbarang = ?'
          let valuesDetailPembelian
          let valuesUpdateItems
          
          for (let i = 0; i < keranjangBelanja.length; i++) {
            const belanja = keranjangBelanja[i];
            
            const getSingleBarang = getDataBarang.find(data=>data.idbarang === belanja.idbarang)
            const stok = getSingleBarang.stok - belanja.jumlah
            
            const laba = (getSingleBarang.hrg_satuan - getSingleBarang.hrg_modal) * belanja.jumlah
            valuesDetailPembelian = [belanja.no_nota, belanja.idbarang, belanja.jumlah, belanja.hrg_satuan, laba];
            await dbconnect(queryDetailPenjualan, valuesDetailPembelian);


              
            valuesUpdateItems = [stok, belanja.idbarang]
            await dbconnect(queryUpdateItem, valuesUpdateItems)
          }
          
      
          res.status(200).json({
            message: 'Data berhasil disimpan',
            hehe: valuesDetailPembelian,
            haha: valuesUpdateItems
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
  