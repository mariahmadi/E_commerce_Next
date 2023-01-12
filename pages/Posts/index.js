import React, { useState } from "react";
import axops from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from "../../component/Layout";
import { useSession } from 'next-auth/react'
import Button from '@mui/material/Button'


export default function AddPost() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState()

    const router = useRouter()
    const { data: session, status } = useSession()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("Image", image)
        formData.append("title", title)
        formData.append("content", content)

        try {
            if (session) {
                await axops.post("http://localhost:3000/api/PostImages/HandleImages", formData, {
                    headers: {
                        "content-Type": "multipart/form-data"
                    }
                })
                    .then((ress) => {
                        console.log(ress)
                        router.push("/")
                    })
            }
            else {
                console.log("You Must Sign in for Create Post")
            }

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <Layout>
            <div className="addPost">
                {session && session.user.email}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="Title"></label>
                        <input type="text" value={title} placeholder="Enter Title" name="title" onChange={(e) => setTitle(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="content"></label>
                        <input type="text" value={content} placeholder="Enter Content" name="content" onChange={(e) => setContent(e.target.value)}></input>
                    </div>
                    <div>
                        <input type="file" name="Image" onChange={(e) => setImage(e.target.files[0])}></input>
                    </div>
                    <Button variant="contained" className="SubmitButton" type="submit">Insert</Button>
                </form>
            </div>
            <style jsx>
                {`
               .SubmitButton {
                    color : red
                }
                `}
            </style>
        </Layout>
    )
}