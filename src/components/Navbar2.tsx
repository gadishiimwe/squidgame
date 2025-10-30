import { Gamepad2 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="glassmorphism rounded-2xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Gamepad2 className="w-8 h-8 text-cyan-400" />
              <div className="absolute inset-0 blur-xl bg-cyan-400/50 animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              SurvX
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="nav-button text-gray-300 hover:text-white transition-colors">
              Play Now
            </button>
            <button className="nav-button text-gray-300 hover:text-white transition-colors">
              Deposit
            </button>
            <button className="nav-button text-gray-300 hover:text-white transition-colors">
              Leaderboard
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
