import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { mernApi } from "@/lib/api";
import { useNavigate } from "react-router-dom";

export default function SignUpModal({ open, onOpenChange, prefill }: { open: boolean; onOpenChange: (open: boolean) => void; prefill?: { name?: string; email?: string } }) {
  const [name, setName] = useState(prefill?.name || "");
  const [email, setEmail] = useState(prefill?.email || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (open) {
      // focus name when dialog opens
      setTimeout(() => nameRef.current?.focus(), 50);
    }
  }, [open]);

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
      onOpenChange(false);
      navigate("/dashboard");
    } catch (err: any) {
      toast({ title: "Sign-up error", description: err?.message || "Failed to create account.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your account</DialogTitle>
          <DialogDescription>Get started with a free account and access personalized musician recommendations.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <label className="block">
            <div className="text-sm mb-1">Full name</div>
            <Input ref={nameRef} value={name} onChange={(e) => setName(e.target.value)} type="text" required />
          </label>

          <label className="block">
            <div className="text-sm mb-1">Email</div>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </label>

          <label className="block">
            <div className="text-sm mb-1">Password</div>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          </label>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating..." : "Create account"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
