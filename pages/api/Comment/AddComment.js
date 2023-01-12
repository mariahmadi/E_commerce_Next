import { getToken } from "next-auth/jwt";
import clientPromise from "../../lib/mongodb";

export default async function (req, res) {


    try {

        const client = await clientPromise
        const db = client.db("DB_NEXT")
        const token = await getToken({ req })

        const comment = req.body.comment
        const productID = req.body.productId
        const x = new Date();
        const DateString = x.toDateString()



        const data = await db.collection("COMMENTS").insertOne({
            username: token.email,
            productID: productID,
            comment: comment,
            onCreate: DateString
        })
        res.json("Done")

    } catch (error) {
        res.json(error)
    }


}