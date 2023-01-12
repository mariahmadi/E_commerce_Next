import multer from "multer"
import NextConnect from "next-connect"
import uuid4 from "uuid"
import clientPromise from "../../lib/mongodb";
import { ObjectId } from 'mongodb'
import { unstable_getServerSession } from 'next-auth/next'
import { getToken } from 'next-auth/jwt'
import { oathOption } from "../auth/[...nextAuth]";



const Uploaded = multer({
    storage: multer.diskStorage({
        destination: "./public/Profile",
        filename: (req, file, cb) => cb(null, (Date.now() + file.originalname))
    })

})
const apiRoute = NextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});
apiRoute.use(Uploaded.single("Image"))
apiRoute.post(async (req, res) => {

    try {
        const session = await unstable_getServerSession(req, res, oathOption)

        const client = await clientPromise

        const db = client.db("DB_NEXT")

        console.log("pse" + session)
        if (session) {
            await db.collection("USERS").updateOne(
                {
                    email: session.user.email
                },
                {
                    $set: {
                        profileImg: req.file.filename
                    }
                })
            res.statusCode(201).json({ Image: req.file.filename })

        }
        res.end()
    } catch (error) {
        res.json(error)
    }



})

export default apiRoute

export const config = {
    api: {
        bodyParser: false
    }
}

