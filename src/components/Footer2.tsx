import { Twitter, Youtube, MessageCircle, Instagram } from 'lucide-react';

export default function Footer() {
  const socials = [
    { icon: Twitter, label: 'Twitter' },
    { icon: Youtube, label: 'YouTube' },
    { icon: MessageCircle, label: 'Discord' },
    { icon: Instagram, label: 'Instagram' }
  ];

  return (
    <footer className="relative py-16 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-6">
            {socials.map((social, index) => {
              const Icon = social.icon;
              return (
                <button
                  key={index}
                  className="hologram-social-icon"
                  aria-label={social.label}
                >
                  <Icon className="w-6 h-6" />
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-gray-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Support</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">FAQ</a>
          </div>

          <p className="text-gray-500 text-sm">
            © 2025 BattleArena. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
