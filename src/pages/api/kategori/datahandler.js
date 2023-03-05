import dbconnect from "@/lib/connectdb";

export default async function handler(req, res) {
    if(req.method === 'GET'){
        try {
            const query = 'SELECT * FROM kategori ORDER BY idkategori ASC'
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
  