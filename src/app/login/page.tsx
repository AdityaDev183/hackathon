import AuthForm from "@/components/auth/AuthForm";
import Navbar from "@/components/layout/Navbar";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center pt-20 px-4">
      <Navbar />
      <AuthForm mode="login" />
    </main>
  );
}
