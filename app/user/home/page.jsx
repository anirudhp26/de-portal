"use client"
import { useSession } from 'next-auth/react'
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function Page() {
    const { data: session } = useSession();
    const router = useRouter();
    return (
        <>
            <div className='flex mx-auto w-[100vw] min-h-[100vh] flex-col'>
            <Navbar />
                <div className="flex lg:w-[70%] md:w-[80%] w-[90%] mx-auto my-4 justify-center items-start h-max border border-gray-200 rounded-lg">
                    <div className='flex flex-col w-[30%] mx-8 my-5 rounded-3xl p-4 items-center justify-between'>
                        <Image src={'/assets/male.jpg'} width={150} height={150} alt="Profile Picture" className='rounded-full' />
                    </div>
                    <div className='flex flex-col w-[70%] mx-8 my-5 rounded-3xl p-4'>
                        <p className='text-2xl font-thin font-sans my-2'><span className='text-[15px]'>#</span>&nbsp;Personal Information</p>
                        <div>
                            <p className='text-xl font-sans font-thin my-2 text-gray-400'>name: {session?.user?.name}</p>
                            <p className='text-xl font-sans font-thin my-2 text-gray-400'>enrollment No. : {session?.user?.enrollNo}</p>
                            <p className='text-xl font-sans font-thin my-2 text-gray-400'>email: studentexample@gmail.com</p>
                            <p className='text-xl font-sans font-thin my-2 text-gray-400'>phone: +97239472924</p>
                        </div>
                        <p className='text-2xl font-thin font-sans my-2'><span className='text-[15px]'>#</span>&nbsp;Semester - 6</p>
                        <p className='text-2xl font-thin font-sans my-2'><span className='text-[15px]'>#</span>&nbsp;Information Technology</p>
                    </div>
                </div>
                <div className='flex w-[70%] mx-auto my-4 justify-center items-start h-max'>
                    {session?.user?.project !== null ? <button className='flex rounded-md items-center py-2 text-xl border border-transparent hover:border-gray-500 text-black font-thin font-sans px-4' onClick={() => router.push('/user/project')}>
                                <span className='hover:me-6 me-4 transition-all'>
                                    Go to Project Dashboard
                                </span>
                                <Image src={'/assets/right-arrow.png'} width={20} height={20} alt=' ' />
                            </button> :
                        <div className='flex w-[70%] mx-auto justify-around items-center flex-col'>
                            <p className='text-xl text-gray-600 font-thin my-8'>
                                You have no ongoing projects currently, submit a proposal to your respective coordinator
                            </p>
                            <button className='flex rounded-md items-center py-2 text-xl border border-transparent hover:border-gray-500 text-black font-thin font-sans px-4' onClick={() => router.push('/user/upload')}>
                                <span className='hover:me-6 me-4 transition-all'>
                                    Submit a Project approval request
                                </span>
                                <Image src={'/assets/right-arrow.png'} width={20} height={20} alt=' ' />
                            </button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
