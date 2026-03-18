"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// Menú para páginas generales (Inicio, Quien Soy, Organizaciones)
const navLinksDefault = [
  { href: "/organizaciones", label: "Organizaciones" },
  { href: "/personas", label: "Personas" },
  { href: "/quien-soy", label: "Quien Soy" },
  { href: "/", label: "Inicio" },
];

// Menú para sección Personas
const navLinksPersonas = [
  { href: "/personas", label: "Personas" },
  { href: "/personas/biblioteca", label: "Biblioteca" },
  { href: "/quien-soy", label: "Quien Soy" },
  { href: "/", label: "Inicio" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detectar si estamos en la sección de personas
  const isPersonasSection = pathname?.startsWith("/personas");
  const navLinks = isPersonasSection ? navLinksPersonas : navLinksDefault;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 h-20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isScrolled
              ? "bg-paper/80 backdrop-blur-md shadow-sm"
              : "bg-transparent"
          }`}
        />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative">
            <Image
              src="/logo.png"
              alt="Paola Rioseco"
              width={180}
              height={40}
              className="w-32 md:w-44 h-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation - Tipografía Premium */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-lg font-medium tracking-wide text-ink/70 hover:text-primary transition-colors duration-300 relative group"
              >
                {link.label}
                {/* Línea decorativa sutil en hover */}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Contact Button */}
          <div className="hidden md:block">
            <Link
              href="/contacto"
              className="inline-flex items-center px-6 py-2.5 bg-primary text-white font-sans text-sm font-medium rounded-full hover:bg-primary/90 transition-colors duration-200"
            >
              Contacto
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-ink hover:text-primary transition-colors duration-200"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-20 left-4 right-4 z-40 bg-paper rounded-2xl shadow-xl border border-ink/5 md:hidden overflow-hidden"
            >
              <nav className="flex flex-col p-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 font-sans text-base font-medium text-ink/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                  className="mt-4 pt-4 border-t border-ink/10"
                >
                  <Link
                    href="/contacto"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 text-center bg-primary text-white font-sans text-base font-medium rounded-full hover:bg-primary/90 transition-colors duration-200"
                  >
                    Contacto
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
