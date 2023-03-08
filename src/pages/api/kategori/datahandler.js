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

    if(req.method === 'POST'){
        try {
            const {idkategori, nm_kategori} = req.body
            const query = 'INSERT INTO kategori (idkategori, nm_kategori) VALUES (?, ?)'
            const values = [idkategori, nm_kategori]
            const data = await dbconnect(query, values)
            res.status(200).json({response:{
                message: "Data berhasil disimpan",
                data,
                returnData: {
                    idkategori: idkategori,
                    nm_kategori: nm_kategori
                }
            }})
        } catch (error) {
            console.log(error)
        }
    }

    if(req.method === "DELETE"){
        const idkategori = req.body.idkategori
        const query = 'DELETE from kategori WHERE idkategori = ?'
        const values = [idkategori]
        const data = await dbconnect(query, values)
        res.status(200).json({response: {
            message: 'data berhasil dihapus',
            data
        }})
    }

    if(req.method === 'PUT'){
        try {
            const {idkategori, nm_kategori} = req.body
            const query = 'UPDATE kategori SET nm_kategori = ? WHERE idkategori = ?'
            const values = [nm_kategori, idkategori]
            await dbconnect(query, values)
            res.status(200).json({response:{
                message: "Data berhasil disimpan",
                returnData: {
                    idkategori: idkategori,
                    nm_kategori: nm_kategori
                }
            }})
        } catch (error) {
            console.log(error)
        }
    }
}
  