
import Link from 'next/link';
import { Flower2, ShieldCheck, UserCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Flower2 className="text-primary w-8 h-8" />
              <span className="font-headline text-2xl font-bold text-primary tracking-tight">SewaConnect</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/register" className="hover:text-primary transition-colors">Register</Link>
            <Link href="/volunteer" className="flex items-center gap-1 hover:text-primary transition-colors">
              <UserCheck className="w-4 h-4" /> Volunteer
            </Link>
            <Link href="/admin" className="flex items-center gap-1 hover:text-primary transition-colors">
              <ShieldCheck className="w-4 h-4" /> Admin
            </Link>
          </div>
          <div className="md:hidden">
            <Link href="/register" className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/20">
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
