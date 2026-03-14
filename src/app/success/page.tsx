
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { store } from "@/app/lib/store";
import { generatePersonalizedMantraGreeting } from "@/ai/flows/generate-personalized-mantra-greeting";
import { CheckCircle2, Download, Share2, Sparkles, QrCode, Home } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [registrant, setRegistrant] = useState(id ? store.getById(id) : null);
  const [loadingGreeting, setLoadingGreeting] = useState(true);

  useEffect(() => {
    async function fetchGreeting() {
      if (registrant && !registrant.sanskritMantra && id) {
        try {
          const result = await generatePersonalizedMantraGreeting({
            name: registrant.name,
            category: registrant.category,
          });
          const updated = {
            ...registrant,
            sanskritMantra: result.sanskritMantra,
            personalizedGreeting: result.personalizedGreeting,
          };
          store.save(updated);
          setRegistrant(updated);
        } catch (error) {
          console.error("AI Greeting failed", error);
        }
      }
      setLoadingGreeting(false);
    }
    fetchGreeting();
  }, [registrant, id]);

  const handleDownload = () => {
    if (!registrant) return;
    
    const passContent = `
--- HINDU SAKTI 2024 DELEGATE PASS ---
Delegate ID: ${registrant.id}
Name: ${registrant.name}
Category: ${registrant.category}
Phone: ${registrant.phone}
Registration Date: ${new Date(registrant.registrationDate).toLocaleDateString()}
Status: ${registrant.status}

SACRED SANSKRIT MANTRA:
"${registrant.sanskritMantra || 'Pending Divine Blessing'}"

PERSONALIZED BLESSING:
${registrant.personalizedGreeting || 'A spiritual greeting from Lord Krishna is being prepared for you.'}

--- PLEASE PRESENT THIS PASS AT THE ENTRANCE GATE ---
    `;

    const blob = new Blob([passContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HinduSakti_Pass_${registrant.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!registrant) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background pb-12">
      <Navbar />
      <main className="max-w-4xl mx-auto w-full px-4 pt-12">
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-2">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold font-headline text-foreground">Registration Successful!</h1>
          <p className="text-muted-foreground text-lg">Your spiritual journey begins here, {registrant.name}.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Digital Pass */}
          <Card className="border-none shadow-2xl overflow-hidden bg-white/95 backdrop-blur-md flex flex-col">
            <div className="bg-primary p-6 text-white text-center">
              <h3 className="text-2xl font-bold font-headline">HINDU SAKTI 2024</h3>
              <p className="text-white/80 text-sm">Official Delegate Pass</p>
            </div>
            <CardContent className="flex-grow p-8 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-40 h-40 bg-muted rounded-2xl flex items-center justify-center border-4 border-dashed border-primary/20 relative">
                <QrCode className="w-24 h-24 text-foreground/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold rotate-12 shadow-lg">
                    {registrant.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Delegate ID</p>
                <p className="text-2xl font-mono font-bold text-foreground">{registrant.id}</p>
              </div>
              <div className="grid grid-cols-2 w-full gap-4 text-left border-t pt-6">
                <div className="col-span-1">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase">Name</p>
                  <p className="text-xs font-bold truncate">{registrant.name}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase">Tier</p>
                  <p className="text-xs font-bold">{registrant.category}</p>
                </div>
                <div className="col-span-2 mt-2">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase">Phone</p>
                  <p className="text-xs font-bold">{registrant.phone}</p>
                </div>
              </div>
            </CardContent>
            <div className="p-4 bg-muted/30 text-center text-[10px] text-muted-foreground font-medium border-t">
              VALID FOR ALL SESSIONS • NON-TRANSFERABLE
            </div>
          </Card>

          {/* AI Greeting */}
          <div className="space-y-6">
            <Card className="border-none shadow-xl bg-accent text-white relative overflow-hidden min-h-[300px]">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Sparkles className="w-20 h-20" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                  Spiritual Blessing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {loadingGreeting ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <p className="text-white/60 text-sm animate-pulse">Invoking Lord Krishna's Blessings...</p>
                  </div>
                ) : (
                  <>
                    <div className="p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm text-center">
                      <p className="text-2xl font-headline font-bold mb-2 text-white italic">
                        "{registrant.sanskritMantra}"
                      </p>
                      <span className="text-xs font-bold uppercase tracking-widest text-white/60">— Sacred Sanskrit Mantra</span>
                    </div>
                    <p className="text-lg leading-relaxed font-light text-white/90">
                      {registrant.personalizedGreeting}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button 
                className="flex-1 h-12 rounded-xl" 
                variant="secondary"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" /> Download Pass
              </Button>
              <Button className="flex-1 h-12 rounded-xl" variant="secondary">
                <Share2 className="w-4 h-4 mr-2" /> Share Joy
              </Button>
            </div>
            
            <Button asChild variant="ghost" className="w-full text-muted-foreground hover:text-primary">
              <Link href="/"><Home className="w-4 h-4 mr-2" /> Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Finalizing your spiritual pass...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
