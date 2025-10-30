import { Shield, Zap, Trophy, Wallet, Globe, Clock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Battles',
    description: 'Military-grade encryption protects every match and transaction',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Zap,
    title: 'Instant Payouts',
    description: 'Win and withdraw your earnings in seconds, not days',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: Trophy,
    title: 'Fair Matchmaking',
    description: 'Advanced algorithms ensure balanced and competitive matches',
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    icon: Wallet,
    title: 'Multi-Currency',
    description: 'Support for multiple payment methods and cryptocurrencies',
    gradient: 'from-emerald-500 to-green-500'
  },
  {
    icon: Globe,
    title: 'Global Arena',
    description: 'Compete with players from around the world 24/7',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    icon: Clock,
    title: 'Real-Time Play',
    description: 'Zero lag gameplay with our optimized server infrastructure',
    gradient: 'from-indigo-500 to-blue-500'
  }
];

export default function FeaturesSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="neon-text-cyan">Premium</span>{' '}
            <span className="neon-text-pink">Features</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience competitive gaming at its finest with cutting-edge technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="feature-card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`feature-icon-wrapper bg-gradient-to-br ${feature.gradient}`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
