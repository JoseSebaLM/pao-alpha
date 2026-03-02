import { Metadata } from "next";
import ContactSection from "@/components/b2c/ContactSection";
import Testimonials from "@/components/b2c/Testimonials";

export const metadata: Metadata = {
  title: "Contacto | Paola Rioseco",
  description: "Conecta con Paola Rioseco para iniciar tu proceso de transformación personal. Escríbeme por WhatsApp o déjame un mensaje.",
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Sección de Contacto */}
      <ContactSection />

      {/* Sección de Testimonios */}
      <Testimonials />
    </div>
  );
}
