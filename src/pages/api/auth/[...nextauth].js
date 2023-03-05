import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import dbconnect from "@/lib/connectdb";
import bcrypt from 'bcryptjs'

export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req){
                const { email, password } = credentials
                const query = 'SELECT * FROM user where email = ?'
                const data = await dbconnect(query, [email])
                const user = data[0]

                if(!user){
                    throw new Error('No user found')
                }

                const isPasswordMatched = await bcrypt.compare(password, user.password)

                if(!isPasswordMatched){
                    throw new Error('Wrong Password')
                }
                return user
            }
        })
    ],
    pages: {
        signIn: "/"
    },
    secret: process.env.NEXTAUTH_SECRET
})