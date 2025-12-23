"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/navbar";
import { Bot, Users, Monitor, Globe } from "lucide-react";

// Data Blueprints
interface UserData {
	username: string;
	level: number;
	xp: number;
}

interface Match {
	id: number;
	myScore: number;
	opponentScore: number;
	opponentName: string;
	result: "win" | "loss";
}

export default function Home() {
	const router = useRouter();
	const [user, setUser] = useState<UserData | null>(null);
	const [matches, setMatches] = useState<Match[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");

		// if (!token)
		// {
		// 	router.push("/login");
		// 	return;
		// }

		const fetchData = async () => {
			await new Promise(resolve => setTimeout(resolve, 800));
			setUser({ username: "ana", level: 12, xp: 65 });
			setMatches([
				{ id: 1, myScore: 10, opponentScore: 8, opponentName: "you", result: "win" },
				{ id: 2, myScore: 5, opponentScore: 10, opponentName: "Ghost", result: "loss" },
				{ id: 3, myScore: 10, opponentScore: 2, opponentName: "also you", result: "win" },
			]);
			setLoading(false);
		};

		fetchData();
	}, [router]);

	if (loading) {
		return (
			<div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center text-white">
				<p className="text-xl font-medium tracking-widest">LOADING...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#0b0f1a] px-6 py-10">
			<Navbar />

			<div className="max-w-7xl mx-auto flex flex-col gap-16 mt-8">
				{/* TOP SECTION: Stats & History */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

					{/* PLAYER OVERVIEW */}
					<div className="rounded-2xl bg-white/5 border border-white/10 p-10 flex flex-col justify-center">
						<h2 className="text-white text-xl font-semibold mb-8">Player Overview</h2>
						<div className="flex items-center gap-8">
							<div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white/5">
								{user?.username[0]}
							</div>

							<div className="flex flex-col gap-3">
								<p className="text-white text-3xl font-bold">{user?.username}</p>
								<p className="text-blue-400 text-base">Level {user?.level}</p>
								<div className="w-64 h-3 rounded-full bg-white/10 mt-2">
									<div
										className="h-full bg-blue-600 transition-all"
										style={{ width: `${user?.xp}%` }}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* MATCH HISTORY */}
					<div className="rounded-2xl bg-white/5 border border-white/10 p-10">
						<h2 className="text-white text-xl font-semibold mb-8">Recent Match History</h2>
						<div className="flex flex-col gap-4">
							{matches.map((match) => (
								<div key={match.id} className="flex items-center justify-between bg-white/5 rounded-xl px-6 py-4 border border-white/5">
									<div className="flex items-center gap-4">
										<div className={`w-3 h-3 rounded-full ${match.result === 'win' ? 'bg-green-500' : 'bg-red-500'}`} />
										<span className="text-white text-lg font-medium">{match.myScore} - {match.opponentScore}</span>
									</div>
									<span className="text-gray-400">vs</span>
									<span className="text-gray-200 font-medium">{match.opponentName}</span>
								</div>
							))}
						</div>
					</div>

				</div>

				{/* GAME MODES SECTION */}
				<div className="mb-10">
					<h2 className="text-white text-xl font-semibold mb-8 text-center md:text-left">Select Game Mode</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{title: "Play with AI", icon: Bot },
							{title: "Play with Friend", icon: Users },
							{title: "Play Locally", icon: Monitor },
							{title: "Play a Stranger", icon: Globe }
						].map((mode) => (
							<button
								key={mode.title}
								className="h-64 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-white text-lg font-semibold hover:bg-blue-600/10 hover:border-blue-500/50 transition-all group"
							>
								{/* ICON CONTAINER */}
								<div className="w-16 h-16 mb-6 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
									<mode.icon size={32} strokeWidth={1.5} />
								</div>
								{mode.title}
							</button>
						))}
					</div>
				</div>

			</div>
		</div>
	);
}
