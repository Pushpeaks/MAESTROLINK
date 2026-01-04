import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { mernApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res: any = await mernApi.login({ email, password });

      const token = res?.token || res?.accessToken || res?.authToken || (typeof res === "string" ? res : null);

      if (!token) {
        toast({ title: "Sign-in failed", description: "No token returned from server.", variant: "destructive" });
        setLoading(false);
        return;
      }

      localStorage.setItem("authToken", token);
      toast({ title: "Signed in", description: "Welcome back!", variant: "default" });
      navigate("/dashboard");
    } catch (err: any) {
      toast({ title: "Sign-in error", description: err?.message || "Failed to sign in.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto my-16 p-6 rounded-lg bg-card/70 backdrop-blur-md border border-border">
      <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
      <p className="text-sm text-muted-foreground mb-4">Welcome back — sign in to continue.</p>



      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block">
          <div className="text-sm mb-1">Email</div>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>

        <label className="block">
          <div className="text-sm mb-1">Password</div>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </label>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="my-4 flex items-center gap-3">
        <span className="h-px bg-border flex-1" />
        <span className="text-muted-foreground text-sm">Or</span>
        <span className="h-px bg-border flex-1" />
      </div>

      <GoogleSignInButton />

      <p className="text-sm text-muted-foreground mt-4">
        New here? <Link to="/signup" className="text-primary underline">Create an account</Link>
      </p>
    </div>
  );
}
