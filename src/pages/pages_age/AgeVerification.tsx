import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AgeVerification = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden py-12">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-[var(--gradient-gaming)] opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(195_100%_50%/0.1),transparent_50%)]" />
      
      {/* Animated particles effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-6 relative">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
              ARENA 1v1
            </h1>
            <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full -z-10" />
          </div>
          <p className="text-2xl text-foreground font-semibold mb-2">
            The Ultimate Competitive Gaming Platform
          </p>
          <p className="text-lg text-muted-foreground">
            Real Skills. Real Competition. Real Money.
          </p>
        </div>

        {/* Main Article Content */}
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          
          {/* Platform Features */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span className="text-primary">🎮</span>
              What is Arena 1v1?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Arena 1v1 is a revolutionary competitive gaming platform that combines the thrill of head-to-head 
              competition with real monetary rewards. We provide a secure, fair, and exciting environment where 
              gamers can showcase their skills, compete against players worldwide, and earn real money doing what 
              they love.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-secondary/50 p-6 rounded-xl border border-border hover:border-primary/50 transition-all">
                <div className="text-4xl mb-4">⚔️</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Competitive 1v1 Matches</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Face off against skilled opponents in intense head-to-head battles. Our advanced matchmaking 
                  system ensures fair competition by pairing you with players of similar skill levels. Every match 
                  counts toward your ranking and reputation.
                </p>
              </div>
              <div className="bg-secondary/50 p-6 rounded-xl border border-border hover:border-primary/50 transition-all">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Earn Real Money</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Transform your gaming prowess into tangible earnings. Win matches, complete challenges, and climb 
                  the leaderboards to unlock monetary rewards. Fast, secure withdrawals mean your winnings are 
                  always accessible.
                </p>
              </div>
              <div className="bg-secondary/50 p-6 rounded-xl border border-border hover:border-primary/50 transition-all">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-foreground mb-3">Global Leaderboards</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Compete with the elite players from around the world. Track your progress, analyze your 
                  performance, and establish yourself as a champion. Top performers earn exclusive rewards and 
                  recognition.
                </p>
              </div>
            </div>
          </section>

          {/* Age Verification Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span className="text-destructive">⚠️</span>
              Age Verification Requirement
            </h2>
            
            <div className="bg-destructive/10 border-2 border-destructive/30 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-destructive"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-destructive mb-3">18+ Platform - Mandatory Age Verification</h3>
                  <p className="text-base text-destructive/90 leading-relaxed mb-4">
                    Arena 1v1 is a real money gaming platform exclusively available to individuals aged 18 and older. 
                    This is not merely a recommendation—it is a strict legal requirement that we enforce rigorously 
                    through our age verification system.
                  </p>
                  <p className="text-base text-destructive/90 leading-relaxed">
                    By proceeding to use this platform, you are confirming under penalty of law that you meet the 
                    minimum age requirement and that all information you provide is accurate and truthful.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Why We Require Age Verification
                </h3>
                <div className="bg-secondary/30 border border-border rounded-xl p-6">
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-xl">1.</span>
                      <div>
                        <span className="font-semibold text-foreground">Legal Compliance:</span>
                        <p className="mt-1">Real money gaming is heavily regulated across multiple jurisdictions worldwide. 
                        Age verification is mandated by law in virtually all regions where such platforms operate. We must 
                        comply with federal, state, and international regulations to maintain our operating licenses.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-xl">2.</span>
                      <div>
                        <span className="font-semibold text-foreground">Protection of Minors:</span>
                        <p className="mt-1">Our primary responsibility is to prevent underage individuals from accessing 
                        real money gaming services. Minors lack the legal capacity to enter into binding financial agreements 
                        and may be more vulnerable to developing problematic gaming behaviors.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-xl">3.</span>
                      <div>
                        <span className="font-semibold text-foreground">Responsible Gaming Environment:</span>
                        <p className="mt-1">By restricting access to adults, we create a more mature, responsible community. 
                        Adult users are better equipped to make informed decisions about their participation, spending, and 
                        gaming habits.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-xl">4.</span>
                      <div>
                        <span className="font-semibold text-foreground">Platform Integrity and Trust:</span>
                        <p className="mt-1">Rigorous age verification helps maintain the credibility and trustworthiness of 
                        our platform within the gaming community and with regulatory authorities. It demonstrates our commitment 
                        to operating ethically and transparently.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-xl">5.</span>
                      <div>
                        <span className="font-semibold text-foreground">Financial Security:</span>
                        <p className="mt-1">Age verification is a crucial component of our anti-fraud and anti-money laundering 
                        measures. It helps ensure that all financial transactions are conducted by verified, legally competent adults.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Our Verification Process
                </h3>
                <div className="bg-secondary/30 border border-border rounded-xl p-6">
                  <p className="text-muted-foreground mb-4">
                    Our age verification system is designed to be both secure and user-friendly:
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>You will be asked to provide your date of birth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Our system automatically calculates your age to verify you meet the 18+ requirement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>All information is encrypted and stored securely in compliance with data protection regulations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Additional verification may be required for account security and regulatory compliance</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Privacy and Data Security
                </h3>
                <div className="bg-secondary/30 border border-border rounded-xl p-6">
                  <p className="text-muted-foreground mb-4">
                    We take the privacy and security of your personal information extremely seriously:
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>All personal data is encrypted using industry-standard protocols</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Your information is used solely for age verification and account management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>We never share your personal data with third parties without your explicit consent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>You have the right to access, modify, or delete your personal information at any time</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Responsible Gaming */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span className="text-primary">🛡️</span>
              Our Commitment to Responsible Gaming
            </h2>
            <div className="bg-secondary/30 border border-border rounded-xl p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Age verification is just one component of our comprehensive responsible gaming framework. We are 
                committed to promoting healthy gaming habits and providing resources to help users maintain control:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Deposit limits and spending controls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Time-out and self-exclusion options</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Access to professional support resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Regular account activity monitoring and alerts</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/20 via-purple-400/20 to-primary/20 border border-primary/30 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Join the Arena?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If you are 18 years of age or older and ready to compete for real money, 
            proceed to our age verification form to get started.
          </p>
          <Button
            onClick={() => navigate("/verify")}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-[var(--glow-primary)]"
          >
            Proceed to Age Verification
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            By clicking this button, you acknowledge that you are 18+ years old
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;
