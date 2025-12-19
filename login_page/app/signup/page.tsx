"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Signup()
{
	const [username, setUsername] = useState("");
	const [email, setemail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [msg, setmsg] = useState("");
	const [msgtype, setmsgtype] = useState<"error" | "success" | "">("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(event: React.FormEvent)
	{
		event.preventDefault();
		if (loading) return;
		setLoading(true);

		if (!username || !email || !password || !confirmPassword)
		{
			setmsg("Please fill in all fields");
			setmsgtype("error");
			setLoading(false);
			return;
		}

		if (password !== confirmPassword)
		{
			setmsg("Passwords do not match");
			setmsgtype("error");
			setLoading(false);
			return;
		}

		try
		{
			const rep = await fetch("/api/users/register",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, email, password }),
			});

			const data = await rep.json();

			if (!rep.ok)
			{
				setmsg(data.message || "Signup failed");
				setmsgtype("error");
				setLoading(false);
				return;
			}

			setmsg("Signup successful");
			setmsgtype("success");
			setLoading(false);

			console.log("Backend response:", data);
		}
		catch (error)
		{
			console.error(error);
			setmsg("Server error");
			setmsgtype("error");
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#0b0f1a] px-6">
			<div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl min-h-[600px] rounded-2xl shadow-2xl bg-[#111827]">

				{/* LEFT SIDE */}
				<div className="p-10 flex flex-col justify-center rounded-xl md:rounded-l-xl md:rounded-r-none">
					<div className="mb-8">
						<h1 className="text-3xl font-extrabold text-white tracking-wide">
							Create Account
						</h1>
						<p className="mt-2 text-gray-400 text-base">
							Enter your information to sign up
						</p>
					</div>

					<div className="min-h-[24px] mb-4">
						{msg && (
							<p className={msgtype === "error" ? "text-red-400" : "text-green-400"}>
								{msgtype === "error" && "❌ "}
								{msgtype === "success" && "✅ "}
								{msg}
							</p>
						)}
					</div>

					<form className="flex flex-col gap-6" onSubmit={handleSubmit}>

						{/* Username */}
						<div className="flex flex-col gap-1">
							<label className="text-sm text-gray-300">Username</label>
							<input
								className="w-full rounded-lg border border-gray-700 bg-[#0b0f1a] px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
								value={username}
								onChange={(e) => {
									setUsername(e.target.value);
									setmsg("");
									setmsgtype("");
								}}
							/>
						</div>

						{/* Email */}
						<div className="flex flex-col gap-1">
							<label className="text-sm text-gray-300">Email</label>
							<input
								type="email"
								className="w-full rounded-lg border border-gray-700 bg-[#0b0f1a] px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
								value={email}
								onChange={(e) => {
									setemail(e.target.value);
									setmsg("");
									setmsgtype("");
								}}
							/>
						</div>

						{/* Password */}
						<div className="flex flex-col gap-1">
							<label className="text-sm text-gray-300">Password</label>
							<input
								type="password"
								className="w-full rounded-lg border border-gray-700 bg-[#0b0f1a] px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									setmsg("");
									setmsgtype("");
								}}
							/>
						</div>

						{/* Confirm Password */}
						<div className="flex flex-col gap-1">
							<label className="text-sm text-gray-300">Confirm Password</label>
							<input
								type="password"
								className="w-full rounded-lg border border-gray-700 bg-[#0b0f1a] px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value);
									setmsg("");
									setmsgtype("");
								}}
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full rounded-md bg-blue-600 text-white py-2 font-medium
								hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? "Signing up..." : "Sign Up"}
						</button>
					</form>

					<div className="mt-6 text-center text-sm text-gray-400">
						<p>
							Already have an account?{" "}
							<Link href="/login" className="text-blue-400 hover:underline">
								Log In
							</Link>
						</p>
					</div>
				</div>

				{/* RIGHT SIDE IMAGE */}
				<div className="hidden md:relative md:flex overflow-hidden rounded-r-2xl bg-[#0f172a]">
					<Image
						src="/image.png"
						alt="Signup illustration"
						fill
						className="object-contain p-12"
						priority
					/>
				</div>
			</div>
		</div>
	);
}
