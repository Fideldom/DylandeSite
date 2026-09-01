import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export default function WhatsAppButton({ message = "Olá, gostaria de conhecer melhor as soluções da DYLANDE." }: { message?: string }) {
  const href = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
  return <a className="whatsapp-float" href={href} target="_blank" rel="noreferrer" aria-label="Falar com a DYLANDE pelo WhatsApp"><span>Fale connosco pelo WhatsApp</span><MessageCircle size={23} /></a>;
}
