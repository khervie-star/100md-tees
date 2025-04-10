"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button, cn, Input } from "@heroui/react"
import { MainNav } from "@/components"

interface ComingSoonPageProps {
    title: string
    description: string
    pageName: string
    className?: string
    pattern?: "dots" | "grid" | "waves"
    primaryAction?: {
        label: string
        href: string
    }
    estimatedTime?: string
}

export function ComingSoonPage({
    title,
    description,
    pageName,
    className,
    pattern = "dots",
    primaryAction,
    estimatedTime,
}: ComingSoonPageProps) {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            // Here you would typically send this to your API
            console.log("Notification email:", email)
            setIsSubmitted(true)
            setEmail("")

            // Reset the submitted state after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false)
            }, 3000)
        }
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    }

    // Floating animation for decorative elements
    const floatingAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse" as const,
            ease: "easeInOut",
        },
    }

    return (
        <section>
            <MainNav />
            <div className={cn("min-h-[80vh] flex items-center justify-center px-4 py-12 relative", className)}>
                <div className="absolute inset-0 overflow-hidden">
                    {pattern === "dots" && (
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0 grid grid-cols-12 gap-4">
                                {Array.from({ length: 200 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1 h-1 rounded-full bg-green"
                                        initial={{ opacity: 0.1 + Math.random() * 0.3 }}
                                        animate={{
                                            opacity: [0.1 + Math.random() * 0.3, 0.3 + Math.random() * 0.5, 0.1 + Math.random() * 0.3],
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{
                                            duration: 2 + Math.random() * 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            delay: Math.random() * 2,
                                        }}
                                        style={{
                                            top: `${Math.random() * 100}%`,
                                            left: `${Math.random() * 100}%`,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {pattern === "grid" && (
                        <div className="absolute inset-0 opacity-5">
                            <div className="h-full w-full bg-[linear-gradient(to_right,#1C4532_1px,transparent_1px),linear-gradient(to_bottom,#1C4532_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
                        </div>
                    )}

                    {pattern === "waves" && (
                        <div className="absolute inset-0 opacity-5">
                            <svg
                                className="h-full w-full"
                                xmlns="http://www.w3.org/2000/svg"
                                id="visual"
                                viewBox="0 0 900 600"
                                width="900"
                                height="600"
                            >
                                <path
                                    d="M0 433L21.5 442.2C43 451.3 86 469.7 128.8 473.8C171.7 478 214.3 468 257.2 463.3C300 458.7 343 459.3 385.8 454.3C428.7 449.3 471.3 438.7 514.2 435.3C557 432 600 436 642.8 442.3C685.7 448.7 728.3 457.3 771.2 458.7C814 460 857 454 878.5 451L900 448L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
                                    fill="#1C4532"
                                    fillOpacity="0.4"
                                ></path>
                                <path
                                    d="M0 484L21.5 486.5C43 489 86 494 128.8 496.5C171.7 499 214.3 499 257.2 498.5C300 498 343 497 385.8 496.5C428.7 496 471.3 496 514.2 498.5C557 501 600 506 642.8 507.5C685.7 509 728.3 507 771.2 505.5C814 504 857 503 878.5 502.5L900 502L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
                                    fill="#1C4532"
                                    fillOpacity="0.3"
                                ></path>
                                <path
                                    d="M0 525L21.5 526.5C43 528 86 531 128.8 532.5C171.7 534 214.3 534 257.2 533.5C300 533 343 532 385.8 531.5C428.7 531 471.3 531 514.2 533.5C557 536 600 541 642.8 542.5C685.7 544 728.3 542 771.2 540.5C814 539 857 538 878.5 537.5L900 537L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
                                    fill="#1C4532"
                                    fillOpacity="0.2"
                                ></path>
                            </svg>
                        </div>
                    )}
                </div>

                <motion.div
                    className="relative z-10 max-w-2xl mx-auto text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="absolute -top-24 left-1/2 transform -translate-x-1/2" animate={floatingAnimation}>
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-green/10 flex items-center justify-center">
                                {pageName === "marketplace" ? (
                                    <motion.div
                                        className="w-10 h-10 rounded-full bg-green/20 flex items-center justify-center"
                                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] }}
                                        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                                                stroke="#1C4532"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M9 22V12H15V22"
                                                stroke="#1C4532"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        className="w-10 h-10 rounded-full bg-green/20 flex items-center justify-center"
                                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] }}
                                        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                                                stroke="#1C4532"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path d="M3 9H21" stroke="#1C4532" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9 21V9" stroke="#1C4532" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </motion.div>
                                )}
                            </div>

                            {/* Decorative elements */}
                            <motion.div
                                className="absolute -top-4 -right-8 w-6 h-6 rounded-full bg-green/10"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                            />
                            <motion.div
                                className="absolute -bottom-2 -left-6 w-4 h-4 rounded-full bg-green/20"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.6, 1, 0.6],
                                }}
                                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2 mb-8 pt-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-black">{title}</h1>
                        <p className="text-grey text-lg max-w-lg mx-auto">{description}</p>

                        {estimatedTime && (
                            <motion.div
                                className="inline-block mt-2 px-4 py-1.5 bg-green/10 rounded-full"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <p className="text-green text-sm font-medium flex items-center">
                                    <Bell size={14} className="mr-2" />
                                    <span>Estimated launch: {estimatedTime}</span>
                                </p>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-8">
                        {isSubmitted ? (
                            <motion.div
                                className="flex items-center justify-center space-x-2 text-green"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <CheckCircle size={20} />
                                <span>We'll notify you when we launch!</span>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1"
                                    required
                                />
                                <Button type="submit" color="primary" className="font-medium text-white100">
                                    Notify Me
                                </Button>
                            </form>
                        )}
                    </motion.div>

                    {primaryAction && (
                        <motion.div variants={itemVariants}>
                            <Link
                                href={primaryAction.href}
                                className="inline-flex items-center text-green hover:text-green/80 font-medium"
                            >
                                {primaryAction.label}
                                <ArrowRight size={16} className="ml-1" />
                            </Link>
                        </motion.div>
                    )}

                    {/* Animated illustration */}
                    <motion.div className="mt-12 relative h-64 md:h-80" variants={itemVariants}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            {pageName === "marketplace" ? <MarketplaceIllustration /> : <TemplatesIllustration />}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

function MarketplaceIllustration() {
    return (
        <div className="relative w-full max-w-md">
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-green/5"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />

            <div className="relative grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                        key={i}
                        className="bg-white rounded-xl shadow-sm border border-slate/10 p-3 flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i, duration: 0.5 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                        <div className="w-full aspect-square rounded-lg bg-green/10 mb-2 overflow-hidden">
                            <motion.div
                                className="w-full h-full bg-gradient-to-br from-green/20 to-green/5"
                                animate={{
                                    background: [
                                        "linear-gradient(to bottom right, rgba(28, 69, 50, 0.2), rgba(28, 69, 50, 0.05))",
                                        "linear-gradient(to bottom right, rgba(28, 69, 50, 0.05), rgba(28, 69, 50, 0.2))",
                                        "linear-gradient(to bottom right, rgba(28, 69, 50, 0.2), rgba(28, 69, 50, 0.05))",
                                    ],
                                }}
                                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                            />
                        </div>
                        <div className="w-full h-2 bg-slate/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-green/30 rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, delay: 0.2 * i, ease: "easeInOut" }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Floating elements */}
            <motion.div
                className="absolute -top-8 -right-4 w-12 h-12 rounded-full bg-green/10 flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        stroke="#1C4532"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>

            <motion.div
                className="absolute -bottom-4 -left-6 w-10 h-10 rounded-full bg-green/10 flex items-center justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61Z"
                        stroke="#1C4532"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>
        </div>
    )
}

// Templates illustration component
function TemplatesIllustration() {
    return (
        <div className="relative w-full max-w-md">
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-green/5"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />

            <div className="relative grid grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        className="bg-white rounded-xl shadow-sm border border-slate/10 p-4 flex flex-col"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 * i, duration: 0.5 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                        <div className="w-full h-24 rounded-lg bg-green/10 mb-3 overflow-hidden">
                            <motion.div
                                className="w-full h-full"
                                style={{
                                    background: `repeating-linear-gradient(
                    90deg,
                    rgba(28, 69, 50, 0.1),
                    rgba(28, 69, 50, 0.1) 10px,
                    rgba(28, 69, 50, 0.15) 10px,
                    rgba(28, 69, 50, 0.15) ${10 + i * 2}px
                  )`,
                                }}
                                animate={{
                                    backgroundPosition: ["0px 0px", `${30 * i}px 0px`],
                                }}
                                transition={{ duration: 3 + i, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="w-2/3 h-2 bg-slate/10 rounded-full" />
                            <div className="w-full h-2 bg-slate/10 rounded-full" />
                            <div className="w-5/6 h-2 bg-slate/10 rounded-full" />
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate/10 flex justify-between items-center">
                            <div className="w-8 h-8 rounded-full bg-green/10" />
                            <div className="w-16 h-3 bg-green/20 rounded-full" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Floating elements */}
            <motion.div
                className="absolute -top-6 -right-2 w-12 h-12 rounded-full bg-green/10 flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                        stroke="#1C4532"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M14 2V8H20" stroke="#1C4532" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 13H8" stroke="#1C4532" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 17H8" stroke="#1C4532" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 9H9H8" stroke="#1C4532" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.div>

            <motion.div
                className="absolute -bottom-2 -left-4 w-10 h-10 rounded-full bg-green/10 flex items-center justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#1C4532"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
                        stroke="#1C4532"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M12 17H12.01" stroke="#1C4532" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.div>
        </div>
    )
}
