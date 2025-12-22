"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home()
{
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() =>
	{
		const token = localStorage.getItem("token");

		if (!token)
		{
			router.push("/login");
		}
		else
		{
			setIsLoading(false);
		}
	}, [router]);

	function handleLogout()
	{
		localStorage.removeItem("token");
		router.push("/login");
	}

	// While we check the token, show a simple blank or loading state
	// This prevents the "flash" of private content for unauthorized users
	if (isLoading)
	{
		return (<div className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center">Loading...</div>);
	}

	return (
		<div className="min-h-screen bg-[#0b0f1a] text-white p-8">
			<nav className="max-w-5xl mx-auto flex justify-between items-center mb-12">
				<h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
				<button
					onClick={handleLogout}
					className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition"
				>
					Logout
				</button>
			</nav>

			<main className="max-w-5xl mx-auto">
				<div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
					<h2 className="text-3xl font-extrabold mb-4">Welcome Back!</h2>
					<p className="text-gray-400 mb-6">
						You have successfully bypassed the authentication gates.
						This content is only visible to logged-in users.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{/* Example Stats Cards */}
						<div className="bg-[#0b0f1a] p-6 rounded-xl border border-gray-800">
							<p className="text-sm text-gray-500 uppercase">Status</p>
							<p className="text-xl font-semibold text-green-400">Authenticated</p>
						</div>
						<div className="bg-[#0b0f1a] p-6 rounded-xl border border-gray-800">
							<p className="text-sm text-gray-500 uppercase">Token Type</p>
							<p className="text-xl font-semibold text-blue-400">Bearer JWT</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
