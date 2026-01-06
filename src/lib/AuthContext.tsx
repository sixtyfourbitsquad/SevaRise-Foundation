import { createContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Navigate } from "react-router-dom";

type AuthContextType = { user: any | null; loading: boolean; role: string | null };
export const AuthContext = createContext<AuthContextType>({ user: null, loading: true, role: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      // Ensure JWT is fresh so updated user_metadata (role) reflects in session
      try {
        await supabase.auth.refreshSession();
      } catch {}
      const { data } = await supabase.auth.getSession();
      const u = data.session?.user ?? null;
      setUser(u);
      setRole((u?.user_metadata?.role as string) || null);
      setLoading(false);
    };
    init();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      setRole((u?.user_metadata?.role as string) || null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, loading, role }}>{children}</AuthContext.Provider>;
};

export const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  return (
    <AuthContext.Consumer>
      {({ user, loading }) => (loading ? null : user ? element : <Navigate to="/auth" replace />)}
    </AuthContext.Consumer>
  );
};


