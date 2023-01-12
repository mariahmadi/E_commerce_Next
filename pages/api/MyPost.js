
import { useSession } from "next-auth/react";
import Database from "../lib/dbInstance";
import clientPromise from "../lib/mongodb";
import { getToken } from "next-auth/jwt";
export default async function (req, res) {
    try {
        //  const secret = process.env.NEXTAUTH_SECRET
        const token = await getToken({ req })

        const client = await clientPromise
        const db = client.db("DB_NEXT")

        const data = await db.collection("POSTS").find({
            author: token.email
        }).toArray()
        const Total = data.length
        console.log(Total)
        console.log("data", data)
        res.json({ data: data, total: Total })
    } catch (error) {

        res.json(error)
    }

}