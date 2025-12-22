"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function VerifyEmail()
{
	const searchParams = useSearchParams();
	const router = useRouter();
	const token = searchParams.get("token");

	const [loading, setLoading] = useState(false);
	const [msg, setMsg] = useState("");
	const [msgType, setMsgType] = useState<"error" | "success" | "">("");

	useEffect(() => {
		if (!token)
		{
			setMsg("Invalid or missing verification token.");
			setMsgType("error");
		}
	}, [token]);

	async function handleConfirm()
	{
		if (!token || loading)
			return;
		setLoading(true);

		try
		{
			const res = await fetch("/api/users/verify-email",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ token }),
				}
			);

			const data = await res.json();

			if (!res.ok)
			{
				setMsg(data.message || "Verification failed");
				setMsgType("error");
				setLoading(false);
				return;
			}

			setMsg("Account created successfully");
			setMsgType("success");

			// redirect llogin so they can use their new account
			setTimeout(() => { router.push("/login"); }, 1500);
		}
		catch (error)
		{
			setMsg("Server error");
			setMsgType("error");
			setLoading(false);
		}
	}

	function handleCancel()
	{
		router.push("/signup");
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#0b0f1a] px-6">
			<div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl min-h-[600px]
				rounded-2xl shadow-2xl
				bg-white/5 backdrop-blur-xl border border-white/10">

				{/* IMAGE */}
				<div className="hidden md:relative md:flex overflow-hidden rounded-l-2xl">
					<Image
						src="/image.png"
						alt="Verify email illustration"
						fill
						className="object-contain p-12"
						priority
					/>
				</div>

				{/* CONTENT */}
				<div className="p-10 flex flex-col justify-center rounded-xl md:rounded-r-2xl md:rounded-l-none">
					<div className="mb-8">
						<h1 className="text-3xl font-extrabold text-white tracking-wide">
							Verify Email
						</h1>
						<p className="mt-2 text-gray-400">
							Do you want to create this account?
						</p>
					</div>

					<div className="min-h-[24px] mb-6">
						{msg && (
							<p className={msgType === "error" ? "text-red-400" : "text-green-400"}>
								{msgType === "error" && "❌ "}
								{msgType === "success" && "✅ "}
								{msg}
							</p>
						)}
					</div>

					<div className="flex flex-col gap-4">
						<button
							onClick={handleConfirm}
							disabled={loading || !token}
							className="w-full rounded-md bg-blue-600 text-white py-2 font-medium
								hover:bg-blue-700 transition disabled:opacity-50"
						>
							{loading ? "Confirming..." : "Yes, create my account"}
						</button>

						<button
							onClick={handleCancel}
							className="w-full rounded-md border border-gray-600 text-gray-300 py-2
								hover:bg-white/5 transition"
						>
							No, cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
