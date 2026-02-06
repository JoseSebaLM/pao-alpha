"use client";

import { motion } from "framer-motion";
import { Brain, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

const categorias = [
  {
    id: "mente",
    nombre: "Mente",
    color: "#273DA0",
    colorClass: "border-mente",
    bgHover: "hover:bg-mente/5",
    icono: Brain,
    descripcion: "Claridad mental, mindfulness y crecimiento cognitivo",
  },
  {
    id: "cuerpo",
    nombre: "Cuerpo",
    color: "#FB4C00",
    colorClass: "border-cuerpo",
    bgHover: "hover:bg-cuerpo/5",
    icono: Heart,
    descripcion: "Salud física, nutrición y bienestar corporal",
  },
  {
    id: "espiritu",
    nombre: "Espíritu",
    color: "#9B18B9",
    colorClass: "border-espíritu",
    bgHover: "hover:bg-espíritu/5",
    icono: Sparkles,
    descripcion: "Conexión interior, propósito y trascendencia",
  },
];

export default function TriacomaNav() {
  return (
    <nav className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categorias.map((categoria, index) => {
            const Icono = categoria.icono;
            return (
              <motion.div
                key={categoria.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Link
                  href={`/biblioteca?categoria=${categoria.id}`}
                  className={`group block relative bg-white rounded-xl p-6 shadow-sm 
                    border-t-4 ${categoria.colorClass} 
                    transition-all duration-300 ease-out
                    hover:shadow-lg hover:-translate-y-1 ${categoria.bgHover}`}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="p-3 rounded-lg shrink-0"
                      style={{ backgroundColor: `${categoria.color}15` }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icono
                        className="w-6 h-6"
                        style={{ color: categoria.color }}
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-serif text-xl font-semibold mb-1"
                        style={{ color: categoria.color }}
                      >
                        {categoria.nombre}
                      </h3>
                      <p className="text-sm text-ink/70 leading-relaxed">
                        {categoria.descripcion}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  >
                    <svg
                      className="w-5 h-5 text-ink/30"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
