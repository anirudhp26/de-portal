/* eslint-disable react/no-unescaped-entities */
"use client"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function Home() {
  const router = useRouter();
  const [loginPage, setLoginPage] = useState(true);
  const { data, status } = useSession();

  useEffect(() => {
    if (data) {
      if (status === "authenticated") {
        router.replace("/user/home");
      }
    }
  }, [status, router, data]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = signIn("credentials", {
        redirect: false,
        enroll: e.target[0].value,
        password: e.target[1].value,
        login_type: "student",
      });
      if (res?.error) {
        console.log(res.error);
        toast.error(res.error);
      }
      if (res.ok) {
        window.location.replace("/user/home");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      if (e.target[2].value !== e.target[3].value) {
        toast.error("Password doesn't match");
        return;
      }
      toast.loading("Creating your Account", { id: 1 });
      const res = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          name: e.target[0].value,
          enrollNo: e.target[1].value,
          password: e.target[2].value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const reqData = await res.json();
      if (reqData.status) {
        toast.dismiss(1);
        const res = signIn("credentials", {
          redirect: false,
          enroll: e.target[1].value,
          password: e.target[2].value,
          login_type: "student"
        });
        if (res?.error) {
          console.log(res.error);
          toast.error(res.error);
        }
        if (res.ok) {
          router.push("/user/home");
        }
      } else {
        console.log(reqData.message);
        toast.error(reqData.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }
  return (
    <>
      {loginPage ? (
				<div className="lg:w-[40%] md:w-[60%] w-[96%] absolute top-[15vh] md:left-[30%] left-[2%] flex flex-col items-center">
					<form
						className="flex md:w-[50%] w-[90%] flex-col mx-auto my-4"
						onSubmit={handleLogin}
					>
						<p className="font-serif text-3xl font-bold my-4">
							Student Login
						</p>
						<input
							type="text"
							placeholder="enrollment No."
							className="my-2 p-2 border"
						/>
						<input
							type="password"
							placeholder="password"
							className="my-2 p-2 border"
						/>
						<button
							type="submit"
							className="w-[20%] mt-2 mx-auto border border-transparent bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black py-[5px] text-[12px] rounded-[1.25rem] transition"
						>
							Login
						</button>
					</form>
					<div className="md:w-[50%] w-[90%] my-2 h-[0.5px] bg-gray-300"></div>
					<button
						className="w-[40%] border border-transparent bg-white text-black hover:bg-black hover:text-white hover:border hover:border-black py-[5px] my-4 text-[12px] transition"
						onClick={() => setLoginPage(false)}
					>
						Don't have an account? Signup
					</button>
				</div>
			) : (
				<div className="md:w-[40%] w-[90%] absolute top-[15vh] md:left-[30%] left-[5%] flex flex-col items-center">
					<form
						className="flex md:w-[50%] w-[90%] flex-col mx-auto my-4"
						onSubmit={handleSubmit}
					>
						<p className="font-serif text-3xl font-bold my-4">
							Student SignUp
						</p>
						<input
							type="text"
							placeholder="name"
							className="my-2 p-2 border"
						/>
						<input
							type="text"
							placeholder="enrollment No."
							className="my-2 p-2 border"
						/>
						<input
							type="password"
							placeholder="password"
							className="my-2 p-2 border"
						/>
						<input
							type="password"
							placeholder="confirm password"
							className="my-2 p-2 border"
						/>
						<button
							type="submit"
							className="w-[20%] mt-2 mx-auto border border-transparent bg-black text-white hover:text-black hover:bg-white hover:border hover:border-black py-[5px] text-[12px] rounded-[1.25rem] transition"
						>
							Sign-up
						</button>
					</form>
					<div className="w-[50%] my-2 h-[0.5px] bg-gray-300"></div>
					<button
						className="w-[40%] border border-transparent hover:bg-black hover:text-white hover:border hover:border-black py-[5px] my-4 text-[12px] transition"
						onClick={() => setLoginPage(true)}
					>
						Already have an account? Login
					</button>
				</div>
			)}
    </>   
  );
}
