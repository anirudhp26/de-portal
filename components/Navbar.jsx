"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Navbar() {
    const [onAccountHover, setOnAccountHover] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    return (
        <div className="p-2 flex md:w-[80%] w-[90%] mx-auto justify-between items-center h-max">
            <p className="md:text-3xl text-lg mx-8 my-5 font-serif font-bold">
                Design Engineering
            </p>
            <div className="lg:w-[30%] md:w-[40%] flex justify-between">
                <p
                    className="text-xl hidden md:flex font-sans font-thin my-2 text-gray-400 cursor-pointer hover:text-black"
                    onClick={() => {
                        router.push("/user/home");
                    }}
                >
                    Home
                </p>
                <p
                    className="text-xl hidden md:flex font-sans font-thin my-2 text-gray-400 cursor-pointer hover:text-black"
                    onClick={() => {
                        router.push("/user/project");
                    }}
                >
                    Project
                </p>
                <p
                    className="text-xl hidden md:flex font-sans font-thin my-2 text-gray-400 cursor-pointer hover:text-black"
                    onClick={() => {
                        router.push("/user/upload");
                    }}
                >
                    Upload
                </p>
            </div>
            <div className="relative flex flex-col justify-center items-center lg:w-[20%] md:w-[30%] w-[40%] p-4">
                <span
                    className="cursor-pointer"
                    onClick={() => setOnAccountHover((prev) => !prev)}
                >
                    <Image
                        src={"/assets/male.jpg"}
                        alt="profile"
                        width={70}
                        height={70}
                    />
                </span>
                <div
                    className={`${onAccountHover ? "absolute" : "hidden"
                        } flex flex-col w-full top-[10vh] items-center justify-between p-4 bg-white border rounded-sm`}
                >
                    <p className="font-sans font-thin text-sm flex lg:flex-row flex-col justify-center items-center">Welcome, {session?.user?.name}&nbsp;&nbsp;&nbsp;<button
                        className="px-3 py-1 text-[13px] rounded-lg border-gray-500 border bg-white text-black hover:text-white hover:bg-red-600 transition-all hover:border hover:border-white"
                        onClick={() => signOut({
                            redirect: "/",
                        })}
                    >
                        Logout
                    </button></p>
                    <p
                        className="flex md:hidden text-sm font-sans font-thin my-2 text-gray-400 cursor-pointer hover:text-black"
                        onClick={() => {
                            router.push("/user/home");
                        }}
                    >
                        Home
                    </p>
                    <p
                        className="flex md:hidden text-sm font-sans font-thin my-2 text-gray-400 cursor-pointer hover:text-black"
                        onClick={() => {
                            router.push("/user/project");
                        }}
                    >
                        Project
                    </p>
                    <p
                        className="flex md:hidden text-sm font-sans font-thin my-2 text-gray-400 cursor-pointer hover:text-black"
                        onClick={() => {
                            router.push("/user/upload");
                        }}
                    >
                        Upload
                    </p>
                </div>
            </div>
        </div>
    );
}
