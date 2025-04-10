"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FeatureCardProps {
    icon: ReactNode
    title: string
    description: string
    delay?: number
}

export function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
    return (
        <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-slate/10 hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
        >
            <div className="w-12 h-12 bg-green/10 rounded-full flex items-center justify-center text-green mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
            <p className="text-grey">{description}</p>
        </motion.div>
    )
}
