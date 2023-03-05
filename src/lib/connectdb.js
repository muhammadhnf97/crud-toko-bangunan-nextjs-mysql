import mysql from 'mysql2/promise'

export default async function dbconnect(query, values = []) {
    try {
        const connect = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'tokobangunan'
        })

        const [results] = await connect.execute(query, values)
        connect.end()
        return results
    } catch (error) {
        console.error('Failed to connect : ', error)
    }
}