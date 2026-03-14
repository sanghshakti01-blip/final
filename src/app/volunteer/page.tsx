"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { store } from "@/app/lib/store";
import { Registrant } from "@/app/lib/types";
import { ScanLine, UserCheck, XCircle, Search, Sparkles, User, Phone } from "lucide-react";

export default function VolunteerPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ status: 'verified' | 'denied' | 'none', data?: Registrant }>({ status: 'none' });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    const all = store.getAll();
    const found = all.find(r => 
      r.id.toUpperCase() === query.toUpperCase() || 
      r.phone === query
    );

    if (found && found.status === 'Paid') {
      setResult({ status: 'verified', data: found });
    } else {
      setResult({ status: 'denied', data: found });
    }
  };

  const reset = () => {
    setQuery("");
    setResult({ status: 'none' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto w-full px-4 py-12">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex p-3 bg-primary/10 rounded-2xl mb-2">
            <ScanLine className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold font-headline">Gate Verification Portal</h1>
          <p className="text-muted-foreground">Scan QR, enter Unique ID, or Phone Number for instant gate access</p>
        </div>

        <div className="space-y-8">
          {/* Search Card */}
          <Card className="border-none shadow-xl bg-white overflow-hidden">
            <CardContent className="p-8">
              <form onSubmit={handleVerify} className="flex gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Delegate ID or Phone Number..."
                    className="pl-12 h-14 text-xl font-mono uppercase tracking-widest border-2 focus:border-primary rounded-2xl"
                  />
                </div>
                <Button type="submit" className="h-14 px-8 text-lg font-bold rounded-2xl">Verify</Button>
              </form>
            </CardContent>
          </Card>

          {/* Result Area */}
          {result.status !== 'none' && (
            <div className={`animate-in zoom-in-95 duration-300 rounded-3xl p-1 shadow-2xl ${
              result.status === 'verified' ? 'bg-green-500' : 'bg-red-500'
            }`}>
              <div className="bg-white rounded-[1.4rem] p-8 md:p-12 text-center">
                <div className="flex flex-col items-center gap-6">
                  {result.status === 'verified' ? (
                    <>
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                        <UserCheck className="w-14 h-14 text-green-600" />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-5xl font-black text-green-600 tracking-tighter uppercase">ENTRY GRANTED</h2>
                        <p className="text-muted-foreground text-xl font-medium">Welcome to Hindu Sakti 2024</p>
                      </div>
                      {result.data && (
                        <div className="w-full max-w-md bg-muted/30 p-6 rounded-2xl border flex items-center gap-6 text-left">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-green-500">
                             <User className="w-8 h-8 text-green-600" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{result.data.name}</p>
                            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{result.data.category} Delegate</p>
                            <p className="text-xs flex items-center gap-1 text-muted-foreground mt-1">
                              <Phone className="w-3 h-3" /> {result.data.phone}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                        <XCircle className="w-14 h-14 text-red-600" />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-5xl font-black text-red-600 tracking-tighter uppercase">ACCESS DENIED</h2>
                        <p className="text-muted-foreground text-xl font-medium">
                          {result.data ? `Pass Status: ${result.data.status}` : 'Delegate Not Found'}
                        </p>
                      </div>
                      <div className="w-full max-w-md p-6 bg-red-50 rounded-2xl border border-red-200 text-left text-red-800">
                        <p className="font-bold flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4" /> Instructions for Volunteer:
                        </p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>Direct attendee to Registration Help Desk</li>
                          <li>Ensure payment is verified in Admin Dashboard</li>
                          <li>Check for valid ID proof</li>
                        </ul>
                      </div>
                    </>
                  )}
                  
                  <Button 
                    onClick={reset}
                    variant="outline" 
                    className="mt-4 h-12 px-10 rounded-full border-2"
                  >
                    Next Verification
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
