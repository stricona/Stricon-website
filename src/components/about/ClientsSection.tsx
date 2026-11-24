import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { profile } from "@/data/profile";

export function ClientsSection() {
  return (
    <ClientsMarquee
      heading={profile.clientsHeading}
      sentence={profile.clientsSentence}
      eyebrow="Esteemed Clients"
      showIndustriesChips={true}
      className="bg-[var(--background)]"
    />
  );
}
