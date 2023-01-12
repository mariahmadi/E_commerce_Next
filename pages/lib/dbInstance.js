import clientPromise from "./mongodb"


export default function Database() {
    return new Promise(async (resolve, reject) => {

        const client = await clientPromise
        const db = client.db("DB_NEXT")
        resolve(db)
        //return Promise.resolve(db)
    })
}

