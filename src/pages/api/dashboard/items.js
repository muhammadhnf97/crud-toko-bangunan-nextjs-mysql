import dbconnect from "@/lib/connectdb";

export default async function handler(req, res) {
    if(req.method === 'GET'){
        try {
            const query = 'SELECT * FROM barang ORDER BY idbarang DESC'
            const data = await dbconnect(query)
            res.status(200).json({response:{
                message: 'Data berhasil diambil',
                data
            }})
        } catch (error) {
            console.log(error)
        }
    }
}
  