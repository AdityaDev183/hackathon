"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";

interface AuthFormProps {
  mode: "login" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Initialize user in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          plan: "free",
          requestsUsed: 0,
          tokensUsed: 0,
          createdAt: new Date().toISOString(),
        });

        toast.success("Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome back!");
      }

      // Set session cookie for middleware
      document.cookie = `session=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md p-8 glass-card rounded-3xl"
    >
      <h2 className="text-3xl font-bold text-white mb-2 text-center">
        {mode === "login" ? "Welcome Back" : "Create Account"}
      </h2>
      <p className="text-gray-400 text-center mb-8">
        {mode === "login" ? "Enter your credentials to access your copilot" : "Start building your content empire today"}
      </p>

      <form onSubmit={handleAuth} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/5 border-white/10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/5 border-white/10"
          />
        </div>

        <Button
          type="submit"
          className="w-full btn-energy-red h-12 text-lg font-bold"
          disabled={loading}
        >
          {loading ? "Processing..." : mode === "login" ? "Sign In" : "Sign Up"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-500 text-sm">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            href={mode === "login" ? "/signup" : "/login"}
            className="text-ai-purple font-bold hover:underline"
          >
            {mode === "login" ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
