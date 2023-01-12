import bcryot from 'bcryptjs'
import clientPromise from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function Userhandler(req, res) {
    const client = await clientPromise
    const db = client.db("DB_NEXT")

    //const {  password, conformPassword } = req.body.data
    try {
        console.log(req.body)
        if (req.body.data.password === req.body.data.conformPassword) {

            const hashedPassWord = await bcryot.hash(req.body.data.password, 10)

            const newUser = await db.collection("USERS").insertOne({
                email: req.body.data.email,
                password: hashedPassWord,
                gender: req.body.data.gender,
                ProfileImg: "",
                BirthDay: req.body.data.birthday,
                Role: "USERs"
            })
            res.json(newUser)
        }

    } catch (error) {
        res.status(403).json(error)
    }



}