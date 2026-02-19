import FooterB2B from "@/components/b2b/FooterB2B";

export const metadata = {
  title: "Soluciones Corporativas | Paola Rioseco",
  description: "Consultoría en gestión del riesgo psicosocial, seguridad psicológica y resiliencia operativa para organizaciones.",
};

export default function B2BLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <FooterB2B />
    </>
  );
}
