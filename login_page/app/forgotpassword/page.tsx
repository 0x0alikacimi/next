"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPassword()
{
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [msgType, setMsgType] = useState<"error" | "success" | "">("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent)
	{
		e.preventDefault();

		if (loading)
				return;
		setLoading(true);

		if (!email)
		{
			setMsg("Please enter your email");
			setMsgType("error");
			setLoading(false);
			return;
		}

		// later connect to backend API
		// check wach kayn had l'email 
		setMsg("If this email exists, a reset link was sent");
		setMsgType("success");
		setLoading(false);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#0b0f1a] px-6">
			<div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl min-h-[600px] rounded-2xl shadow-2xl bg-[#111827]">

				{/* IMAGE — LEFT */}
				<div className="hidden md:relative md:flex overflow-hidden rounded-l-2xl bg-[#0f172a]">
					<Image
						src="/image.png"
						alt="Forgot password illustration"
						fill
						className="object-contain p-12"
						priority
					/>
				</div>

				{/* FORM — RIGHT */}
				<div className="p-10 flex flex-col justify-center rounded-xl md:rounded-r-2xl md:rounded-l-none">
					<div className="mb-8">
						<h1 className="text-3xl font-extrabold text-white tracking-wide">
							Forgot Password
						</h1>
						<p className="mt-2 text-gray-400 text-base">
							Enter your email to reset your password
						</p>
					</div>

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
						<div className="flex flex-col gap-1">
							<label className="text-sm text-gray-300">Email</label>
							<input
								type="email"
								className="w-full rounded-lg border border-gray-700 bg-[#0b0f1a] px-4 py-3 text-white
									focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
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
							{loading ? "Sending..." : "Send Reset Link"}
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
