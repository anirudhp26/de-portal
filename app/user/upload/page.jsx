"use client"
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { toast } from "sonner";

export default function Page() {
	const [coordinator, setcoordinator] = useState([]);
	const [projectData, setProjectData] = useState({});
	const [users, setUsers] = useState([]);
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!session) {
			router.push("/");
		}
		if (session?.user?.project !== null) {
			router.push("/user/project");
		}
	}, [session, router]);

	useEffect(() => {
		async function fetchcoordinator() {
			const response = await fetch("/api/admins", {
				method: "GET",
			});
			const data = await response.json();
			setcoordinator(data.map((coodinator) => ({ value: coodinator.id, label: coodinator.name })));
		}
		fetchcoordinator();
	}, []);

	useEffect(() => {
		async function fetchUsers() {
			const response = await fetch("/api/users");
			const data = await response.json();
			setUsers(data.map((user) => ({ value: user.id, label: user.name })).filter((user) => user.value !== session?.user?.id));
		}
		fetchUsers();
	}, [session]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/projects", {
				method: "POST",
				body: JSON.stringify({ ...projectData, members: [session?.user?.id, ...projectData.members] }),
			});
			const data = await response.json();
			if (data.status === 200) {
				toast.success(data.message);
				router.push("/user/project");
			} else {
				toast.error("Something went wrong");
			}
		} catch (error) {
			toast.error(error)
		}
	}

	return (
		<>
			<Navbar />
			<div className="flex flex-col lg:w-[70%] md:w-[80%] w-[90%] mx-auto my-4 justify-center items-start h-max">
				<form className="flex flex-col w-full my-5 p-4 justify-between" onSubmit={handleSubmit}>
					<p className="text-2xl font-thin font-sans my-2">
						# Upload Project
					</p>
					<input
						type="text"
						placeholder="Project Title"
						className="my-4 p-2 border"
						name="title"
						onChange={(e) => {
							setProjectData({ ...projectData, title: e.target.value });
						}}
					/>
					<textarea
						placeholder="Description"
						className="my-4 p-2 border"
						name="description"
						onChange={(e) => {
							setProjectData({ ...projectData, description: e.target.value });
						}}
					></textarea>
					<ReactSelect
						className="my-4 p-2 border"
						placeholder="Select Your Coordinator.."
						options={coordinator}
						onChange={(selectedOption) => {
							setProjectData({ ...projectData, coordinator: selectedOption.value });
						}}
					/>
					<ReactSelect 
						className="my-4 p-2 border"
						placeholder="Select Your Domain.."
						options={[
							{ value: "d", label: "Diciplinary" },
							{ value: "id", label: "Inter-Diciplinary" }
						]}
						onChange={(selectedOption) => {
							setProjectData({ ...projectData, domain: selectedOption.value });
						}}
					/>
					<ReactSelect
						isMulti
						className="my-4 p-2 border"
						placeholder="Select Your Team Members.."
						options={users}
						isOptionDisabled={() => projectData?.members?.length >= 3}
						onChange={(selectedOption) => {
							console.log(selectedOption);
							setProjectData({ ...projectData, members: selectedOption.map((option) => option.value) });
						}}
					/>
				<div className="bg-gray-300 w-full h-[1px] my-4"></div>
					<button
						type="submit"
						className="w-[20%] mt-2 border border-transparent bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black py-2 px-4 flex justify-center text-sm rounded-lg transition font-thin font-sans"
					>
						Submit
					</button>
				</form>
			</div>
		</>
	);
}
