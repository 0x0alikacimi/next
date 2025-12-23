"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";

export default function Settings()
{
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [userMsg, setUserMsg] = useState({ text: "", type: "" });
	const [passMsg, setPassMsg] = useState({ text: "", type: "" });

	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() =>
	{
		// const token = localStorage.getItem("token");
		// if (!token) router.push("/login");
		// Pre-fill username from local storage or previous state if available
	}, [router]);

	const handleUpdateUsername = async (e: React.FormEvent) =>
	{
		e.preventDefault();
		// using patch to update the username
		setUserMsg({ text: "Username updated successfully!", type: "success" });
	};

	const handleChangePassword = async (e: React.FormEvent) =>
	{
		e.preventDefault();
		if (password !== confirmPassword)
		{
			setPassMsg({ text: "Passwords do not match", type: "error" });
			return;
		}
		// using patch to update the passwoord
		setPassMsg({ text: "Password changed!", type: "success" });
	};

	const handleLogout = () =>
	{
		localStorage.removeItem("token");
		router.push("/login");
	};

	const handleDeleteAccount = () =>
	{
		// using delete to delet the acc
		localStorage.removeItem("token");
		router.push("/signup");
	};

	return (
		<div className="min-h-screen bg-[#0b0f1a] px-6 py-10">
			<Navbar />

			<div className="max-w-2xl mx-auto flex flex-col gap-8">
				<h1 className="text-white text-3xl font-bold mb-4">Settings</h1>

				{/* PROFILE SECTION */}
				<div className="rounded-2xl bg-white/5 border border-white/10 p-8">
					<h2 className="text-white text-xl font-semibold mb-6">Profile Settings</h2>
					<form onSubmit={handleUpdateUsername} className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<label className="text-sm text-gray-400">New Username</label>
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="bg-[#0b0f1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
								placeholder="Enter new username"
							/>
						</div>
						{userMsg.text && (
							<p className={`text-sm ${userMsg.type === "error" ? "text-red-400" : "text-green-400"}`}>{userMsg.text}</p>
						)}
						<button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
							Update Username
						</button>
					</form>
				</div>

				{/* SECURITY SECTION */}
				<div className="rounded-2xl bg-white/5 border border-white/10 p-8">
					<h2 className="text-white text-xl font-semibold mb-6">Security</h2>
					<form onSubmit={handleChangePassword} className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<label className="text-sm text-gray-400">New Password</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="bg-[#0b0f1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label className="text-sm text-gray-400">Confirm New Password</label>
							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className="bg-[#0b0f1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
							/>
						</div>
						{passMsg.text && (
							<p className={`text-sm ${passMsg.type === "error" ? "text-red-400" : "text-green-400"}`}>{passMsg.text}</p>
						)}
						<button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
							Change Password
						</button>
					</form>
				</div>

				{/* DANGER ZONE */}
				<div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-8">
					<h2 className="text-red-400 text-xl font-semibold mb-6">Danger Zone</h2>
					<div className="flex flex-col gap-6">

						{/* New Logout */}
						<div className="flex flex-col gap-2">
							<p className="text-sm text-gray-400">Finish your current session</p>
							<button
								onClick={handleLogout}
								className="w-full py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-white/5 hover:text-white transition font-medium"
							>
								Log Out
							</button>
						</div>

						<div className="h-px bg-red-500/10" />

						{/* Delete Account*/}
						{!showDeleteConfirm ? (
							<button
								onClick={() => setShowDeleteConfirm(true)}
								className="w-full py-2 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 transition font-medium"
							>
								Delete Account
							</button>
						) : (
							<div className="flex flex-col gap-4 p-4 bg-red-600/10 rounded-xl border border-red-600/20">
								<p className="text-red-400 text-sm font-semibold text-center uppercase tracking-wider">
									Permanent Action: Are you sure?
								</p>
								<div className="flex gap-4">
									<button
										onClick={handleDeleteAccount}
										className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold transition"
									>
										YES, DELETE
									</button>
									<button
										onClick={() => setShowDeleteConfirm(false)}
										className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
									>
										CANCEL
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
