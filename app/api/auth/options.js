import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/config/db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                enroll: { label: "Enroll", type: "text" },
                login_type: { label: "Type", type: "text" },
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (credentials.login_type == "admin") {
                        const admin = await prisma.admins.findUnique({
                            where: {
                                email: credentials.email,
                            }
                        });
                        if (admin) {
                            const isPasswordCorrect = await bcrypt.compare(
                                credentials.password,
                                admin.password
                            );
                            if (isPasswordCorrect) {
                                return admin;
                            } else {
                                throw new Error("Invalid Credentials");
                            }
                        } else {
                            throw new Error("Invalid Credentials");
                        }
                    } else if (credentials.login_type == "student") { 
                        const user = await prisma.user.findUnique({
                            where: {
                                enrollNo: credentials.enroll,
                            }
                        });
                        if (user) {
                            const isPasswordCorrect = await bcrypt.compare(
                                credentials.password,
                                user.password
                            );
                            if (isPasswordCorrect) {
                                return user;
                            } else {
                                throw new Error("Invalid Credentials");
                            }
                        } else {
                            throw new Error("Invalid Credentials");
                        }
                    } else {
                        return null;
                    }
                } catch (err) {
                    throw new Error(err);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({account}) {
            if (account?.provider == "credentials") {
                return true;
            } else {
                return false;
            }
        },
        async jwt({ token, account, profile }) {
            if (account) {
                if (account.provider == "credentials") {
                    token.provider = "credentials";
                    token.accessToken = account.access_token;
                }
            }
            return token;
        },
        async session({ session, token, profile }) {
            if (token.provider == "credentials") {
                if (token.email) {
                    const admin = await prisma.admins.findUnique({
                        where: {
                            email: token.email,
                        },
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        }
                    });
                    if (admin) {
                        session.user = admin;
                        session.type = "admin";
                    }
                } else {
                    const user = await prisma.user.findUnique({
                        where: {
                            id: Number(token.sub),
                        },
                        select: {
                            id: true,
                            enrollNo: true,
                            name: true,
                            projectId: true,
                            project: {
                                include: {
                                    members: true,
                                }
                            },
                        }
                    });
                    if (user) {
                        session.user = user;
                        session.type = "student";
                    }
                }
                return session;
            }
        },
    },
    pages: {
        signIn: ["/"],
        newUser: "/"
    }
};
