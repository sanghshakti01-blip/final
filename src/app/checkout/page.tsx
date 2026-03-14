
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { store } from "@/app/lib/store";
import { QrCode, Timer, ShieldCheck, CreditCard, RefreshCw } from "lucide-react";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [timeLeft, setTimeLeft] = useState(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [registrant, setRegistrant] = useState(id ? store.getById(id) : null);

  useEffect(() => {
    if (!registrant) {
      router.push("/register");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Payment session expired. Please try again.");
          router.push("/register");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [registrant, router]);

  const handlePayment = async () => {
    if (!id) return;
    setIsProcessing(true);
    // Simulate bank verification delay
    await new Promise(r => setTimeout(r, 2000));
    
    store.updateStatus(id, "Under Process");
    router.push(`/success?id=${id}`);
  };

  if (!registrant) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4 py-12">
        <Card className="w-full max-w-lg border-none shadow-2xl overflow-hidden">
          <div className="bg-primary p-6 text-white text-center">
            <h2 className="text-xl font-bold flex items-center justify-center gap-2">
              <ShieldCheck className="w-6 h-6" /> SecurePay Gateway
            </h2>
            <p className="text-white/80 text-sm mt-1">SewaConnect Official Payment Terminal</p>
          </div>

          <CardContent className="p-8 space-y-8">
            <div className="flex items-center justify-between text-muted-foreground text-sm font-bold uppercase tracking-widest">
              <span>Time Remaining</span>
              <span className="flex items-center gap-2 text-primary">
                <Timer className="w-4 h-4" /> {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <Progress value={(timeLeft / 90) * 100} className="h-2" />

            <div className="flex flex-col items-center gap-6">
              <div className="p-6 bg-white border-4 border-muted rounded-3xl shadow-inner relative group">
                {/* Simulated QR Code */}
                <div className="w-48 h-48 bg-foreground rounded-xl flex items-center justify-center relative overflow-hidden">
                  <QrCode className="w-40 h-40 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border shadow-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Live UPI QR</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Scan using any UPI App</p>
                <div className="flex items-center justify-center gap-4 grayscale opacity-60">
                  {/* Mock Payment Logo placeholders */}
                  <span className="text-xs font-bold px-2 py-1 border rounded italic">GPay</span>
                  <span className="text-xs font-bold px-2 py-1 border rounded italic">PhonePe</span>
                  <span className="text-xs font-bold px-2 py-1 border rounded italic">Paytm</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-2xl border border-dashed border-primary/30 flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase">Payable Amount</p>
                <p className="text-2xl font-bold text-foreground">₹{registrant.amount}.00</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground font-bold uppercase">Reference</p>
                <p className="text-sm font-mono font-medium">{registrant.id}</p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-8 pt-0 flex flex-col gap-4">
            <Button 
              onClick={handlePayment} 
              disabled={isProcessing}
              className="w-full h-14 text-lg font-bold rounded-full relative overflow-hidden"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> Verifying with Bank...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" /> Simulate Success Payment
                </>
              )}
            </Button>
            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-tighter">
              DO NOT CLOSE OR REFRESH THIS WINDOW DURING THE TRANSACTION
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Secure Gateway...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
