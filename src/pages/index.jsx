import { ContactList } from "@/components/ContactList";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeMinimal, ThemeSupa } from "@supabase/auth-ui-shared";

export default function Home() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  if (!user) {
    return <div className="container"> 
    <Auth supabaseClient={supabaseClient}
       appearance= {{ theme: ThemeSupa }}
       providers = {[]} />
    </div>;
  }

  return (
    <div className="container">
      <div>
        User <b>{user.email}</b> is Authenticated {""} 
      <button onClick={() => 
      { supabaseClient.auth.signOut();
      }}>Logout</button>
      <ContactList />
        </div>
    </div>
  );
}
