import React from "react";
import Nav from "./Nav";
import Footer from "../pages/Footer";
import Head from "next/head";

import Sidebar from "../pages/Sidebar";
export default function Layout({ children }) {
    return (<>

        <div>

            <Nav />
            <Head>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Sidebar outerContainerId={'outer-container'} />


            <main>
                {children}
            </main>
            <br /> <br />  <br />  <br />  <br />  <br />  <br />
            <br /> <br />  <br />  <br /> <br /> <br />
            <Footer />
        </div>
    </>


    )
}