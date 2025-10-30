import { Gamepad2, Swords, Trophy } from 'lucide-react';

const steps = [
  {
    icon: Gamepad2,
    title: 'Choose Game',
    description: 'Select from our collection of competitive 1v1 games',
    color: 'cyan'
  },
  {
    icon: Swords,
    title: 'Play Match',
    description: 'Battle against skilled opponents in real-time',
    color: 'pink'
  },
  {
    icon: Trophy,
    title: 'Win Cash',
    description: 'Earn real money prizes instantly to your wallet',
    color: 'violet'
  }
];

export default function HowItWorks() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-20">
          <span className="neon-text-cyan">How It</span>{' '}
          <span className="neon-text-pink">Works</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="game-card group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`icon-container icon-${step.color} mb-6`}>
                  <Icon className="w-12 h-12" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white">
                  {step.title}
                </h3>

                <p className="text-gray-400 text-lg">
                  {step.description}
                </p>

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-pink-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
