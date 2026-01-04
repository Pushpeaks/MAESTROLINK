import React, { useEffect, useRef } from "react";
import { mernApi } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    google?: any;
  }
}

export default function GoogleSignInButton() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Basic runtime debug to help diagnose invalid_client errors when testing locally
  // This logs the client ID Vite provides to the browser so you can verify it matches
  // the Google Cloud Console value and has no extra whitespace.
  // NOTE: remove these logs when debugging is finished.
  // eslint-disable-next-line no-console
  console.log("GOOGLE_CLIENT_ID (runtime):", clientId);

  useEffect(() => {
    if (!clientId) {
      return;
    }

    const init = () => {
      if (!window.google) return;

      // Debug: ensure window.google is present and the clientId used for initialization
      // eslint-disable-next-line no-console
      console.log("window.google present, initializing with client_id:", clientId);

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });

        if (containerRef.current) {
          // Render the Google button
          window.google.accounts.id.renderButton(containerRef.current, {
            theme: "outline",
            size: "large",
            width: "100%",
          });
        }

        // Optional: one-tap prompt
        // window.google.accounts.id.prompt();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Google Identity init error:", err);
      }
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // eslint-disable-next-line no-console
        console.log("Google Identity script loaded");
        init();
      };
      document.body.appendChild(script);

      return () => {
        script.onload = null;
      };
    }

    init();
  }, [clientId]);

  async function handleCredentialResponse(response: any) {
    try {
      const idToken = response?.credential;
      if (!idToken) {
        toast({ title: "Google sign-in failed", description: "No credential returned from Google.", variant: "destructive" });
        return;
      }

      // Send the idToken to the backend to exchange / verify and receive an auth token
      const res: any = await mernApi.oauthGoogle(idToken).catch((err) => {
        // If backend not implemented, notify user
        toast({ title: "Google sign-in pending", description: "Backend not configured to accept Google tokens.", variant: "default" });
        // Save the idToken locally for debugging (NOT SECURE for production)
        localStorage.setItem("googleIdToken", idToken);
        throw err;
      });

      // Extract token from response
      const token = res?.token || res?.accessToken || res?.authToken || (typeof res === "string" ? res : null);
      if (!token) {
        toast({ title: "Sign-in failed", description: "No auth token returned from server.", variant: "destructive" });
        return;
      }

      localStorage.setItem("authToken", token);
      toast({ title: "Signed in", description: "Welcome — you are now signed in.", variant: "default" });
      navigate("/dashboard");
    } catch (err) {
      // Already handled above with toast for backend missing; keep console for debugging
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  if (!clientId) {
    return (
      <button
        type="button"
        onClick={() =>
          toast({
            title: "Configure Google",
            description: "Set VITE_GOOGLE_CLIENT_ID in your environment to enable Google Sign-In.",
            variant: "default",
          })
        }
        className="w-full rounded-md border border-border bg-transparent py-2 px-3 text-sm hover:bg-muted"
      >
        Sign in with Google
      </button>
    );
  }

  return <div ref={containerRef} />;
}
