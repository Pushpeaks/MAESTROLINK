import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { mernApi } from "@/lib/api";

export default function ContactSalesModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const nameRef = useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (open) nameRef.current?.focus();
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { name, email, message, source: "marketing" };
      await mernApi.contact(payload);

      toast({ title: "Message sent", description: "Thanks — our sales team will reach out soon.", variant: "default" });
      onOpenChange(false);

      // reset fields
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      toast({ title: "Send failed", description: err?.message || "Failed to send message.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Sales</DialogTitle>
          <DialogDescription>Tell us about your needs and we'll connect you with our team.</DialogDescription>
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
            <div className="text-sm mb-1">Message</div>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required />
          </label>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Sending..." : "Send message"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
