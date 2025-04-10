"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface TestimonialCardProps {
    quote: string
    author: string
    role: string
    avatar: string
    delay?: number
}

export function TestimonialCard({ quote, author, role, avatar, delay = 0 }: TestimonialCardProps) {
    return (
        <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-slate/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
        >
            <div className="mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">
                        ★
                    </span>
                ))}
            </div>
            <p className="text-grey mb-6">"{quote}"</p>
            <div className="flex items-center gap-3">
                <Image src={avatar || "/placeholder.svg"} alt={author} width={60} height={60} className="rounded-full" />
                <div>
                    <h4 className="font-bold text-black">{author}</h4>
                    <p className="text-sm text-grey">{role}</p>
                </div>
            </div>
        </motion.div>
    )
}
