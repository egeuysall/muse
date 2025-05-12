import type {MenuItem} from "@/types/menu"

const menuItems: MenuItem[] = [
    {
        id: "1",
        title: "Ideas",
        links: [
            {href: "/explore", text: "Explore"},
            {href: "/share", text: "Share"}
        ]
    },
    {
        id: "2",
        title: "Documentation",
        links: [
            {href: "/getting-started", text: "Getting Started"},
        ]
    },
    {
        id: "3",
        title: "Links",
        links: [
            {href: "mailto:hello@egeuysal.com", text: "Email"},
            {href: "https://github.com/egeuysall/muse", text: "GitHub"}
        ]
    }
];

export default menuItems;