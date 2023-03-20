import dbconnect from "@/lib/connectdb"

export default async function handler(req, res) {
  if(req.method === 'GET'){
    try {
      const query = 'SELECT * FROM konsumen ORDER BY idpelanggan DESC'
      const data = await dbconnect(query)
      res.status(200).json({
        message: 'Data berhasil diambil',
        data
      })
    } catch (error) {
      console.log(error)
    }
  }


  if(req.method === 'POST'){
    try {
        const {idpelanggan, nm_konsumen, alamat, no_telp} = req.body
        const query = 'INSERT INTO konsumen (idpelanggan, nm_konsumen, alamat, no_telp) VALUES (?, ?, ?, ?)'
        const values = [idpelanggan, nm_konsumen, alamat, no_telp]
        await dbconnect(query, values)
        res.status(200).json({
            message: "Data berhasil disimpan",
            returnData: {
              idpelanggan, nm_konsumen, alamat, no_telp
            }
        })
    } catch (error) {
        console.log(error)
    }
  }

  if(req.method === 'PUT'){
      try {
          const {idpelanggan, nm_konsumen, alamat, no_telp} = req.body
          const query = 'UPDATE konsumen SET nm_konsumen = ?, alamat = ?, no_telp = ? WHERE idpelanggan = ?'
          const values = [nm_konsumen, alamat, no_telp, idpelanggan]
          await dbconnect(query, values)
          res.status(200).json({
              message: "Data berhasil disimpan",
              returnData: {
                  idpelanggan: idpelanggan,
                  nm_konsumen: nm_konsumen,
                  alamat: alamat,
                  no_telp: no_telp,
              }
          })
      } catch (error) {
          console.log(error)
      }
  }

  if(req.method === "DELETE"){
      const idpelanggan = req.body.idpelanggan
      const query = 'DELETE from konsumen WHERE idpelanggan = ?'
      const values = [idpelanggan]
      const data = await dbconnect(query, values)
      res.status(200).json({response: {
          message: 'data berhasil dihapus',
          data
      }})
  }
}