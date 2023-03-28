import { useQuery } from "@tanstack/react-query"
import { ContactCard } from "./ContactCard";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";




export function ContactList() {
    const supabaseClient = useSupabaseClient();

    const getAllContacts = () => {
        return supabaseClient.from("contacts").select("*").then((response) => response.data);
    }

    const { data, isLoading , error } = useQuery(["contacts"], getAllContacts);
   
    return (<div> {isLoading && <div>Loading Contacts</div>}
    {error && <div>Error loading contacts</div>}

    {data && data.map((contact, index) => {
        return <ContactCard key= {index} contact = {contact} />;
    })}

<Link href="/add" className= "btn btn-primary">
    Add Contact
</Link> 
    </div>
    );
}