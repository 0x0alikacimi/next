"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Login()
{
	const router = useRouter();
	const [email, setemail] = useState("");
	const [password, setPassword] = useState("");
	const [msg, setmsg] = useState("");
	const [msgtype, setmsgtype] = useState<"error" | "success" | "">("");
	const [loading, setLoading] = useState(false);


	useEffect(() =>
	{
		//look for the token in the browser's internal storage
		const token = localStorage.getItem("token");

		// if a token exists  the user is already "logged in"
		if (token)
		{
			console.log("User already logged in, redirecting...");
			router.push("/");
		}
	}, []);

	async function handlesubmit(event : React.FormEvent)
	{
		event.preventDefault();
		if (loading)
			return ;
		setLoading(true);

		if (email === "" || password === "")
		{
			setmsg("Please fill in all fields");
			setmsgtype("error");
			setLoading(false);
			return;
		}

		try
		{
			const rep = await fetch("/api/users/login",
			{
				method : "POST",
				headers : {"Content-Type": "application/json",},
				body : JSON.stringify({email, password,}),
			});

			const data = await rep.json();

			if (!rep.ok)
			{
				setmsg(data.message || "login failed");
				setmsgtype("error");
				setLoading(false);
				return;
			}

			// we assume 'data.token' is sent by the backend (yarbi tkun wslt)
			if (data.token)
			{
				localStorage.setItem("token", data.token); //save the token
			}

			setmsg("Login successful");
			setmsgtype("success");

			setTimeout(() => { router.push("/"); }, 1000); // Wait 1 second so user sees the "success" message

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
			<div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl min-h-[600px]
				rounded-2xl shadow-2xl
				bg-white/5 backdrop-blur-xl border border-white/10">
				<div className="p-10 flex flex-col justify-center rounded-xl md:rounded-l-xl md:rounded-r-none">
					<div className="mb-8">
					<h1 className="text-3xl font-extrabold text-white tracking-wide">
						Welcome Back
					</h1>
						<p className="mt-2 text-gray-400 text-base">
							Enter your account information
						</p>
					</div>

					<div className="min-h-[24px] mb-4">
						{msg && (
							<p
							className={
								msgtype === "error" ? "text-red-400" : "text-green-400"
							}>
								{msgtype == "error" && "❌ "}
								{msgtype == "success" && "✅ "}
								{msg}
							</p>
						)}
					</div>

					<form className="flex flex-col gap-6" onSubmit={handlesubmit}>
						<div className="flex flex-col gap-1">
							<label className="text-sm text-gray-300">Email</label>
							<input
								className=" w-full rounded-lg border border-gray-700 bg-[#0b0f1a] px-4 py-3 text-white placeholder-gray-500 transition focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
								type="email"
								value={email}
								onChange={(e) => {
									setemail(e.target.value);
									setmsg("");
									setmsgtype("");
								}}>
							</input>
						</div>

						<div>
							<label className="text-sm text-gray-300">Password</label>
							<input
								className=" w-full rounded-lg border border-gray-700 bg-[#0b0f1a] px-4 py-3 text-white placeholder-gray-500 transition focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
								type="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value)
									setmsg("");
									setmsgtype("");
								}}>
							</input>
						</div>
						<div className="text-right text-sm">
							<Link
								href="/forgotpassword"
								className="text-blue-400 hover:text-blue-300">
								Forgot password?
							</Link>
						</div>

						<button
							disabled={loading}
							className=" w-full rounded-md bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 transition duration-200 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
								type="submit">
							Login
						</button>

					</form>

					<div className="my-6 flex items-center gap-4">
						<div className="h-px flex-1 bg-gray-700"></div>
						<span className="text-sm text-gray-400">Or continue</span>
						<div className="h-px flex-1 bg-gray-700"></div>
					</div>

					<div className="mt-6 text-center text-sm text-gray-400">
						<p>
							Don't have an account?{" "}
							<Link
								href="/signup"
								className="text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline">
								Sign Up
							</Link>
						</p>
					</div>
				</div>
				<div className="hidden md:relative md:flex overflow-hidden rounded-r-2xl">
					{/* Background image */}
					<Image
						src="/image.png"
						alt="Login illustration"
						fill
						className="object-contain p-12"
						priority
					/>

					<div className="relative z-10 flex h-full w-full items-center justify-center">
						{/* add text/icons here later */}
					</div>
				</div>

			</div>
		</div>
	);
}
