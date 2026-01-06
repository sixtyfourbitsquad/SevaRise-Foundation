import { useContext, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/lib/AuthContext";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Only redirect if user is logged in normally (not recovery mode)
    if (user && !resetMode && !hasRecoverySession) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, resetMode, hasRecoverySession, navigate]);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setResetMode(true);
        setHasRecoverySession(true);
        setSuccess("Enter a new password below.");
      }
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (resetMode) {
        if (!hasRecoverySession) {
          const { error: resetErr } = await supabase.auth.resetPasswordForEmail(
            email,
            {
              redirectTo: window.location.origin + "/auth",
            }
          );
          if (resetErr) throw resetErr;
          setSuccess("If the email exists, a reset link has been sent.");
        } else {
          if (!newPassword || newPassword !== confirmPassword) {
            throw new Error("Passwords do not match");
          }
          const { error: updErr } = await supabase.auth.updateUser({
            password: newPassword,
          });
          if (updErr) throw updErr;
          setSuccess("Password updated. You can log in with the new password.");
          setResetMode(false);
          setHasRecoverySession(false);
          setNewPassword("");
          setConfirmPassword("");
        }
      } else if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        if (data?.user) {
          setSuccess("Account created. Please check your email to verify.");
        } else {
          setSuccess(
            "If the email is valid, a verification link has been sent."
          );
        }
      } else {
        const { error: signInError } =
          await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        setSuccess("Logged in successfully. Redirecting...");
        setTimeout(() => navigate("/dashboard", { replace: true }), 600);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {resetMode
                  ? hasRecoverySession
                    ? "Set new password"
                    : "Reset password"
                  : isSignUp
                  ? "Create account"
                  : "Log in"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Show email field only if not in recovery session */}
                {(!resetMode || (resetMode && !hasRecoverySession)) && (
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                )}

                {!resetMode && (
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                )}

                {resetMode && hasRecoverySession && (
                  <>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="text-xs text-text-secondary">
                      Tip: If you opened this page from a password recovery link,
                      you can set a new password directly here.
                    </div>
                  </>
                )}

                {error && <div className="text-sm text-red-600">{error}</div>}
                {success && (
                  <div className="text-sm text-green-700">{success}</div>
                )}

                <Button className="w-full" type="submit" disabled={loading}>
                  {loading
                    ? "Please wait..."
                    : resetMode
                    ? hasRecoverySession
                      ? "Update password"
                      : "Send reset link"
                    : isSignUp
                    ? "Sign up"
                    : "Log in"}
                </Button>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setResetMode(false);
                    }}
                  >
                    {isSignUp ? "Have an account? Log in" : "Create an account"}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setResetMode(!resetMode);
                      setIsSignUp(false);
                    }}
                  >
                    {resetMode ? "Back to login" : "Forgot password?"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
