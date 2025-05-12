export type MenuLink = {
    href: string;
    text: string;
}

export type MenuItem = {
    id: number;
    title: string;
    links: MenuLink[];
}