"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, MessageCircle, BarChart2, Settings } from "lucide-react";

export default function Navbar()
{
	const pathname = usePathname();

	const navItems = [
		{icon: Home, path: "/"},
		{icon: Trophy, path: "/tournaments"},
		{icon: MessageCircle, path: "/chat"},
		{icon: BarChart2, path: "/leaderboard"},
		{icon: Settings, path: "/settings"},
	];

	return (
		<div className="w-full flex justify-center mb-10">
			<div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3">
				{
				navItems.map((item) =>
				{
					const Icon = item.icon;
					const isActive = pathname === item.path;

					return (
						<Link
							key={item.path}
							href={item.path}
							className={`
								p-3 rounded-full transition-all duration-300
								${isActive
									? "bg-blue-600/20 text-blue-400"
									: "text-gray-400 hover:bg-white/5 hover:text-gray-200"
								}
							`}
						>
							<Icon size={22} />
						</Link>
					);
				})}
			</div>
		</div>
	);
}
