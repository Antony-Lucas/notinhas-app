import { supabaseUtil } from "@/utils/supabaseUtil";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function useCurrentSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabaseUtil.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabaseUtil.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return session;
}
