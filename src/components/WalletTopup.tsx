
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Wallet, CreditCard, Smartphone } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const WalletTopup = () => {
  const { user, profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [provider, setProvider] = useState<'mtn' | 'airtel'>('mtn');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTopup = async () => {
    if (!user || !amount || !phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const topupAmount = parseInt(amount);
    if (topupAmount < 1000) {
      toast({
        title: "Minimum Amount",
        description: "Minimum top-up amount is 1,000 RWF.",
        variant: "destructive",
      });
      return;
    }

    if (!phoneNumber.match(/^(\+250|0)?[0-9]{9}$/)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Rwandan phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment record
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          amount: topupAmount,
          phone_number: phoneNumber,
          provider: provider,
          payment_type: 'wallet_topup',
          status: 'pending'
        })
        .select()
        .single();

      if (paymentError) throw paymentError;

      // Simulate payment processing
      setTimeout(async () => {
        try {
          // Update payment status to completed
          await supabase
            .from('payments')
            .update({ 
              status: 'completed',
              transaction_id: `TXN${Date.now()}`
            })
            .eq('id', paymentData.id);

          // Create wallet transaction
          await supabase
            .from('wallet_transactions')
            .insert({
              user_id: user.id,
              type: 'deposit',
              amount: topupAmount,
              description: `Mobile Money deposit via ${provider.toUpperCase()}`,
              payment_id: paymentData.id
            });

          // Update user's wallet balance
          const newBalance = (profile?.wallet_balance || 0) + topupAmount;
          await updateProfile({ wallet_balance: newBalance });

          toast({
            title: "Top-up Successful!",
            description: `${topupAmount.toLocaleString()} RWF has been added to your wallet.`,
          });

          setIsOpen(false);
          setAmount('');
          setPhoneNumber('');
          setIsProcessing(false);
        } catch (error) {
          console.error('Error processing payment:', error);
          toast({
            title: "Payment Failed",
            description: "There was an error processing your payment. Please try again.",
            variant: "destructive",
          });
          setIsProcessing(false);
        }
      }, 3000); // Simulate 3 second processing time

    } catch (error) {
      console.error('Error creating payment:', error);
      toast({
        title: "Payment Failed",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-squid-green text-squid-green hover:bg-squid-green hover:text-squid-dark">
          <Wallet className="w-4 h-4 mr-2" />
          Add Money to Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="squid-card border-squid-gray max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <CreditCard className="w-6 h-6 text-squid-green mr-2" />
            Top Up Wallet
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Add money to your wallet using Mobile Money
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-white">Amount (RWF)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount (min 1,000)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-squid-darker border-squid-gray text-white placeholder:text-gray-400"
              min="1000"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Payment Provider</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={provider === 'mtn' ? 'default' : 'outline'}
                onClick={() => setProvider('mtn')}
                className={provider === 'mtn' ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'border-squid-gray text-white hover:bg-squid-gray'}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                MTN
              </Button>
              <Button
                type="button"
                variant={provider === 'airtel' ? 'default' : 'outline'}
                onClick={() => setProvider('airtel')}
                className={provider === 'airtel' ? 'bg-red-500 text-white hover:bg-red-600' : 'border-squid-gray text-white hover:bg-squid-gray'}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Airtel
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0781234567 or +250781234567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-squid-darker border-squid-gray text-white placeholder:text-gray-400"
            />
          </div>

          {isProcessing && (
            <Card className="bg-squid-darker border-squid-green">
              <CardContent className="p-4 text-center">
                <div className="animate-spin w-6 h-6 border-2 border-squid-green border-t-transparent rounded-full mx-auto mb-2"></div>
                <div className="text-white font-medium">Processing Payment...</div>
                <div className="text-sm text-gray-400">Please wait while we confirm your Mobile Money payment</div>
              </CardContent>
            </Card>
          )}

          <Button 
            onClick={handleTopup}
            disabled={isProcessing || !amount || !phoneNumber}
            className="w-full squid-button-green"
          >
            {isProcessing ? 'Processing...' : `Top Up ${amount ? parseInt(amount).toLocaleString() : '0'} RWF`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletTopup;
