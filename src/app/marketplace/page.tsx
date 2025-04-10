import { ComingSoonPage } from "../_components";

export default function MarketplacePage() {
    return (
        <ComingSoonPage
            title="Marketplace Coming Soon"
            description="Our marketplace is under construction. Soon you'll be able to browse, buy, and sell custom shirt designs as NFTs."
            pageName="marketplace"
            pattern="dots"
            estimatedTime="Q2 2023"
            primaryAction={{
                label: "Explore design studio instead",
                href: "/design-studio",
            }}
        />
    )
}
