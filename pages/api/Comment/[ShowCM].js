import { getToken } from "next-auth/jwt";
import clientPromise from "../../lib/mongodb";

export default async function (req, res) {


    try {

        const client = await clientPromise
        const db = client.db("DB_NEXT")
        // const token = await getToken({ req })





        const ProductID = req.query.ShowCM
      //  console.log("ProductID", ProductID)
        const data = await db.collection("COMMENTS").find({
            productID: ProductID
        }).sort({ "productID": -1 }).toArray()
       // console.log(data)
        res.json({ data: data })

    } catch (error) {
        res.json(error)
    }


}