import React, { useEffect } from "react"
import styles from './Nav.module.css'
import Link from 'next/link'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'
import DarkMode from "../pages/darkmode"

export default function Nav() {

    const { data: session } = useSession()
    const handleSignIn = (e) => {
        e.preventDefault()
        signIn()
        
    }
    const handleSignOut = (e) => {
        e.preventDefault()

        signOut()
    }
    return (
        <nav className={styles.navbar}>
            <div className={styles.navItems}>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    {session &&
                        <li>
                            <Link href="/Dashboard">Dashboard</Link>
                        </li>
                    }
                    {
                        session &&
                        <li>
                            <Link href="/Profile">Profile</Link>
                        </li>
                    }

                    <li>
                        <Link href="/Register">Register</Link>
                    </li>

                    {
                        session &&
                        <li>
                            <Link href="/Posts">Add Post</Link>
                        </li>}
                    {
                        session &&
                        <li>
                            <Link href="/Posts/Photo">Add Photo</Link>
                        </li>}
                    {session &&
                        <li>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </li>
                    }

                    {!session && <li>
                        <button onClick={handleSignIn}>Sign In </button>
                    </li>}
                    <li><DarkMode /></li>

                </ul>
            </div>
        </nav >
    )
}