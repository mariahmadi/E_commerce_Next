import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Layout from "../component/Layout";
import useSWR from 'swr'
import { useEffect } from "react";
import { Avatar } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete"
import { Typography } from '@mui/material'

export default function Dashboard() {
    const [profile, setProfile] = useState()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState("")
    const { data: session, status } = useSession()

    useEffect(() => {
        getProfile()
    }, [])

    const HandleEdit = (i) => {


        const Edited = async (e) => {
            e.preventDefault()
            setEdit(false)
            await axios.put("http://localhost:3000/api/Get", {
                id: id,
                title: title,
                content: content
            }).then((res) => {

                window.location.reload()
            })
        }
        return (
            <div>

                <form onSubmit={Edited}>
                    <label htmlFor="Title">Title :</label>
                    <input type="text" autoFocus value={title} name="title" onChange={(e) => setTitle(e.target.value)}></input>
                    <br />
                    <label htmlFor="content">content :</label>
                    <input type="text" value={content} name="content" onChange={(e) => setContent(e.target.value)}></input>

                    <button type="submit">Edit</button>
                </form>
            </div>
        )
    }
    const HandleDelete = async (i) => {

        if (window.confirm("Are You Sure")) {

            console.log(i)
            const res = await axios.delete("http://localhost:3000/api/Get", { data: { OBject: i } })
            console.log(res)

        }
        window.location.reload()

    }
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const getProfile = async () => {
        const res = await axios.get("http://localhost:3000/api/auth/LoadProfile")
        const data = res.data
        setProfile(data.user)
    }
    const { data, error } = useSWR("http://localhost:3000/api/MyPost", fetcher)




    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    return (
        <>
            <Layout>

                <div>
                    {session && session.user.email}
                    {profile && <Avatar alt="Remy Sharp" src={`/Profile/${profile}`}></Avatar>}

                    <h1>Dashboard</h1>
                    <Typography variant="h3" component="h2">
                        You Have {data.total} Post
                    </Typography>
                    {edit && HandleEdit()}
                    <br />
                    {data &&
                        data.data.map((post, i) => {
                            return (

                                <article key={i}>

                                    <img
                                        src={`/Post/${post.ImageName}`}
                                        alt={post.author}
                                        height={200}
                                        loading='lazy'
                                        width={200}
                                    />
                                    <div className='text'>
                                        <p><Link href={`/Post/${post._id}`}>title: {post.title}</Link></p>
                                        <p><Link href={`/Post/${post._id}`}>content : {post.content}</Link></p>
                                        <p><Link href={`/Post/${post._id}`}>author: {post.author}</Link></p>

                                    </div>

                                    <Button variant="outlined" onClick={() => { setEdit(true); HandleEdit(i); setTitle(post.title); setContent(post.content); setId(post._id) }}> Edit</Button>
                                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => { HandleDelete(post._id); }}> Delete</Button>

                                </article>



                            )
                        })
                    }
                </div>



            </Layout>

        </>


    )
}

