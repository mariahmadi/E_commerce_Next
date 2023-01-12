

import clientPromise from "../lib/mongodb"
//import Database from "../lib/dbInstance"
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {

  try {
    const client = await clientPromise
    const db = client.db("DB_NEXT")
    console.log(req.body)


    const post = await db.collection("POSTS").find({ _id: ObjectId(req.body.id) }).toArray()
    const userImail = post[0].author
    console.log(userImail)
    const Profile = await db.collection("USERS").find({ email: post[0].author }).toArray()
    const ProfileImage = Profile[0].ProfileImg
    console.log(ProfileImage)
    //console.log(post[0])
   // { postData: { Post: post[0], Profile: ProfileImage }
    res.status(200).json(post[0])

  } catch (error) {
    res.status(403).json({ error: error })

  }


}
