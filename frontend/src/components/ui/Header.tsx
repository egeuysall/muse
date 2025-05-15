"use client";

import Image from "next/image";
import Link from "next/link";
import {FC, useEffect, useState} from "react";
import {AnimatePresence, motion} from "motion/react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "./navigation-menu";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "./accordion";
import {Menu, X} from "lucide-react";
import menuItems from '@/lib/menuItems'

const Header: FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const date = new Date();
    const year = date.getFullYear();

    // Control body scroll when menu is open and detect scroll for border
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener('scroll', handleScroll);
        };
    }, [mobileMenuOpen]);

    return (
        <div className="fixed top-6 left-0 right-0 z-100 flex justify-center w-full ">
            <motion.div className="relative w-[90vw] md:w-[95vw]">
                <motion.header
                    className="backdrop-blur-sm bg-primary-200 py-3 px-2 rounded-lg flex justify-between relative z-10"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.2}}
                >
                    <Link href="/" className="flex gap-4 items-center">
                        <Image
                            width={24}
                            height={24}
                            className="ml-2 transition hover:opacity-75"
                            alt="Logo"
                            src="/logos/header-logo.svg"
                        />
                        <p className="font-bold hidden w-full md:flex text-primary-100">Muse</p>
                    </Link>
                    <NavigationMenu className="items-center justify-center">
                        <NavigationMenuList className="font-bold text-primary-100 flex">
                            {menuItems.map((item) => (
                                <NavigationMenuItem key={item.id} className="hidden md:flex">
                                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        {item.links.map((link) => (
                                            <NavigationMenuLink key={link.href} href={link.href}>
                                                {link.text}
                                            </NavigationMenuLink>
                                        ))}
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="flex md:hidden mr-2"
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileMenuOpen ? (
                                <X size="28" className="text-primary-100 "/>
                            ) : (
                                <Menu size="28" className="text-primary-100 "/>
                            )}
                        </button>
                    </NavigationMenu>
                </motion.header>
            </motion.div>

            {/* Mobile Menu with faster animations */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-primary-100  z-10 md:hidden flex flex-col"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.2}}
                    >
                        <div
                            className="flex justify-between items-center p-6 border-b border-primary-300">
                            <Link href="/" className="flex items-center">
                                <Image
                                    width={24}
                                    height={24}
                                    className="transition hover:opacity-75"
                                    alt="Logo"
                                    src="/logos/mobile-logo.svg"
                                    onClick={() => setMobileMenuOpen(false)}
                                />
                            </Link>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-black  flex items-center justify-center"
                                aria-label="Close menu"
                            >
                                <X size="28" className="text-primary-300"/>
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col justify-center items-center w-full px-4">
                            <div className="w-full">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full [&_h3]:w-full [&_button]:flex-row [&_button]:items-center [&_svg]:ml-1"
                                >
                                    {menuItems.map((item, i) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{duration: 0.2, delay: i * 0.03}}
                                            className="w-full"
                                        >
                                            <AccordionItem value={item.id}
                                                           className="border-b  border-primary-300 w-full">
                                                <AccordionTrigger
                                                    className="font-bold text-2lg text-primary-300  py-4 w-full text-center flex justify-center">
                                                    <div className="flex items-center justify-center">
                                                        {item.title}
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="text-center w-full">
                                                    <div className="flex flex-col items-center justify-center w-full">
                                                        {item.links.map((link, j) => (
                                                            <motion.div
                                                                key={link.href}
                                                                className="w-full text-center"
                                                                initial={{opacity: 0}}
                                                                animate={{opacity: 1}}
                                                                transition={{duration: 0.2, delay: j * 0.03}}
                                                            >
                                                                <Link
                                                                    href={link.href}
                                                                    className="py-3 inline-block text-primary-300 hover:opacity-75 duration-200 transition w-full"
                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                >
                                                                    {link.text}
                                                                </Link>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </motion.div>
                                    ))}
                                </Accordion>
                            </div>
                        </div>

                        <div
                            className="py-4 w-full text-center   border-t border-primary-300">
                            <p className="text-primary-300/50 w-full text-sm">&copy; {year} Muse</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Header;
