import type { MenuItem } from "@/types/menu"

const menuItems: MenuItem[] = [
    {
        id: 1,
        title: "Documentation",
        links: [
            { href: "/docs/", text: "Getting started" },
            { href: "/docs/changelog", text: "Changelog" }
        ]
    },
    {
        id: 2,
        title: "Components",
        links: [
            { href: "../components", text: "See all" },
            { href: "../docs/cli", text: "CLI" }
        ]
    },
    {
        id: 3,
        title: "Discover",
        links: [
            { href: "/discover/featured", text: "Featured" },
            { href: "/discover/tips", text: "Tips" }
        ]
    },
    {
        id: 4,
        title: "Contact",
        links: [
            { href: "/#contact", text: "Feedback" },
            { href: "mailto:hello@egeuysal.com", text: "Support" }
        ]
    },
    {
        id: 5,
        title: "Links",
        links: [
            { href: "/#newsletter", text: "Newsletter" },
            { href: "https://github.com/astraui/astraui", text: "GitHub" },
        ]
    }
];

export default menuItems;