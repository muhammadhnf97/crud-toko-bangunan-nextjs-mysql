import dbconnect from "@/lib/connectdb"

export default async function handler(req, res) {
  if(req.method === 'GET'){
    try {
      const query = 'SELECT * FROM supplier ORDER BY idsupplier DESC'
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
        const {idsupplier, nm_supplier, alamat, no_telp, kontak} = req.body
        const query = 'INSERT INTO supplier (idsupplier, nm_supplier, alamat, no_telp, kontak) VALUES (?, ?, ?, ?, ?)'
        const values = [idsupplier, nm_supplier, alamat, no_telp, kontak]
        await dbconnect(query, values)
        res.status(200).json({
            message: "Data berhasil disimpan",
            returnData: {
              idsupplier, nm_supplier, alamat, no_telp, kontak
            }
        })
    } catch (error) {
        console.log(error)
    }
  }

  if(req.method === 'PUT'){
      try {
          const {idsupplier, nm_supplier, alamat, no_telp, kontak} = req.body
          const query = 'UPDATE supplier SET nm_supplier = ?, alamat = ?, no_telp = ? WHERE idsupplier = ?'
          const values = [nm_supplier, alamat, no_telp, idsupplier]
          await dbconnect(query, values)
          res.status(200).json({
              message: "Data berhasil disimpan",
              returnData: {
                  idsupplier: idsupplier,
                  nm_supplier: nm_supplier,
                  alamat: alamat,
                  no_telp: no_telp,
                  kontak: kontak
              }
          })
      } catch (error) {
          console.log(error)
      }
  }

  if(req.method === "DELETE"){
      const idsupplier = req.body.idsupplier
      const query = 'DELETE from supplier WHERE idsupplier = ?'
      const values = [idsupplier]
      const data = await dbconnect(query, values)
      res.status(200).json({response: {
          message: 'data berhasil dihapus',
          data
      }})
  }
}