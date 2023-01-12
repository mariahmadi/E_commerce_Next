import clientPromise from "../../lib/mongodb";

export default async function GetPost(req, res) {


    const client = await clientPromise
    const db = client.db("DB_NEXT")
 
    const page = req.query.page
    console.log("page", page)


    const AllPost = await db.collection("POSTS").find({}).toArray()

    const perPage = 9
    const totalPosts = AllPost.length
    const pageCount = Math.ceil(totalPosts / perPage)
    const start = (page - 1) * perPage
    var end = start + perPage

    const post = AllPost.slice(start, end)
   // console.log(post)
    if (end > totalPosts) {
        end = totalPosts
    }
    res.status(201).json({
        currentPage: page,
        totalCount: totalPosts,
        start: start,
        end: end,
        pageCount: pageCount,
        perPage: perPage,
        post: post

    })
}