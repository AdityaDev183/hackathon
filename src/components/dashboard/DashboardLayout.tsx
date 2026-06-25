"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Wand2, Image as ImageIcon, Video, Settings, LogOut, Zap, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (!user) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading Copilot...</div>;

  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, label: "Overview", href: "/dashboard" },
    { icon: <Wand2 size={20} />, label: "Text Generator", href: "/dashboard/generate" },
    { icon: <ImageIcon size={20} />, label: "Image Studio", href: "/dashboard/images" },
    { icon: <Video size={20} />, label: "Video Lab", href: "/dashboard/video" },
    { icon: <BarChart3 size={20} />, label: "Analysis AI", href: "/dashboard/analysis" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0B0B0F] hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-ai-purple to-ai-blue rounded-lg flex items-center justify-center font-bold text-white shadow-lg glow-purple">
              C
            </div>
            <span className="font-bold tracking-tight text-white">Creator Copilot</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
            >
              <span className="group-hover:text-ai-purple transition-colors">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4">
          {userData?.plan === "free" && (
            <div className="bg-gradient-to-br from-ai-purple/20 to-ai-blue/20 rounded-2xl p-4 border border-ai-purple/20 mb-4">
              <div className="flex items-center space-x-2 text-ai-purple mb-2">
                <Zap size={16} fill="currentColor" />
                <span className="text-xs font-bold uppercase">Pro Feature</span>
              </div>
              <p className="text-xs text-gray-400 mb-3">Upgrade for 10x more requests and 4K output.</p>
              <Button size="sm" className="w-full btn-energy-red h-8 text-xs font-bold rounded-lg">
                Upgrade Now
              </Button>
            </div>
          )}

          <Separator className="bg-white/5 mb-4" />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8 border border-white/10">
                <AvatarImage src={user.photoURL} />
                <AvatarFallback className="bg-ai-purple text-[10px]">USER</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user.email}</p>
                <p className="text-[10px] text-gray-500 uppercase">{userData?.plan || "Free"} Account</p>
              </div>
            </div>
            <button onClick={handleLogout} className="text-gray-500 hover:text-energy-red transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-background/50 backdrop-blur-md">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-gray-500 font-bold uppercase">Daily Usage</p>
              <p className="text-xs text-white font-mono">{userData?.requestsUsed || 0} / {userData?.plan === 'pro' ? 100 : 10}</p>
            </div>
            <Button variant="outline" size="icon" className="rounded-full border-white/10 w-8 h-8">
              <Settings size={16} className="text-gray-400" />
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
