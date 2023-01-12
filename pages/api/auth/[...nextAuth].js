import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialProvider from 'next-auth/providers/credentials'
//import EmailProvider from 'NextAuth/providers/email'
import axios from 'axios'


export const oathOption = {

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        // EmailProvider({
        //     clientId:,
        //     clientSecret:
        // }),
        CredentialProvider({
            name: "Credentials",
            session: {
                jwt: true,
                maxAge: 30 * 24 * 60 * 60,
                //  updateAge: 24 * 60 * 60,
            },
            credentials: {
                // username: { label: "Username", type: "text", placeholder: "Username" },
                // password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const payload = {
                    email: credentials.email,
                    password: credentials.password
                }
                const res = await axios.post("http://localhost:3000/api/login", { payload })

                const user = res.data.user

                if (user && res.status) {

                    return user;
                }


                return null;

            },


            secret: process.env.NEXTAUTH_SECRET,



        }),
    ], callbacks:
    {

        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async jwt({ token, user }) {


            if (user) {

                token.accessToken = user.token


                // token.refreshtoken = user.refreshtoken

            }
            return token
        },

        // async signIn({ user, account, profile, email, credentials }) {
        //     //user = user.user
        //     return true
        // },
        async session({ token, session }) {

            session.accessToken = token.accessToken
            session.user.id = token.id

            return session


        }
    }, pages: {
        signIn: "/login"
    }



}
export default (req, res) => NextAuth(req, res, oathOption)
