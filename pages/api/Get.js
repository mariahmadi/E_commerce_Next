
import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb"
import { unstable_getServerSession } from 'next-auth/next'
import { getToken } from 'next-auth/jwt'
import { oathOption } from "./auth/[...nextAuth]";


export default async function (req, res) {
    try {
        const session = await unstable_getServerSession(req, res, oathOption)
        //var { title, content } = req.body
        console.log("Session", JSON.stringify(session, null, 2))
        const secret = process.env.NEXTAUTH_SECRET
        const token = getToken({ req }, secret)
        const client = await clientPromise
        const db = client.db("DB_NEXT")


        switch (req.method) {
            case 'GET':

                const postData = await db.collection("POSTS").find({}).toArray();
                res.status(201).json(postData)
                break;

            case 'POST':

                if (session) {

                    const NewPost = await db.collection("POSTS").insertOne({
                        title: req.body.title,
                        content: req.body.content,
                        author: req.body.session
                    })
                    //  res.status(201).json(NewPost.ops[0])
                    res.send("Create")
                }
                else {
                    res.json("You Must Sign in ")
                }
                break;

            case "PUT":
                const { title, content, id } = req.body
                var today = new Date(),
                    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var Time = today.getHours() + ':' + (today.getMinutes()) + ':' + today.getSeconds()
                var FullDateTime = date + "//" + Time
                // var TimeCreated = today.getTime();
                const updatedPost = await db.collection("POSTS").updateOne(
                    {
                        _id: ObjectId(id)
                    },
                    {
                        $set: {
                            title: title,
                            content: content,
                            onUpdate: FullDateTime
                        }
                    }
                )


                res.status(201).json("Updated")
                break;

            case "DELETE":
                const ID = req.body.OBject

                await db.collection("POSTS").deleteOne({
                    _id: ObjectId(ID)
                })
                res.status(201).json("Deleted")
                break;
        }

    } catch (error) {
        res.json(error)
    }


}