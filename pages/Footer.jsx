import React from "react";
import Link from "next/link";
import { Box, Grid, Paper, Container, Button } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import FacebookIcon from '@mui/icons-material/Facebook';


export default function Footer() {



    const date = new Date().getFullYear()
    //console.log(date)
    return (
        <footer>
            <Box className="Container">
                <h1 style={{
                    color: "green",
                    textAlign: "center",
                    marginTop: "-50px"
                }}>
                    Wellcome To My Channel
                </h1>
                <div className="row">
                    <div className="Column">

                        <Link href="#"><h5>Amazon</h5></Link>
                        <Link href="#"><h5>Heroku</h5></Link>
                        <Link href="#"><h5>Vercel</h5></Link>
                    </div>
                    <div className="Column">

                        <Link href="#"><h5>new 4</h5></Link>
                        <Link href="#"><h5>new 5</h5></Link>
                        <Link href="#"><h5>new 6</h5></Link>
                    </div>
                    <div className="Column">
                        <Button endIcon={<TwitterIcon />} placeholder="twitter" />
                        <Button endIcon={<FacebookIcon />} placeholder="Facebook" />
                        <Button endIcon={<RedditIcon />} placeholder="Reddit" />

                    </div>
                </div>
            </Box>
        </footer >

    );
};
