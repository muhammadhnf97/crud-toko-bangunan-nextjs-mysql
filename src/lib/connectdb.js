import mysql from 'mysql2/promise'

export default async function dbconnect(query, values = []) {
    try {
        const connect = await mysql.createConnection({
            host: process.env.DATABASE_LOCALHOST,
            user: process.env.DATABASE_USER,
            database: process.env.DATABASE_NAME
        })

        const [results] = await connect.execute(query, values)
        connect.end()
        return results
    } catch (error) {
        console.error('Failed to connect : ', error)
    }
}