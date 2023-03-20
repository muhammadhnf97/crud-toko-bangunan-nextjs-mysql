import dbconnect from "@/lib/connectdb"

export default async function handler(req, res) {

    
    const queryPembelian = 'SELECT * FROM pembelian ORDER BY no_pembelian DESC';
    const dataPembelian = await dbconnect(queryPembelian);
    const noPembelianArray = dataPembelian?.map(pembelian => parseInt(pembelian.no_pembelian.substring(2)))
    const getMaxNoPembelian = dataPembelian.length > 0 ?  Math.max(...noPembelianArray) + 1 : 1
    const newNoPembelian = 'BL' + getMaxNoPembelian?.toString().padStart(8, '0')

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day}`;


    if(req.method === 'GET'){
        try {
            const query = 'SELECT * FROM pembelian ORDER BY no_pembelian DESC'
            await dbconnect(query)
            res.status(200).json({
                message : "berhasil get data pembelian",
                no_pembelian: newNoPembelian
            })
        } catch (error) {
            console.log(error)
        }
    }

    if(req.method === 'POST'){
      try {
          const {no_notabeli, user, idsupplier, jenis} = req.body
          const query = 'INSERT INTO pembelian (no_pembelian, no_notabeli, user, idsupplier, jenis, tgl_masuk, catatan) VALUES (?, ?, ?, ?, ?, ?, ?)'
          const values = [newNoPembelian, no_notabeli, user, idsupplier, jenis, formattedDate, '']
          await dbconnect(query, values)
          res.status(200).json({
              message: "Pembelian baru berhasil disimpan",
              sendBack : newNoPembelian, no_notabeli, user, idsupplier, jenis, formattedDate
          })
      } catch (error) {
          console.log(error)
      }
    }
    

  }
  