import HeaderB2B from "@/components/b2b/HeaderB2B";
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
      <HeaderB2B />
      <main className="pt-20">{children}</main>
      <FooterB2B />
    </>
  );
}
