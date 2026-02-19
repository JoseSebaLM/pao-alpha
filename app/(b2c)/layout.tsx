import FooterB2C from "@/components/b2c/FooterB2C";
import FloatingWhatsApp from "@/components/b2c/FloatingWhatsApp";

export default function B2CLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <FooterB2C />
      <FloatingWhatsApp />
    </>
  );
}
