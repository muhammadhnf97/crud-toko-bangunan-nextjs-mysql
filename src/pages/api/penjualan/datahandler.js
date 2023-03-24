import dbconnect from "@/lib/connectdb"

export default async function handler(req, res) {

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
    const queryPenjualan = 'SELECT * FROM penjualan ORDER BY no_nota DESC';
    const dataPenjualan = await dbconnect(queryPenjualan);
    const filterDateFromNoNota = dataPenjualan.map(data=>data.no_nota.substring(0, 6))
    const dateAsFilter = `${year.toString().slice(-2)}${month}${day}`
    const getNewestDate = filterDateFromNoNota.filter(nots=>nots == dateAsFilter)
    const getMax = getNewestDate.length > 1 ? getNewestDate.length + 1 : 1
    const newestNoNota = dateAsFilter + getMax.toString().padStart(4, '0')



    if(req.method === 'GET'){
        try {
            res.status(200).json({
                message : "berhasil get data pembelian",
                no_nota: newestNoNota
            })
        } catch (error) {
            console.log(error)
        }
    }

    if(req.method === 'POST'){
      try {
          const {user, idpelanggan} = req.body
          const query = 'INSERT INTO penjualan (no_nota, tgl_nota, user, idpelanggan) VALUES (?, ?, ?, ?)'
          const values = [newestNoNota, formattedDate, user, idpelanggan]
          await dbconnect(query, values)
          res.status(200).json({
              message: "Pembelian baru berhasil disimpan",
              sendBack : values
          })
      } catch (error) {
          console.log(error)
      }
    }
    

  }
  