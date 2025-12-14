"use client";
import { useState } from "react";

export default function signup()
{
	const [email, setemail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [msg, setmsg] = useState("");
	const [msgType, setmsgtype] = useState<"error" | "success" | "">("");

	async function handleSubmit(event: React.FormEvent)
	{
		event.preventDefault();
		if (!email || !password || !confirmPassword)
		{
			setmsg("Please fill in all fields");
			setmsgtype("error");
			return;
		}
		if (password !== confirmPassword)
		{
			setmsg("Passwords do not match");
			setmsgtype("error");
			return;
		}

		try
		{
			const rep = await fetch("http://localhost:8080/users/register",
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

			setmsg("Signup successful");
			setmsgtype("success");
			console.log("Backend response:", data);
		}

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
				<p className={
					msgType === "error" ? "text-red-600" : "text-green-600"
				}>
					{msgType === "error" && "❌ "}
					{msgType === "success" && "✅ "}
					{msg}
				</p>
			)}
			<form
				onSubmit={handleSubmit}
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
				<div>
					<label>confirm Password</label>
					<input
						className="border border-gray-300 p-2 rounded"
						type="password"
						value={confirmPassword}
						onChange={(e) => {
							setConfirmPassword(e.target.value)
							setmsg("");
							setmsgtype("");
						}}
					></input>
				</div>
				<button
					type="submit"
					className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
				>
					Sign Up
				</button>
			</form>
		</div>
	)
}
