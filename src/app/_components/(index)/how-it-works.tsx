"use client"

import { motion } from "framer-motion"

interface HowItWorksCardProps {
  step: number
  title: string
  description: string
  delay?: number
}

export function HowItWorksCard({ step, title, description, delay = 0 }: HowItWorksCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm border border-slate/10 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="w-12 h-12 bg-green text-white100 rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto">
        {step}
      </div>
      <h3 className="text-xl font-bold text-black mb-2 text-center">{title}</h3>
      <p className="text-grey text-center">{description}</p>
    </motion.div>
  )
}
