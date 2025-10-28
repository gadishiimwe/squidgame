
import { Circle, Square, Triangle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-squid-darker border-t border-squid-gray py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Circle className="w-6 h-6 text-squid-red" />
              <Triangle className="w-6 h-6 text-squid-green" />
              <Square className="w-6 h-6 text-white" />
              <span className="text-xl font-bold">The Challenge Arena</span>
            </div>
            <p className="text-gray-400 text-sm">
              Rwanda's premier skill-based competition platform. Test your abilities, win real prizes.
            </p>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-squid-red rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">MTN</span>
              </div>
              <div className="w-8 h-8 bg-squid-green rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-squid-dark">AIR</span>
              </div>
            </div>
          </div>

          {/* Game Info */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Game Modes</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#">Solo Challenges</a></li>
              <li><a href="#">Team Battles</a></li>
              <li><a href="#">Tournament Mode</a></li>
              <li><a href="#">Practice Arena</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#">How to Play</a></li>
              <li><a href="#">Payment Help</a></li>
              <li><a href="#">Account Issues</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://fancy-coming-soon.vercel.app/">Terms of Service</a></li>
              <li><a href="https://fancy-coming-soon.vercel.app/">Privacy Policy</a></li>
              <li><a href="https://fancy-coming-soon.vercel.app/">Fair Play Rules</a></li>
              <li><a href="https://fancy-coming-soon.vercel.app/">Age Verification</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-squid-gray mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div>
            © 2024 The Challenge Arena. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-squid-green rounded-full mr-2 animate-pulse"></div>
              System Online
            </span>
            <span>Ages 18+ Only</span>
            <span>Play Responsibly</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
