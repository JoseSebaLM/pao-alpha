import FloatingWhatsApp from "@/components/b2c/FloatingWhatsApp";

export default function SobreMiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <FloatingWhatsApp />
    </>
  );
}
