import multer, { diskStorage } from "multer";
import NextConnect from 'next-connect'
import clientPromise from "../../lib/mongodb";
import { ObjectId } from 'mongodb'
import { unstable_getServerSession } from 'next-auth/next'
import { getToken } from 'next-auth/jwt'
import { oathOption } from "../auth/[...nextAuth]";


const Upload = multer({
    storage: diskStorage({
        destination: "./public/Post",
        filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
    })

})
const APIRoute = NextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
})
APIRoute.use(Upload.single("Image"))

APIRoute.post(async (req, res) => {
    try {
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var TimeCreated = today.getTime();
        const session = await unstable_getServerSession(req, res, oathOption)
        console.log("sessssss", session)
        const client = await clientPromise
        const db = client.db("DB_NEXT")

        await db.collection("POSTS").insertOne({
            title: req.body.title,
            content: req.body.content,
            ImageName: req.file.filename,
            author: session.user.email,
            onCreate: date,
            Time: TimeCreated,
            onUpdate: ""
        })

        res.statusCode(201).json("save")
    } catch (error) {
        res.json(error)
    }

})
export default APIRoute

export const config = {
    api: {
        bodyParser: false
    }
}

