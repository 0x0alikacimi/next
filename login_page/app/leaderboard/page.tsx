"use client";
import Navbar from "../components/navbar";
import { Crown, Trophy, Medal } from "lucide-react";

interface LeaderboardUser
{
	rank: number;
	username: string;
	level: number;
	xp: number;
	avatar?: string;
}

export default function Leaderboard()
{
	const users: LeaderboardUser[] = [
		{ rank: 1, username: "ana", level: 45, xp: 90 },
		{ rank: 2, username: "GhostRider", level: 42, xp: 75 },
		{ rank: 3, username: "CyberNinja", level: 40, xp: 60 },
		{ rank: 4, username: "PixelWarrior", level: 38, xp: 45 },
		{ rank: 5, username: "KingSlayer", level: 35, xp: 80 },
		{ rank: 6, username: "DriftKing", level: 32, xp: 30 },
		{ rank: 7, username: "NoobMaster", level: 28, xp: 20 },
	];

	const topThree = users.slice(0, 3);
	const restOfList = users.slice(3);

	return (
		<div className="min-h-screen bg-[#0b0f1a] px-6 py-10">
			<Navbar />

			<div className="max-w-4xl mx-auto flex flex-col gap-12 mt-4">

				{/* PAGE TITLE */}
				<div className="text-center space-y-2">
					<h1 className="text-3xl font-bold text-white tracking-wide">Global Leaderboard</h1>
					<p className="text-gray-400">Top players ranked by XP Level</p>
				</div>

				{/* --- PODIUM SECTION (TOP 3) --- */}
				<div className="flex justify-center items-end gap-4 sm:gap-8">

					{/* 2nd Place (Left) */}
					<div className="flex flex-col items-center gap-3">
						<div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-400 bg-gray-400/10 flex items-center justify-center text-gray-200 text-2xl font-bold relative">
							{topThree[1].username[0]}
							<div className="absolute -bottom-3 bg-gray-500 text-black text-xs font-bold px-2 py-1 rounded-full border border-white">
								#2
							</div>
						</div>
						<div className="text-center">
							<p className="text-gray-200 font-bold truncate max-w-[100px]">{topThree[1].username}</p>
							<p className="text-gray-400 text-sm">Lvl {topThree[1].level}</p>
						</div>
						{/* Podium Step */}
						<div className="w-20 sm:w-28 h-24 bg-gradient-to-t from-gray-800 to-gray-700/50 rounded-t-lg border-t border-gray-500/30" />
					</div>

					{/* 1st Place (Center - Biggest) */}
					<div className="flex flex-col items-center gap-3 z-10">
						<Crown className="text-yellow-400 fill-yellow-400/20 w-8 h-8 animate-bounce" />
						<div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-yellow-500 bg-yellow-500/10 flex items-center justify-center text-yellow-100 text-4xl font-bold relative shadow-[0_0_30px_rgba(234,179,8,0.3)]">
							{topThree[0].username[0]}
							<div className="absolute -bottom-4 bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-full border-2 border-[#0b0f1a]">
								#1
							</div>
						</div>
						<div className="text-center">
							<p className="text-yellow-400 font-bold text-lg truncate max-w-[120px]">{topThree[0].username}</p>
							<p className="text-yellow-500/80 text-sm font-medium">Lvl {topThree[0].level}</p>
						</div>
						{/* Podium Step */}
						<div className="w-24 sm:w-36 h-32 bg-gradient-to-t from-yellow-900/40 to-yellow-600/20 rounded-t-lg border-t border-yellow-500/30 backdrop-blur-sm" />
					</div>

					{/* 3rd Place (Right) */}
					<div className="flex flex-col items-center gap-3">
						<div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-orange-700 bg-orange-700/10 flex items-center justify-center text-orange-200 text-2xl font-bold relative">
							{topThree[2].username[0]}
							<div className="absolute -bottom-3 bg-orange-700 text-white text-xs font-bold px-2 py-1 rounded-full border border-white">
								#3
							</div>
						</div>
						<div className="text-center">
							<p className="text-orange-200 font-bold truncate max-w-[100px]">{topThree[2].username}</p>
							<p className="text-orange-400 text-sm">Lvl {topThree[2].level}</p>
						</div>
						{/* Podium Step */}
						<div className="w-20 sm:w-28 h-16 bg-gradient-to-t from-orange-900/40 to-orange-800/30 rounded-t-lg border-t border-orange-700/30" />
					</div>

				</div>

				{/* --- THE LIST (RANK 4+) --- */}
				<div className="flex flex-col gap-3 pb-10">
					{restOfList.map((player) => {
						const isMe = player.username === "Ana"; // Fake check for "My Row"
						return (
							<div
								key={player.rank}
								className={`
									flex items-center justify-between p-4 rounded-xl border transition-all
									${isMe
										? "bg-blue-600/20 border-blue-500/50" // Highlight for YOU
										: "bg-white/5 border-white/5 hover:bg-white/10"
									}
								`}
							>
								<div className="flex items-center gap-4">
									<span className={`font-bold w-6 text-center ${isMe ? "text-blue-300" : "text-gray-500"}`}>
										#{player.rank}
									</span>

									{/* Small Avatar */}
									<div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-gray-300">
										{player.username[0]}
									</div>

									<div className="flex flex-col">
										<span className={`font-medium ${isMe ? "text-white" : "text-gray-300"}`}>
											{player.username}
										</span>
										{isMe && <span className="text-[10px] text-blue-400 uppercase tracking-wider">You</span>}
									</div>
								</div>

								{/* Stats */}
								<div className="text-right">
									<span className="text-white font-bold block">{player.level}</span>
									<span className="text-xs text-gray-500 uppercase">Level</span>
								</div>
							</div>
						);
					})}
				</div>

			</div>
		</div>
	);
}
