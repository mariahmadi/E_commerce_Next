import clientPromise from "../../lib/mongodb";
import { ObjectId } from 'mongodb'



import { getToken } from "next-auth/jwt";


export default async function handler(req, res) {
    try {
        const secret = process.env.NEXTAUTH_SECRET
        const token = await getToken({ req })

        console.log("tada", req.body)
        const client = await clientPromise

        const db = client.db("DB_NEXT")
        console.log("session" + token.email)

        const ProfileImg = await db.collection("USERS").find({
            email: token.email
        }).toArray()

        const bir = ProfileImg[0]
        const ooo = bir.BirthDay
        const shamsi = new Date().toLocaleDateString("fa-IR")
        console.log(ooo)
        console.log(shamsi)

        console.log("bir", bir)
        if (ProfileImg[0].ProfileImg !== "") {
            return res.json({ user: ProfileImg[0].ProfileImg })
        }
         res.json({ date: shamsi })




    } catch (error) {
        res.json("error" + error)
    }
}