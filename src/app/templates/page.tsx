import { ComingSoonPage } from "../_components";

export default function TemplatesPage() {
    return (
        <ComingSoonPage
            title="Templates Coming Soon"
            description="We're building a library of premium templates to help you create amazing shirt designs in seconds."
            pageName="templates"
            pattern="waves"
            estimatedTime="Q3 2023"
            primaryAction={{
                label: "Start with a blank design",
                href: "/design",
            }}
        />
    )
}
