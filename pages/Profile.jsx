import { useSession, getSession } from "next-auth/react"
import Layout from "../component/Layout"
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import axios from "axios"
import useSWR from 'swr'


export default function Page() {
    const { data: session, status } = useSession()
    const fetcher = (...arg) => fetch(...arg).then((res) => res.json())
    const { data: profile, error } = useSWR("http://localhost:3000/api/auth/LoadProfile", fetcher)
    if (profile) {

        console.log("profile", profile)
    }
    if (error) return <h1>{error}</h1>


    return (
        <>
            <Layout>
                {session && <Typography variant="h2" component="h2">Your Email :  {session.user.email}</Typography>}
                <h1>Protected Page</h1>

                {profile &&
                    <div>
                        <Avatar alt={session.user.email} src={`/Profile/${profile.user}`}></Avatar>
                        <Typography variant="h2" component="h2">Your Birthday :  {profile.date}</Typography>
                    </div>}

            </Layout>
        </>
    )
}