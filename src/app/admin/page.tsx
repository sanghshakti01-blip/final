
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { store } from "@/app/lib/store";
import { Registrant } from "@/app/lib/types";
import { ShieldCheck, Search, CheckCircle2, IndianRupee, Users, TrendingUp, Lock, Phone, Mail, Download } from "lucide-react";

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [registrants, setRegistrants] = useState<Registrant[]>([]);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({ totalRegistrants: 0, paidRegistrants: 0, totalRevenue: 0 });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "8888") {
      setIsAuthorized(true);
      loadData();
    } else {
      alert("Invalid Passcode");
    }
  };

  const loadData = () => {
    setRegistrants(store.getAll());
    setStats(store.getStats());
  };

  const handleVerify = (id: string) => {
    store.updateStatus(id, "Paid");
    loadData();
  };

  const handleExportCSV = () => {
    if (registrants.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = ["ID", "Name", "Email", "Phone", "Category", "Status", "Amount", "Registration Date"];
    const rows = registrants.map(r => [
      r.id,
      `"${r.name}"`,
      r.email,
      r.phone,
      r.category,
      r.status,
      r.amount,
      new Date(r.registrationDate).toLocaleDateString()
    ]);
    
    const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `HinduSakti_Registry_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = registrants.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.id.toLowerCase().includes(search.toLowerCase()) ||
    r.phone.includes(search)
  );

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md border-none shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-headline">Command Center Access</CardTitle>
            <CardDescription>Enter secure administrator passcode</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input 
                type="password" 
                placeholder="Passcode" 
                value={passcode} 
                onChange={(e) => setPasscode(e.target.value)}
                className="text-center text-2xl tracking-[1em] h-14"
                maxLength={4}
                autoFocus
              />
              <Button type="submit" className="w-full h-12 text-lg font-bold">Access Dashboard</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto w-full px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-headline text-foreground flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-primary" /> Admin Command Center
            </h1>
            <p className="text-muted-foreground">Real-time registry and financial tracker for Hindu Sakti 2024</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={handleExportCSV}
              className="hidden sm:flex items-center gap-2 rounded-full border-primary/20 text-primary hover:bg-primary/5"
            >
              <Download className="w-4 h-4" /> Export CSV
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search name, phone or ID..." 
                className="pl-10 w-72 h-10 rounded-full bg-white border-primary/10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-lg bg-white overflow-hidden">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase">Total Registry</p>
                <p className="text-3xl font-bold">{stats.totalRegistrants}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg bg-white overflow-hidden">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase">Verified Delegates</p>
                <p className="text-3xl font-bold">{stats.paidRegistrants}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg bg-white overflow-hidden">
            <CardContent className="p-6 flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase">Total Revenue</p>
                <p className="text-3xl font-bold">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registry Table */}
        <Card className="border-none shadow-2xl overflow-hidden bg-white">
          <CardHeader className="border-b bg-muted/30 flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold font-headline">Attendee Registry</CardTitle>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={handleExportCSV}
              className="sm:hidden text-primary"
            >
              <Download className="w-4 h-4" />
            </Button>
          </CardHeader>
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-bold">Delegate ID</TableHead>
                <TableHead className="font-bold">Contact Info</TableHead>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold text-right">Fee</TableHead>
                <TableHead className="font-bold text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono font-medium">{r.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">{r.name}</span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="w-3 h-3" /> {r.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" /> {r.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-secondary/20">{r.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      r.status === 'Paid' ? 'bg-green-500 hover:bg-green-600' :
                      r.status === 'Under Process' ? 'bg-yellow-500 text-black hover:bg-yellow-600' :
                      'bg-red-400 hover:bg-red-500'
                    }>
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-bold">₹{r.amount}</TableCell>
                  <TableCell className="text-center">
                    {r.status !== 'Paid' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleVerify(r.id)}
                        className="bg-primary hover:bg-primary/90 rounded-full h-8"
                      >
                        Verify & Pay
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    No attendees found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
}
