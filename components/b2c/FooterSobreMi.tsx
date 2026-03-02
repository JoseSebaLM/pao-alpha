"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Youtube, Mail } from "lucide-react";

const navLinks = [
  { href: "/organizaciones", label: "Organizaciones" },
  { href: "/personas", label: "Personas" },
  { href: "/sobre-mi", label: "Sobre Mi" },
  { href: "/", label: "Inicio" },
];

const socialLinks = [
  {
    href: "https://linkedin.com/in/paolarioseco",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://youtube.com/@paolarioseco",
    label: "YouTube",
    icon: Youtube,
  },
];

export default function FooterSobreMi() {
  return (
    <footer className="bg-ink text-paper">
      {/* Main Footer */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <div className="flex flex-col items-center text-center space-y-10">
          {/* Logo Principal - Colores originales, proporciones exactas */}
          <Link href="/" className="relative">
            <Image
              src="/logo.png"
              alt="Paola Rioseco"
              width={160}
              height={40}
              className="w-40 h-auto"
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links - Email, LinkedIn, YouTube (sin Instagram) */}
          <div className="flex items-center gap-4">
            {/* Email Icon */}
            <a
              href="mailto:paorioseco@gmail.com"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all"
              aria-label="Enviar email"
            >
              <Mail className="w-5 h-5" />
            </a>
            
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Copyright + Ley 21.719 (PRIV-001) */}
          <div className="pt-6 border-t border-white/10 w-full">
            <p className="text-white/50 text-xs">
              © 2026 Paola Rioseco. Conocimiento para la transformación personal.
            </p>
            <p className="text-white/40 text-xs mt-2">
              Todos los datos personales son tratados conforme a la Ley 21.719 de Protección de Datos Personales.
            </p>
            <p className="text-white/40 text-xs mt-2">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
