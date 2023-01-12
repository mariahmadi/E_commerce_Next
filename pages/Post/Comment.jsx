import React from "react";
import { useForm } from 'react-hook-form'
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import Send from '@mui/icons-material/Send'
import useSWR from 'swr'
import { useEffect } from "react";
import { useState } from "react";


export default function InsertComment({ id }) {

    const [Comment, setComment] = useState()
    const [Add, setAddcm] = useState(false)

    useEffect(() => {
        DisplayCM()
    }, [Add])


    const DisplayCM = async () => {
        const data = await axios.get(`http://localhost:3000/api/Comment/${id}`)
        setComment(data.data.data)


    }
    //const fetcher = (...args) => fetch(...args).then((res) => { res.json() })
    // const { data, error, isLoading } = useSWR(`http://localhost:3000/api/Comment/${id}`, fetcher)
    // if (data) {
    //     console.log("data", data)
    //     setComment(data.data)
    // }
    //   }
    // const fetcher = (...args) => fetch(...args).then((res) => { res.json() })
    // const { data, error, isLoading } = useSWR(`http://localhost:3000/api/Comment/${id}`, fetcher)



    const { register, formState: { errors }, reset, handleSubmit } = useForm()

    const onsubmit = async (data) => {
        console.log(data)
        const res = await axios.post("http://localhost:3000/api/Comment/AddComment", { comment: data.comment, productId: id })

        setAddcm(!Add)
        reset()
    }
    return (
        <>
            <div>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <input type="text" name="comment" placeholder="Add Comment" {...register("comment", { required: true })} />
                    <Button type="submit" endIcon={<Send />}>Send</Button>
                </form>
            </div>
            {Comment &&
                <Box>{
                    Comment.map((cm, i) => {
                        return (
                            <Typography key={i} gutterBottom variant="h5" component="div">
                                {cm.comment}
                            </Typography>
                        )
                    })
                }</Box>


            }
        </>

    )
}