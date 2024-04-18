"use client";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function Page() {
	const { data: session } = useSession();
	const project = session?.user?.project;
	const members = session?.user?.project?.members;
	const renderProject = () => {
		if (project) {
			return (
				<div className=" relative flex flex-col md:mx-8 md:my-5 rounded-3xl p-4 w-full overflow-x-auto">
					<p className="md:text-2xl lg:text-3xl text-xl my-4 font-thin font-sans flex items-center">
						{project.name}&nbsp;&nbsp;
						<span
							className={`${
								project.status === "approved"
									? "bg-green-700 text-white"
									: project.status === "pending"
									? "bg-yellow-500 text-black"
									: "bg-red-600 text-white"
							} p-2 rounded-md w-fit text-sm`}
						>
							{project.status} {project.status === "pending" ? " approval" : "✅"}
						</span>
					</p>
					<p className="md:text-xl text-sm italic font-thin font-sans text-gray-600">
						{project.description}
					</p>
					{project.status === "approved" ? (
						<div className="my-4 p-4">
							<p className="my-4">
								AEIOU -{" "}
								<span
									className={`${
										project.aeiouStatus === "approved"
											? "bg-green-700 text-white"
											: project.aeiouStatus === "pending"
											? "bg-yellow-500 text-black"
											: "bg-red-600 text-white"
									} p-2 rounded-md w-fit text-sm`}
								>
									{project.aeiouStatus}
								</span>
							</p>
							<p className="my-4">
								Empathy Map -{" "}
								<span
									className={`${
										project.empathyStatus === "approved"
											? "bg-green-700 text-white"
											: project.empathyStatus === "pending"
											? "bg-yellow-500 text-black"
											: "bg-red-600 text-white"
									} p-2 rounded-md w-fit text-sm`}
								>
									{project.empathyStatus}
								</span>
							</p>
							<p className="my-4">
								Report -{" "}
								<span
									className={`${
										project.reportStatus === "approved"
											? "bg-green-700 text-white"
											: project.reportStatus === "pending"
											? "bg-yellow-500 text-black"
											: "bg-red-600 text-white"
									} p-2 rounded-md w-fit text-sm`}
								>
									{project.reportStatus}
								</span>
							</p>
							<p className="my-4">
								PDC -{" "}
								<span
									className={`${
										project.pdcStatus === "approved"
											? "bg-green-700 text-white"
											: project.pdcStatus === "pending"
											? "bg-yellow-500 text-black"
											: "bg-red-600 text-white"
									} p-2 rounded-md w-fit text-sm`}
								>
									{project.pdcStatus}
								</span>
							</p>
							<p className="my-4">
								Mind Map -{" "}
								<span
									className={`${
										project.mindMapStatus === "approved"
											? "bg-green-700 text-white"
											: project.mindMapStatus === "pending"
											? "bg-yellow-500 text-black"
											: "bg-red-600 text-white"
									} p-2 rounded-md w-fit text-sm`}
								>
									{project.mindMapStatus}
								</span>
							</p>
							<p className="my-4">
								Prototype -{" "}
								<span
									className={`${
										project.prototypeStatus === "approved"
											? "bg-green-700 text-white"
											: project.prototypeStatus === "pending"
											? "bg-yellow-500 text-black"
											: "bg-red-600 text-white"
									} p-2 rounded-md w-fit text-sm`}
								>
									{project.prototypeStatus}
								</span>
							</p>
						</div>
					) : (
						<></>
					)}
					<p className="lg:text-2xl md:text-xl text-sm font-thin font-sans my-4">Members :-</p>
					<table className="table-auto lg:w-[70%] md:w-[80%] w-full mx-auto">
						<thead>
							<tr>
								<th className="px-4 py-2 md:text-md text-sm font-thin">Name</th>
								<th className="px-4 py-2 md:text-md text-sm font-thin">Enrollment No.</th>
								<th className="px-4 py-2 md:text-md text-sm font-thin">Email</th>
								<th className="px-4 py-2 md:text-md text-sm font-thin">Mobile</th>
							</tr>
						</thead>
						<tbody>
							{members.map((member) => (
								<tr key={member.id}>
									<td className="border px-4 py-2 md:text-md text-sm font-thin">
										{member.name}
									</td>
									<td className="border px-4 py-2 md:text-md text-sm font-thin">
										{member.enrollNo}
									</td>
									<td className="border px-4 py-2 md:text-md text-sm font-thin">
										sample@gmail.com
									</td>
									<td className="border px-4 py-2 md:text-md text-sm font-thin">
										+918794632764
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			);
		} else {
			return <></>
		}
	};
	return (
		<>
			<Navbar />
			<div className="flex lg:w-[70%] md:w-[80%] w-[90%] mx-auto my-4 justify-center items-start h-max border border-gray-200">
				{session?.user.project !== null ? (
					<>{renderProject()}</>
				) : (
					<div className="flex w-[70%] mx-auto justify-around items-center flex-col">
						<p className="text-xl text-gray-600 font-thin my-8">
							You have no ongoing projects currently, submit a
							proposal to your respective coordinator
						</p>
						<button
							className="flex rounded-md items-center py-2 text-xl border border-transparent hover:border-gray-500 text-black font-thin font-sans px-4"
							onClick={() => router.push("/user/upload")}
						>
							<span className="hover:me-6 me-4 transition-all">
								Submit a Project approval request
							</span>
							<Image
								src={"/assets/right-arrow.png"}
								width={20}
								height={20}
								alt=" "
							/>
						</button>
					</div>
				)}
			</div>
		</>
	);
}
