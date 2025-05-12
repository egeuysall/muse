export type MenuLink = {
    href: string;
    text: string;
}

export type MenuItem = {
    id: string;
    title: string;
    links: MenuLink[];
}