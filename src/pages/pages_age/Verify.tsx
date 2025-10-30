import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const ageVerificationSchema = z.object({
  day: z.string()
    .min(1, "Day is required")
    .refine((val) => {
      const num = parseInt(val);
      return num >= 1 && num <= 31;
    }, "Enter a valid day (1-31)"),
  month: z.string()
    .min(1, "Month is required")
    .refine((val) => {
      const num = parseInt(val);
      return num >= 1 && num <= 12;
    }, "Enter a valid month (1-12)"),
  year: z.string()
    .min(4, "Year is required")
    .refine((val) => {
      const num = parseInt(val);
      const currentYear = new Date().getFullYear();
      return num >= 1900 && num <= currentYear;
    }, "Enter a valid year"),
});

const Verify = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // If already verified, redirect to platform
    const ageVerified = localStorage.getItem("ageVerified");
    if (ageVerified) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const calculateAge = (birthDay: number, birthMonth: number, birthYear: number): number => {
    const today = new Date();
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleVerify = () => {
    try {
      setIsVerifying(true);

      // Validate input
      const result = ageVerificationSchema.safeParse({ day, month, year });
      
      if (!result.success) {
        const firstError = result.error.errors[0];
        toast({
          variant: "destructive",
          title: "Invalid input",
          description: firstError.message,
        });
        setIsVerifying(false);
        return;
      }

      const birthDay = parseInt(day);
      const birthMonth = parseInt(month);
      const birthYear = parseInt(year);

      // Validate date exists
      const testDate = new Date(birthYear, birthMonth - 1, birthDay);
      if (
        testDate.getDate() !== birthDay ||
        testDate.getMonth() !== birthMonth - 1 ||
        testDate.getFullYear() !== birthYear
      ) {
        toast({
          variant: "destructive",
          title: "Invalid date",
          description: "Please enter a valid date of birth",
        });
        setIsVerifying(false);
        return;
      }

      const age = calculateAge(birthDay, birthMonth, birthYear);

      if (age < 18) {
        toast({
          variant: "destructive",
          title: "Age Requirement Not Met",
          description: "You must be 18 or older to access this platform.",
        });
        setIsVerifying(false);
        return;
      }

      // Store verification in localStorage
      localStorage.setItem("ageVerified", "true");
      
      toast({
        title: "Verification Successful",
        description: "Welcome to the platform!",
      });

      // Navigate to main platform
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "An error occurred. Please try again.",
      });
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
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

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4 relative">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent animate-pulse">
                ARENA 1v1
              </h1>
              <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full -z-10" />
            </div>
            <p className="text-muted-foreground text-sm">
              Compete. Earn. Win.
            </p>
          </div>

          {/* Form Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Verify Your Age
            </h2>
            <p className="text-sm text-muted-foreground">
              Enter your date of birth to continue
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="dob" className="text-foreground mb-3 block text-center font-medium">
                Date of Birth
              </Label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Input
                    id="day"
                    type="number"
                    placeholder="DD"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="text-center bg-secondary border-border focus:border-primary focus:ring-primary transition-all"
                    min="1"
                    max="31"
                  />
                </div>
                <div>
                  <Input
                    id="month"
                    type="number"
                    placeholder="MM"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="text-center bg-secondary border-border focus:border-primary focus:ring-primary transition-all"
                    min="1"
                    max="12"
                  />
                </div>
                <div>
                  <Input
                    id="year"
                    type="number"
                    placeholder="YYYY"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="text-center bg-secondary border-border focus:border-primary focus:ring-primary transition-all"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-[var(--glow-primary)]"
            >
              {isVerifying ? "Verifying..." : "Enter Platform"}
            </Button>

            <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
              <p>By continuing, you confirm that you are 18 years or older</p>
              <p className="mt-1">and agree to our Terms of Service and Privacy Policy</p>
            </div>

            <Button
              onClick={() => navigate("/AgeVerification")}
              variant="outline"
              className="w-full border-border hover:bg-secondary"
            >
              Back to Information
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
