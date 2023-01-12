import React, { useState } from "react";
import { } from 'next-auth/providers/credentials'
import { Controller, useForm } from 'react-hook-form'
import { signIn, signOut, useSession, } from "next-auth/react"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from "next/router";
import Button from '@mui/material/Button';
import Layout from "../component/Layout";
import jalaaliAdapter from "@date-io/jalaali";
import { Stack } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from "@mui/material/TextField"
import { CalendarPicker, faIR } from '@mui/x-date-pickers';
import axios from 'axios'

export default function SignUp() {
    const router = useRouter()
    const schema = yup.object().shape({
        email: yup.string().required(),
        password: yup.string().min(2).max(25).required(),
        conformPassword: yup.string().min(2).max(25).required(),
        birthday: yup.date()
    })
    const [value, setValue] = useState()



    const { register, control, formState: { errors }, handleSubmit, reset } = useForm({ resolver: yupResolver(schema) })

    const Onsubmit = async (data) => {
        try {
            console.log(data)
            if (data.conformPassword == data.password) {
                await axios.post("http://localhost:3000/api/auth/UserControler", { data: data }, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*"
                    }
                })
                    .then((res) => {

                        console.log(res)
                        router.push("/login")
                    })
            }
            reset()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Layout>
                <div >
                    <form className="register" onSubmit={handleSubmit(Onsubmit)}>
                        <div>
                            <label htmlFor="Email"></label>
                            <input name="email" placeholder="Enter Email" {...register("email", { required: true })} />
                            {errors.email && errors.email.message}
                        </div>
                        <div>
                            <label htmlFor="Password"></label>
                            <input name="password" placeholder="Enter Password" {...register("password", { required: true })} />
                            {errors.password && errors.password.message}
                        </div>
                        <div>
                            <label htmlFor="ConfirmPassword"></label>
                            <input name="conformPassword" placeholder="Enter Password Again" {...register("conformPassword", { required: true })} />
                            {errors.conformPassword && errors.conformPassword.message}
                        </div>
                        <div>
                            <p>Select Gender</p>
                            <input type="radio" value="Female" name="Female" {...register("gender", { required: true })} /> Female
                            <input type="radio" value="Male" name="Male" {...register("gender", { required: true })} /> Male
                            <input type="radio" value="Other" name="Other" {...register("gender", { required: true })} /> Other


                        </div>
                        <div>
                            <LocalizationProvider dateAdapter={jalaaliAdapter} adapterLocale="fa-IR"
                                localeText={faIR.components.MuiLocalizationProvider.defaultProps.localeText}>

                                <label>Birthday</label>

                                <Controller

                                    control={control}
                                    name='birthday'

                                    rules={{ required: true }}
                                    render={({ field: { onChange, name, value },
                                        fieldState: { invalid, isDirty },
                                        formState: { errors }, }) => (

                                        <DatePicker

                                            disableMaskedInput={true}
                                            value={value}
                                            onChange={(data) => { onChange(data) }}
                                            renderInput={(params) => <TextField type="text" {...params} />}

                                        />
                                    )}
                                />

                            </LocalizationProvider>
                        </div>


                        <Button variant="contained" type="submit">Register</Button>
                    </form>
                </div>

            </Layout>

        </>
    )

}