import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../lib/auth";
import { connecToDB } from "../../../lib/db";

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const client = await connecToDB();

                const usersCollection = client.db().collection("users");

                const user = await usersCollection.findOne({email: credentials.email});

                if(!user) {
                    throw new Error("No user found!");
                }
                
                const isValid = await verifyPassword(credentials.password, user.password);

                if(!isValid) {
                    throw new Error("Could not log you in!");
                    client.close();
                }

                client.close();

                return {
                    email: user.email
                }

            }
        })
    ]
});