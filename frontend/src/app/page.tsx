import React from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Home: React.FC = () => {
    return (
        <main className="flex flex-col gap-20">
            <section className="w-full flex flex-col gap-4">
                <h1>Capture ideas fast. Share freely. Stay inspired.</h1>
                <p>Muse is a fast, minimal platform for capturing spontaneous ideas, sharing thoughts, and discovering
                    inspiration. A creative space to fuel your next big idea.</p>
                <section className="flex flex-col md:flex-row w-full gap-2">
                    <Link href="/share" className="">
                        <Button className="btn w-full md:w-auto">Inspire others</Button>
                    </Link>
                    <Link href="/explore" className="">
                        <Button className="btn w-full md:w-auto">Capture ideas</Button>
                    </Link>
                </section>
                <Image alt="Product demo image" className="w-full rounded-lg hover:blur-xs transition duration-200"
                       width={1000} height={500}
                       src="/images/reveal.jpg"/>
            </section>
        </main>
    );
}

export default Home;