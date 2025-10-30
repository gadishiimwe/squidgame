import { TrendingUp, Users, Zap, DollarSign } from 'lucide-react';
import { useEffect, useRef } from 'react';

const stats = [
  { icon: Users, label: 'Active Players', value: '50K+', color: 'cyan' },
  { icon: DollarSign, label: 'Paid Out', value: '$2M+', color: 'pink' },
  { icon: Zap, label: 'Matches Daily', value: '100K+', color: 'violet' },
  { icon: TrendingUp, label: 'Win Rate', value: '97%', color: 'emerald' }
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.stat-card');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="stat-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`stat-icon stat-icon-${stat.color} mb-4`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
