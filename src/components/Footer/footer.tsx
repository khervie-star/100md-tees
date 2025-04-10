import Link from "next/link"
import { Shirt, Instagram, Twitter, Facebook, Youtube } from "lucide-react"

export function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = [
        {
            title: "Product",
            links: [
                { name: "Design Studio", href: "/design" },
                { name: "Marketplace", href: "/marketplace" },
                { name: "NFT Minting", href: "/nft" },
                { name: "Rewards Program", href: "/rewards" },
            ],
        },
        {
            title: "Company",
            links: [
                { name: "About Us", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "Blog", href: "/blog" },
                { name: "Press", href: "/press" },
            ],
        },
        {
            title: "Resources",
            links: [
                { name: "Help Center", href: "/help" },
                { name: "Design Guidelines", href: "/guidelines" },
                { name: "Community", href: "/community" },
                { name: "Partners", href: "/partners" },
            ],
        },
        {
            title: "Legal",
            links: [
                { name: "Terms of Service", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Cookie Policy", href: "/cookies" },
                { name: "Copyright Policy", href: "/copyright" },
            ],
        },
    ]

    return (
        <footer className="bg-white border-t border-slate/10 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-green rounded-full flex items-center justify-center">
                                <Shirt className="text-white100" size={20} />
                            </div>
                            <span className="font-bold text-xl text-black">ShirtNFT</span>
                        </Link>
                        <p className="text-grey mb-6 max-w-md">
                            The ultimate platform for designing custom shirts, minting them as NFTs, and earning rewards when others
                            purchase your creations.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="#"
                                className="w-10 h-10 rounded-full bg-slate/10 flex items-center justify-center text-grey hover:text-green hover:bg-green/10 transition-colors"
                            >
                                <Instagram size={20} />
                            </Link>
                            <Link
                                href="#"
                                className="w-10 h-10 rounded-full bg-slate/10 flex items-center justify-center text-grey hover:text-green hover:bg-green/10 transition-colors"
                            >
                                <Twitter size={20} />
                            </Link>
                            <Link
                                href="#"
                                className="w-10 h-10 rounded-full bg-slate/10 flex items-center justify-center text-grey hover:text-green hover:bg-green/10 transition-colors"
                            >
                                <Facebook size={20} />
                            </Link>
                            <Link
                                href="#"
                                className="w-10 h-10 rounded-full bg-slate/10 flex items-center justify-center text-grey hover:text-green hover:bg-green/10 transition-colors"
                            >
                                <Youtube size={20} />
                            </Link>
                        </div>
                    </div>

                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-bold text-black mb-4">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-grey hover:text-green transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-slate/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-grey text-sm">&copy; {currentYear} ShirtNFT. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/terms" className="text-grey hover:text-green transition-colors text-sm">
                            Terms
                        </Link>
                        <Link href="/privacy" className="text-grey hover:text-green transition-colors text-sm">
                            Privacy
                        </Link>
                        <Link href="/cookies" className="text-grey hover:text-green transition-colors text-sm">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
