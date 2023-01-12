import React from "react";
import { slide as Menu } from 'react-burger-menu'
import Link from 'next/link'
import axios from "axios";
import { List, Divider, ListItem, ListItemText } from '@mui/material'

export default function Sidebar() {
    const style = {
        width: '100%',
        maxWidth: 360,
      
    };
    return (
        <Menu>
            <Link className="menu-item" href="/">
                Home
            </Link>
            <Link className="menu-item" href="/login">
                Login
            </Link>
            <Link className="menu-item" href="/Register">
                Register
            </Link>
            <Link className="menu-item" href="/desserts">
                Desserts
            </Link>
            <List sx={style} component="nav" aria-label="mailbox folders">
                <ListItem >
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem  divider>
                    <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem >
                    <ListItemText primary="Trash" />
                </ListItem>
                <Divider light />
                <ListItem >
                    <ListItemText primary="Spam" />
                </ListItem>
            </List>
        </Menu>
    )
}