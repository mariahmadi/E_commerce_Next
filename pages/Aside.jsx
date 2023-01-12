import React from "react";
import { TextField } from "@mui/material";
import Link from "next/link";
export default function ShowAside() {


    return (
        <div className="Aside">
           
            <br /> <br />

            <aside >
                <h3>List Of Category</h3>
                <div className="aside-Link">
                    <Link href='https://google.com'>
                        Google
                    </Link>
                    <br />
                    <Link href='https://Facebook.com'>
                        Facebook
                    </Link>
                    <br />
                    <Link href='https://Reddit.com'>
                        Reddit
                    </Link>
                    <br />
                    <Link href='https://Crypto.com'>
                        Crypto
                    </Link>
                    <br />
                    <Link href='https://Coinmarketcap.com'>
                        Marketcap
                    </Link>
                    <br />
                    <Link href='https://Exchange.com'>
                        Exchange
                    </Link>
                    <br />
                    <Link href='https://React.com'>
                        React
                    </Link>
                    <br />

                    <Link href='http://twitter.com'>
                        Twitter
                    </Link>
                </div>

            </aside>
        </div>
    )
}