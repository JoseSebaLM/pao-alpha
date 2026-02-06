"use client";

import Image from "next/image";
import Link from "next/link";
import { Youtube, Instagram, MessageCircle } from "lucide-react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre-mi", label: "Sobre mí" },
];

const socialLinks = [
  {
    href: "https://youtube.com",
    label: "YouTube",
    icon: Youtube,
  },
  {
    href: "https://instagram.com/paolarioseco",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://wa.me/56999396166",
    label: "WhatsApp",
    icon: MessageCircle,
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 text-center">
          <p className="text-white/60 text-sm mb-3">¿Listo para tu transformación?</p>
          <Link
            href="https://wa.me/56999396166"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary/90 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Escríbeme por WhatsApp
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <div className="flex flex-col items-center text-center space-y-10">
          {/* Logo */}
          <Link href="/" className="relative">
            <Image
              src="/logo.png"
              alt="Paola Rioseco"
              width={140}
              height={32}
              className="w-32 h-auto opacity-90 hover:opacity-100 transition-opacity invert"
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

          {/* Contact */}
          <div className="space-y-2 text-sm">
            <a
              href="tel:+56999396166"
              className="block text-white/70 hover:text-white transition-colors"
            >
              +569 99396166
            </a>
            <a
              href="mailto:paola@paolarioseco.com"
              className="block text-white/70 hover:text-white transition-colors"
            >
              paola@paolarioseco.com
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
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

          {/* Copyright */}
          <div className="pt-6 border-t border-white/10 w-full">
            <p className="text-white/50 text-xs">
              © 2026 Paola Rioseco. Conocimiento para la transformación personal.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
