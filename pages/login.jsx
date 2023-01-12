import React, { useState, useEffect } from "react";

import { useForm } from 'react-hook-form'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import Layout from "../component/Layout";
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import FormControlLabel from '@mui/material/FormControlLabel';
import SendIcon from "@mui/icons-material/Send"
import Checkbox from "@mui/icons-material/CheckBox"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router'
import axios from "axios";
import { getToken } from "next-auth/jwt";


export default function Login({ providers }) {
    const router = useRouter()
    const [showPassword, setShowPassword] = React.useState(false);
    const [providerss, setProviderss] = useState(null)
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const { register, formState: { errors }, handleSubmit, reset } = useForm()



    const { data: session, status } = useSession()
    const onsubmit = async (data) => {


        const email = data.email
        const password = data.password

        await signIn('credentials',
            {
                redirect: false,
                email,
                password,

                callbackUrl: `${window.location.origin}`
            })

    }

    return (
        <>
            <Layout>
                {session && session.user.email}
                {providers &&
                    Object.values(providers).map((provider) => (

                        <div key={provider.name}>
                            <button
                                onClick={() => {

                                    signIn(provider.id);
                                    setProviderss(provider.id)

                                }}
                            >
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                {!session && < div >
                    < form onSubmit={handleSubmit(onsubmit)} className="LoginForm">
                        <div>
                            <label htmlFor="email"></label>
                            <Input name="email" placeholder="Email" {...register("email", { required: true })} />
                        </div>
                        <div>

                            <FormControl sx={{ m: 0, width: '21ch', height: '10ch' }} variant="filled">
                                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                <FilledInput
                                    name="password"
                                    {...register("password", { required: true })}
                                    id="filled-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}

                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>

                        <Stack>
                            <Button variant="contained" endIcon={<SendIcon />} type="submit">
                                Send
                            </Button>
                        </Stack>

                    </form>
                </div>}

            </Layout >
        </>

    )

}
export async function getServerSideProps(context) {

    const providers = await getProviders();
    console.log(providers)
    return {
        props: { providers },
    };
}


