// Global CSS
import '@/styles/globals.css';

// External Libraries
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Fonts
import { openSans, jetBrainsMono } from '@/lib/fonts';

// Internal Components
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
import LayoutWrapper from '@/components/LayoutWrapper';

async function getProduct() {
    return {
        name: "Astra UI: Design faster, build smarter, shine brighter.",
        image: "/og-links.jpg",
        description:
            "Astra UI is an open-source UI library for Next.js, offering accessible, production-ready components to power your next project with ease. Try it today!",
    };
}

export async function generateMetadata(): Promise<Metadata> {
    // Fetch data needed for metadata
    const product = await getProduct();

    return {
        title: {
            default: product.name,
            template: "%s | Astra UI",
        },
        description: product.description,
        metadataBase: new URL("https://www.astraui.me/"),
        authors: [{ name: "Ege Uysal" }],
        keywords: ["React UI library", "React component library", "Astra UI components", "Astra UI React", "React design system", "UI components for React", "Astra UI kit", "React UI toolkit", "modern React components", "lightweight React UI library"],
        openGraph: {
            title: product.name,
            description: product.description,
            url: "https://www.astraui.me/",
            images: [
                {
                    url: product.image,
                    width: 1200,
                    height: 630,
                    alt: "Astra UI Logo",
                },
            ],
            type: "website",
            locale: "en_US",
            siteName: product.name,
        },
        twitter: {
            card: "summary_large_image",
            site: "@astraui",
            title: product.name,
            description: product.description,
            images: [product.image],
            creator: "@astraui",
        },
        icons: {
            icon: [
                { url: "/icon.ico", sizes: "any" },
                { url: "/icon.png", type: "image/png" },
            ],
            apple: "/apple-touch-icon.png",
            shortcut: "/icon.ico",
        },
        manifest: "/manifest.json",
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: "https://www.astraui.me/",
        },
        applicationName: "Astra UI",
        appleWebApp: {
            capable: true,
            statusBarStyle: "black-translucent",
        },
        other: {
            appleMobileWebAppCapable: "yes",
        },
    };
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const product = await getProduct();

    // Define date for product schema
    const priceValidUntilDate = new Date();
    priceValidUntilDate.setFullYear(priceValidUntilDate.getFullYear() + 1);
    const priceValidUntilString = priceValidUntilDate.toISOString().split('T')[0];

    // Format current date for schema (ISO format)
    const currentDate = new Date().toISOString();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": `https://www.astraui.me${product.image}`,
        "description": product.description,
        "url": "https://www.astraui.me/",
        "dateModified": currentDate,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://www.astraui.me/",
            "priceValidUntil": priceValidUntilString,
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "USD"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": "0",
                        "maxValue": "0",
                        "unitCode": "HUR"
                    }
                },
                "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "US"
                }
            },
            "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "US",
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                "merchantReturnDays": 30,
                "returnMethod": "https://schema.org/ReturnByMail",
                "returnFees": "https://schema.org/FreeReturn"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127"
        },
        "sameAs": [
            "https://twitter.com/egecreates",
            "https://www.linkedin.com/in/egeuysal",
            "https://www.instagram.com/egeuysalo"
        ]
    };

    return (
        <html
            lang="en"
            dir="ltr"
            suppressHydrationWarning
            className={`${openSans.variable} ${jetBrainsMono.variable} pb-18`}
        >
        <head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </head>
        <body className="w-full h-full flex-center">
        <LayoutWrapper jsonLdData={jsonLd}>
            <main className="w-[90vw] md:w-[92.5vw] lg:w-[95vw]">
                <div className="mb-32">
                    <Header />
                </div>
                <Analytics />
                {children}
                <SpeedInsights />
                <aside className="w-full flex-center mt-24">
                    <Footer />
                </aside>
            </main>
        </LayoutWrapper>
        </body>
        </html>
    );
}