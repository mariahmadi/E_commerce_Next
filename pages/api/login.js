import clientPromise from "../lib/mongodb"
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {

    const { email, password } = req.body.payload
    console.log("req", req.body)
    const client = await clientPromise
    const db = client.db("DB_NEXT")
    try {

        console.log(email)
        const user = await db.collection("USERS").find({
            email: email
        }).toArray()
        console.log("user" + user[0].email)
        if (user[0]) {
            const PasswordMatch = await bcrypt.compare(password, user[0].password)
            if (!PasswordMatch) {
                return res.status(403).json("Password is Incorrect")
            }
            console.log("Done")
            const Finded = {
                email: user[0].email
            }
            // const header=new Headers()
            // header.append("Set-cookie")
            return res.send({ user: Finded })
        }
        res.end()
    } catch (error) {
        res.json(error)
    }


}