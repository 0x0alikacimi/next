"use client"
import { useState } from "react";
import Link from "next/link";

export default function Login()
{
	// state = data that can change over time AND cause the UI to update
	const [email, setemail] = useState("");
	const [password, setPassword] = useState("");
	const [msg, setmsg] = useState("");
	const [msgtype, setmsgtype] = useState<"error" | "success" | "">("");


	async function handlesubmit(event : React.FormEvent)
	{
		event.preventDefault(); // stops reload
		if (email === "" || password === "")
		{
			setmsg("Please fill in all fields");
			setmsgtype("error");
			return;
		}

		try
		{
			const rep = await fetch("/login",
			{
				method : "POST",
				headers : {"Content-Type": "application/json",},
				body : JSON.stringify({email, password,}),
			});

			const data = await rep.json();

			if (!rep.ok)
			{
				setmsg(data.message || "Signup failed");
				setmsgtype("error");
				return;
			}

			setmsg("Login successful");
			setmsgtype("success");

			console.log("Backend response:", data);
		}

		//nredirecti luse l home wla ...

		catch (error)
		{
			console.error(error);
			setmsg("Server error");
			setmsgtype("error");
		}
	}

	return (
		<div>
			{msg && (
				<p
				className={
					msgtype === "error" ? "text-red-600" : "text-green-600"
				}>
					{msgtype == "error" && "❌ "}
					{msgtype == "success" && "✅ "}
					{msg}
				</p>
			)}
			<form
				onSubmit={handlesubmit}
				className="flex flex-col gap-4 max-w-sm"
			>
				<div>
					<label>Email</label>
					<input
						className="border border-gray-300 p-2 rounded"
						type="email"
						value={email}
						onChange={(e) => {
							setemail(e.target.value);
							setmsg("");
							setmsgtype("");
						}}
					></input>
				</div>
				<div>
					<label>Password</label>
					<input
						className="border border-gray-300 p-2 rounded"
						type="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value)
							setmsg("");
							setmsgtype("");
						}}
					></input>
				</div>
				<button
					type="submit"
					className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
				>
					login
				</button>
				<p>
					Don't have an account ? {" "}
					<Link
						href="/signup"
						className="text-blue-600 hover:underline"
					>
						Sign Up
					</Link>
				</p>
			</form>
		</div>
	);
}
