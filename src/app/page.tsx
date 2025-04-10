
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, Shirt, Palette, Coins, ShoppingBag, ArrowRight, CheckCircle, ChevronDown } from "lucide-react"
import { FeatureCard, HowItWorksCard, TestimonialCard } from "./_components"
import { Banner, Footer, MainNav } from "@/components"
import { Button } from '@heroui/button';
import text from "@/assets/images/text.png"
import { Avatar, AvatarGroup } from "@heroui/react"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-white100 font-bricolage">
      <Banner />
      <MainNav />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 z-0 bg-gradient-radial from-green/10 to-transparent opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-12"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={staggerChildren}
          >
            <motion.div className="lg:w-1/2 space-y-6" variants={fadeIn}>
              <div className="inline-block px-4 py-1.5 bg-green/10 rounded-full">
                <p className="text-green text-sm font-medium flex items-center">
                  <span className="mr-2">Revolutionizing Custom Apparel</span>
                  <ChevronRight size={16} />
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight font-bricolage">
                Design. Mint. <span className="text-green">Earn.</span>
              </h1>
              <p className="text-lg text-grey max-w-xl">
                Create custom shirts, mint your designs as NFTs, and earn rewards when others purchase your creations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  color="primary"
                  size="lg"
                  radius="full"
                  className="font-medium text-white100"
                  endContent={<ArrowRight size={18} />}
                >
                  Start Designing
                </Button>
                <Button variant="bordered" color="primary" size="lg" radius="full" className="font-medium">
                  Explore Marketplace
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-6">
                <div className="flex -space-x-3">
                  <AvatarGroup isBordered>
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                  </AvatarGroup>
                </div>
                <div className="text-sm">
                  <span className="text-green font-semibold">2,500+</span> creators already joined
                </div>
              </div>
            </motion.div>
            <motion.div className="lg:w-1/2 relative" variants={fadeIn}>
              <div className="relative h-[400px] md:h-[500px] w-full">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-conic from-green/20 to-transparent rounded-2xl transform rotate-45"></div>
                <Image
                  src={text}
                  alt="Custom Shirt Design Platform"
                  width={600}
                  height={500}
                  className="relative z-10 object-contain"
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white100 p-4 rounded-xl shadow-lg z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green/10 rounded-full flex items-center justify-center">
                      <Coins className="text-green" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-grey">Earnings</p>
                      <p className="text-lg font-bold text-black">$12,450</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="absolute top-10 -right-6 bg-white100 p-4 rounded-xl shadow-lg z-20"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green/10 rounded-full flex items-center justify-center">
                      <Shirt className="text-green" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-grey">Designs Sold</p>
                      <p className="text-lg font-bold text-black">1,240</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-grey text-lg">Trusted by leading brands and creators</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[1, 2, 3, 4, 5].map((i) => (
              <Image
                key={i}
                src={`/placeholder.svg?height=40&width=120`}
                alt={`Brand ${i}`}
                width={120}
                height={40}
                className="opacity-60 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white100">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Everything You Need to Create, Mint & Earn
            </h2>
            <p className="text-grey text-lg">
              Our platform combines custom apparel design with blockchain technology, creating a unique ecosystem for
              creators and fashion enthusiasts.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Shirt size={28} />}
              title="Custom Shirt Design"
              description="Design unique shirts with our easy-to-use tools. Add images, text, and artwork to create your perfect apparel."
              delay={0.1}
            />
            <FeatureCard
              icon={<Palette size={28} />}
              title="NFT Minting"
              description="Turn your designs into NFTs on the blockchain, creating verifiable ownership and authenticity for your creations."
              delay={0.3}
            />
            <FeatureCard
              icon={<Coins size={28} />}
              title="Reward Points"
              description="Earn points for every design, purchase, and social share. Redeem for discounts or exclusive features."
              delay={0.5}
            />
            <FeatureCard
              icon={<ShoppingBag size={28} />}
              title="Creator Marketplace"
              description="List your designs and earn 20% commission every time someone purchases your shirt design."
              delay={0.7}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">How It Works</h2>
            <p className="text-grey text-lg">
              From design to earning royalties, our platform makes the process seamless and rewarding.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-green/20 -z-10 hidden md:block"></div>

            <HowItWorksCard
              step={1}
              title="Design Your Shirt"
              description="Use our intuitive design tools to create unique shirts with custom images, text, and artwork."
              delay={0.1}
            />
            <HowItWorksCard
              step={2}
              title="Mint as NFT"
              description="Convert your design into an NFT, establishing ownership and authenticity on the blockchain."
              delay={0.3}
            />
            <HowItWorksCard
              step={3}
              title="Earn Rewards"
              description="List your design in the marketplace and earn 20% commission on every sale of your design."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20 bg-green/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-conic from-green/20 to-transparent rounded-2xl transform -rotate-6"></div>
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Shirt Design Showcase"
                  width={600}
                  height={600}
                  className="relative rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green/10 rounded-full flex items-center justify-center">
                      <Coins className="text-green" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-grey">Creator Earnings</p>
                      <p className="text-lg font-bold text-black">$2,450</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="lg:w-1/2 space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black">Turn Your Creativity Into Income</h2>
              <p className="text-lg text-grey">
                Our platform empowers designers to monetize their creativity through custom shirt designs that are
                minted as NFTs, providing authenticity and ownership while generating passive income.
              </p>
              <ul className="space-y-4">
                {[
                  "Create unique designs with our easy-to-use tools",
                  "Mint your designs as NFTs for proof of ownership",
                  "Earn 20% commission on every sale of your design",
                  "Build a following and grow your designer reputation",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-green mt-1 flex-shrink-0" size={20} />
                    <span className="text-grey">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                color="primary"
                size="lg"
                radius="full"
                className="font-medium text-white100 mt-4"
                endContent={<ArrowRight size={18} />}
              >
                Start Creating Today
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">What Our Creators Say</h2>
            <p className="text-grey text-lg">
              Join thousands of satisfied designers who are turning their creativity into income.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="I've earned over $5,000 in passive income from my shirt designs. The NFT minting feature adds real value to my work."
              author="Alex Morgan"
              role="Graphic Designer"
              avatar="/placeholder.svg?height=60&width=60"
              delay={0.1}
            />
            <TestimonialCard
              quote="The platform is incredibly easy to use. I went from idea to selling my first shirt in less than an hour."
              author="Sarah Johnson"
              role="Fashion Enthusiast"
              avatar="/placeholder.svg?height=60&width=60"
              delay={0.3}
            />
            <TestimonialCard
              quote="As an artist, I love that my designs are protected as NFTs. The 20% commission on sales is the best in the industry."
              author="Michael Chen"
              role="Digital Artist"
              avatar="/placeholder.svg?height=60&width=60"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white100">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Frequently Asked Questions</h2>
            <p className="text-grey text-lg">Everything you need to know about our platform and how it works.</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How do I create a custom shirt design?",
                answer:
                  "Our platform provides an intuitive design tool where you can upload images, add text, and incorporate artwork. You can preview your design in real-time and make adjustments until you're satisfied.",
              },
              {
                question: "What does it mean to mint my design as an NFT?",
                answer:
                  "Minting your design as an NFT (Non-Fungible Token) creates a unique digital asset on the blockchain that verifies your ownership and the authenticity of your design. This provides protection for your intellectual property.",
              },
              {
                question: "How do I earn from my designs?",
                answer:
                  "When you list your design in our marketplace, you earn 20% commission every time someone purchases a shirt with your design. You also earn points for various activities that can be redeemed for discounts or exclusive features.",
              },
              {
                question: "What happens after someone buys my design?",
                answer:
                  "We handle all the production, shipping, and customer service. You simply collect your 20% commission on each sale. Your earnings are automatically credited to your account.",
              },
              {
                question: "Do I need to know about blockchain or NFTs to use the platform?",
                answer:
                  "Not at all! We've designed the platform to be user-friendly for everyone. The NFT minting process is seamless and happens in the background - no technical knowledge required.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                className="border border-slate/20 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <details className="group">
                  <summary className="flex items-center justify-between gap-2 p-6 text-lg font-medium cursor-pointer">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 text-grey">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white100 mb-4">
              Ready to Turn Your Designs Into Income?
            </h2>
            <p className="text-white100/80 text-lg mb-8">
              Join thousands of creators who are already earning from their creativity. Start designing, minting, and
              earning today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                color="default"
                size="lg"
                radius="full"
                className="font-medium text-green bg-white100"
                endContent={<ArrowRight size={18} />}
              >
                Start Designing Now
              </Button>
              <Button variant="bordered" size="lg" radius="full" className="font-medium text-white100 border-white100">
                Explore Marketplace
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
