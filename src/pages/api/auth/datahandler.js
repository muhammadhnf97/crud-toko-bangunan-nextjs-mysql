import dbconnect from "@/lib/connectdb"
import bycript from 'bcryptjs'

export default async function handler(req, res) {
    if(req.method === "GET"){
      try {
        const {email} = req.query
        const query = 'SELECT * FROM user where email = ? '
        const values = [email]
        const data = await dbconnect(query, values)

        if(data.length < 1) {
            res.status(404).json({response: {
                message: "Data not found"
            }})
            return
        }
        res.status(200).json({response: {
          message : "Berhasil fetch data", data
        }})
      } catch (error) {
        res.status(404).json({response: {
          message: error
        }})
      }
    }

    if(req.method === 'POST'){
      try {
        const saltRound = 10
        const name = req.body.name
        const email = req.body.email
        const password = await bycript.hash(req.body.password, saltRound)
        
        const query = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)'
        const values = [name, email, password]
        const data = await dbconnect(query, values)
        res.status(200).json({response: {
          message: "Data berhasil ditambahkan",
          data
        }})
      } catch (error) {
        res.status(500).json({response: {
          error: "Ada kesalahan"
        }})
        
      }
    }
  }
  