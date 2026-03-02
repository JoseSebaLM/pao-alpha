import FooterSobreMi from "@/components/b2c/FooterSobreMi";
import FloatingWhatsApp from "@/components/b2c/FloatingWhatsApp";

export default function SobreMiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <FooterSobreMi />
      <FloatingWhatsApp />
    </>
  );
}
