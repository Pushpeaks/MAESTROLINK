import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { mernApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      if (params.get("from") === "hero") {
        nameInputRef.current?.focus();
      }
    } catch (err) {
      // ignore
    }
  }, [location.search]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res: any = await mernApi.register({ name, email, password, role: "user" });

      const token = res?.token || res?.accessToken || res?.authToken || (typeof res === "string" ? res : null);

      if (!token) {
        toast({ title: "Sign-up failed", description: "No token returned from server.", variant: "destructive" });
        setLoading(false);
        return;
      }

      localStorage.setItem("authToken", token);
      toast({ title: "Account created", description: "Welcome! You are signed in.", variant: "default" });
      navigate("/dashboard");
    } catch (err: any) {
      toast({ title: "Sign-up error", description: err?.message || "Failed to create account.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto my-16 p-6 rounded-lg bg-card/70 backdrop-blur-md border border-border">
      <h1 className="text-2xl font-semibold mb-2">Create account</h1>
      <p className="text-sm text-muted-foreground mb-4">Create your account to get personalized recommendations.</p>



      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block">
          <div className="text-sm mb-1">Full name</div>
          <Input ref={nameInputRef} value={name} onChange={(e) => setName(e.target.value)} type="text" required />
        </label>

        <label className="block">
          <div className="text-sm mb-1">Email</div>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>

        <label className="block">
          <div className="text-sm mb-1">Password</div>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </label>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Sign up"}
        </Button>
      </form>

      <div className="my-4 flex items-center gap-3">
        <span className="h-px bg-border flex-1" />
        <span className="text-muted-foreground text-sm">Or</span>
        <span className="h-px bg-border flex-1" />
      </div>

      <GoogleSignInButton />

      <p className="text-sm text-muted-foreground mt-4">
        Already have an account? <Link to="/signin" className="text-primary underline">Sign in</Link>
      </p>
    </div>
  );
}
