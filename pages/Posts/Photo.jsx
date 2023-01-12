import React, { useState } from "react";
import axios from "axios";
import Layout from "../../component/Layout"
import Image from 'next/image'
//import profilePic from '../../public/Post/base.png'
export default function Display() {
    const [image, setImage] = useState()
    const [imageAddress, setImageAddress] = useState("")

    const HandleForm = async () => {
        const Form = new FormData()
        Form.append("Image", image)
        try {
            await axios.post("http://localhost:3000/api/Profile/Upload", Form, { headers: { "Content-Type": 'multipart/form-data' } }
            ).then((res) => {
               
                setImageAddress(res.data.Image)
              
            })
        } catch (error) {
            console.log(error)
        }
    }
// <Image src={profilePic} height={150} width={150} alt="img" priority>
    return (
        <Layout>
            <div>
                <form onSubmit={HandleForm}>
                    <input type="file" name="Image" required accept="image/*" onChange={(e) => setImage(e.target.files[0])}></input>
                    <button type="submit">Add</button>
                </form>
               
              
            </div>
        </Layout >
    )
}