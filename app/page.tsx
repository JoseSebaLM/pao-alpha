"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { WHATSAPP_CONFIG, EMAIL_CONFIG, FEATURE_FLAGS } from "@/lib/config";
import FloatingWhatsApp from "@/components/b2c/FloatingWhatsApp";

// Animation variants - Glass Box Architecture
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function SiloCero() {
  const router = useRouter();
  
  // Glass Box: Feature Flag logic explicit
  const isB2BEnabled = FEATURE_FLAGS.b2bEnabled;

  // Redirect to B2C if B2B is disabled (client-side)
  useEffect(() => {
    if (!isB2BEnabled) {
      router.push("/personas");
    }
  }, [isB2BEnabled, router]);

  // Don't render while checking redirect condition
  if (!isB2BEnabled) {
    return null;
  }

  return (
    <>
      <main className="min-h-screen bg-paper flex flex-col items-center justify-center px-4">
        <motion.div
          className="max-w-3xl w-full text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={itemVariants}
            className="text-micro text-muted block mb-4 tracking-widest uppercase"
          >
            Portal de Acceso
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-4"
          >
            ¿Cómo puedo acompañarte?
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-muted text-lg mb-12 font-sans"
          >
            Elige el camino que corresponda a tu situación.
          </motion.p>

          {/* Dual Entry: B2B + B2C (when flag enabled) */}
          <motion.div
            className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto"
            variants={containerVariants}
          >
            {/* Opción Organizaciones (B2B) */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Link
                href="/organizaciones"
                className="group block h-full flex flex-col p-8 border border-ink/10 rounded-2xl hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 bg-white"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h2 className="font-serif text-xl text-ink mb-3">
                  Soluciones para Organizaciones
                </h2>
                <p className="text-sm text-muted font-sans leading-relaxed flex-grow">
                  Programas de bienestar, talleres y consultoría para equipos y
                  empresas.
                </p>
              </Link>
            </motion.div>

            {/* Opción Personal (B2C) */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Link
                href="/personas"
                className="group block h-full flex flex-col p-8 border border-ink/10 rounded-2xl hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 bg-white"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="font-serif text-xl text-ink mb-3">
                  Acompañamiento Personal y Vida Consciente
                </h2>
                <p className="text-sm text-muted font-sans leading-relaxed flex-grow">
                  Sesiones individuales, mentorías y recursos para tu crecimiento.
                </p>
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-12 text-xs text-muted/60 font-sans"
          >
            Todos los caminos conducen al mismo propósito: consciencia y
            coherencia.
          </motion.p>
        </motion.div>
      </main>

      {/* Footer Mínimo Viable - Silo Cero */}
      <footer className="bg-ink text-paper py-10 px-4">
        <motion.div
          className="max-w-3xl mx-auto flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <Link href="/" className="opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src="/logo.png"
              alt="Paola Rioseco"
              width={140}
              height={32}
              className="w-28 h-auto"
              priority
            />
          </Link>

          {/* Iconos de Contacto */}
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${EMAIL_CONFIG.b2c}`}
              className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all"
              aria-label="Enviar email"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/paolarioseco"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            <a
              href={WHATSAPP_CONFIG.getLinkWithText("default")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>

          <p className="text-white/40 text-xs">© 2026 Paola Rioseco</p>

          <p className="text-white/40 text-xs">
            Desarrollado por{" "}
            <a
              href="https://sint.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              sint.cl
            </a>
          </p>
        </motion.div>
      </footer>

      <FloatingWhatsApp />
    </>
  );
}
