"use client";

export default function Home() {
	return (
		<div className="min-h-screen bg-[#0b0f1a] px-6 py-10">

			{/* MAIN CONTAINER */}
			<div className="max-w-7xl mx-auto flex flex-col gap-10">

				{/* TOP SECTION */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

					{/* PLAYER OVERVIEW CARD */}
					<div className="
						rounded-2xl
						bg-white/5 backdrop-blur-xl
						border border-white/10
						p-8
					">
						<h2 className="text-white text-xl font-semibold mb-6">
							Player Overview
						</h2>

						<div className="flex items-center gap-6">
							{/* Avatar placeholder */}
							<div className="w-24 h-24 rounded-full bg-white/10" />

							<div className="flex flex-col gap-2">
								<p className="text-white text-lg font-medium">
									Username
								</p>
								<p className="text-gray-400 text-sm">
									Level 1
								</p>

								{/* Progress bar */}
								<div className="w-48 h-2 rounded-full bg-white/10 overflow-hidden">
									<div className="h-full w-1/3 bg-blue-600" />
								</div>
							</div>
						</div>
					</div>

					{/* MATCH HISTORY CARD */}
					<div className="
						rounded-2xl
						bg-white/5 backdrop-blur-xl
						border border-white/10
						p-8
					">
						<h2 className="text-white text-xl font-semibold mb-6">
							Match History
						</h2>

						<div className="flex flex-col gap-4">
							{/* Match row */}
							<div className="flex items-center justify-between
								bg-white/5 rounded-xl px-4 py-3">
								<span className="text-white">6</span>
								<span className="text-gray-400">|</span>
								<span className="text-white">4</span>
								<span className="text-gray-300">Opponent</span>
							</div>

							<div className="flex items-center justify-between
								bg-white/5 rounded-xl px-4 py-3">
								<span className="text-white">6</span>
								<span className="text-gray-400">|</span>
								<span className="text-white">4</span>
								<span className="text-gray-300">Opponent</span>
							</div>

							<div className="flex items-center justify-between
								bg-white/5 rounded-xl px-4 py-3">
								<span className="text-white">6</span>
								<span className="text-gray-400">|</span>
								<span className="text-white">4</span>
								<span className="text-gray-300">Opponent</span>
							</div>
						</div>
					</div>

				</div>

				{/* GAME MODES SECTION */}
				<div>
					<h2 className="text-white text-xl font-semibold mb-6">
						Game Modes
					</h2>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{["Play with AI", "Play with Friend", "Play Locally", "Play a Stranger"].map((title) => (
							<div
								key={title}
								className="
									h-40
									rounded-2xl
									bg-white/5 backdrop-blur-xl
									border border-white/10
									flex items-center justify-center
									text-white font-medium
								"
							>
								{title}
							</div>
						))}
					</div>
				</div>

			</div>
		</div>
	);
}
