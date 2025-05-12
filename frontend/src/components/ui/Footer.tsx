import React from 'react';
import Link from "next/link";
import {Github, Globe, Mail} from "lucide-react";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-primary-200 rounded-lg py-8 px-6 mt-auto">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex flex-col gap-2">
                        <h6 className="footer-text font-bold">
                            Muse
                        </h6>

                        <p className="footer-text w-full">
                            Discover. Create. Inspire.
                        </p>

                        <p className="footer-text">
                            &copy; {currentYear} Muse
                        </p>
                    </div>

                    <div>
                        <h6 className="footer-text font-bold">
                            Resources
                        </h6>

                        <nav className="mt-3">
                            <ul className="flex flex-col gap-2">
                                <li>
                                    <Link href="/docs/terms-of-service.pdf" className="footer-text">
                                        Terms of service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs/getting-started" className="footer-text">
                                        Documentation
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs/privacy-policy.pdf" className="footer-text">
                                        Privacy policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="mailto:hello@egeuysal.com" className="footer-text">
                                        Contact us
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div>
                        <h6 className="footer-text font-bold">
                            Connect
                        </h6>

                        <address className="mt-4 not-italic">
                            <div className="flex items-center h-full gap-4">
                                <Link
                                    href="https://www.muse.egeuysal.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Website"
                                >
                                    <Globe size="24" className="text-primary-100"/>
                                </Link>
                                <Link
                                    href="https://github.com/egeuysall/muse"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                >
                                    <Github size="24" className="text-primary-100"/>
                                </Link>
                                <Link
                                    href="mailto:hello@egeuysal.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Email"
                                >
                                    <Mail size="24" className="text-primary-100"/>
                                </Link>
                            </div>
                        </address>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;