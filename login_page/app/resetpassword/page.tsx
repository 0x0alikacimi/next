"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPassword()
{
	const searchParams = useSearchParams();
	const router = useRouter();
	const token = searchParams.get("token");

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [msgType, setMsgType] = useState<"error" | "success" | "">("");
	const [loading, setLoading] = useState(false);

	useEffect (() =>
	{
		if (!token)
		{
			setMsg("Invalid or expired reset link.");
			setMsgType("error");
		}
	}, [token]);

	async function handleSubmit(e: React.FormEvent)
	{
		e.preventDefault();

		if (loading || !token)
			return;
		setLoading(true);

		if (!password || !confirmPassword)
		{
			setMsg("Please fill in all fields");
			setMsgType("error");
			setLoading(false);
			return;
		}

		if (password !== confirmPassword)
		{
			setMsg("Passwords do not match");
			setMsgType("error");
			setLoading(false);
			return;
		}

		try
		{
			const rep = await fetch("/api/users/reset-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token, password }),
			});

			const data = await rep.json();

			if (!rep.ok)
			{
				setMsg(data.message || "Failed to reset password");
				setMsgType("error");
				setLoading(false);
				return;
			}
			setMsg("Password reset successfully! Redirecting to login...");
			setMsgType("success");

			setTimeout(() => { router.push("/login"); }, 2000);
		}
		catch (error)
		{
			setMsg("Server error");
			setMsgType("error");
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#0b0f1a] px-6">
			<div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl min-h-[600px]
				rounded-2xl shadow-2xl
				bg-white/5 backdrop-blur-xl border border-white/10">

				{/* IMAGE — LEFT */}
				<div className="hidden md:relative md:flex overflow-hidden rounded-l-2xl">
					<Image
						src="/image.png"
						alt="Reset password illustration"
						fill
						className="object-contain p-12"
						priority
					/>
				</div>

				{/* FORM — RIGHT */}
				<div className="p-10 flex flex-col justify-center rounded-xl md:rounded-r-2xl md:rounded-l-none">
					<div className="mb-8">
						<h1 className="text-3xl font-extrabold text-white tracking-wide">
							Reset Password
						</h1>
						<p className="mt-2 text-gray-400 text-base">
							Choose a new password for your account
						</p>
					</div>

					{/* MESSAGE */}
					<div className="min-h-[24px] mb-4">
						{msg && (
							<p className={msgType === "error" ? "text-red-400" : "text-green-400"}>
								{msgType === "error" && "❌ "}
								{msgType === "success" && "✅ "}
								{msg}
							</p>
						)}
					</div>

					<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
						{/* NEW PASSWORD */}
						<div className="flex flex-col gap-1">
							<label className="text-sm text-gray-300">New Password</label>
							<input
								type="password"
								className="w-full rounded-lg border border-gray-700 bg-[#0b0f1a] px-4 py-3 text-white
									focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									setMsg("");
									setMsgType("");
								}}
							/>
						</div>

						{/* CONFIRM PASSWORD */}
						<div className="flex flex-col gap-1">
							<label className="text-sm text-gray-300">Confirm New Password</label>
							<input
								type="password"
								className="w-full rounded-lg border border-gray-700 bg-[#0b0f1a] px-4 py-3 text-white
									focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value);
									setMsg("");
									setMsgType("");
								}}
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full rounded-md bg-blue-600 text-white py-2 font-medium
								hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? "Resetting..." : "Reset Password"}
						</button>
					</form>

					<div className="mt-6 text-center text-sm text-gray-400">
						<Link href="/login" className="text-blue-400 hover:underline">
							Back to Login
						</Link>
					</div>
				</div>

			</div>
		</div>
	);
}
