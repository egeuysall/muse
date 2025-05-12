import React from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Home: React.FC = () => {
    return (
        <main className="flex flex-col gap-20">
            <section className="w-full flex flex-col gap-4">
                <h1>Capture ideas fast. Share freely. Stay inspired.</h1>
                <p>Muse is a fast, minimal platform for capturing spontaneous ideas, sharing thoughts, and discovering
                    inspiration. A creative space to fuel your next big idea.</p>
                <section className="flex flex-col md:flex-row w-full gap-2">
                    <Link href="/share" className="">
                        <Button className="btn w-full md:w-auto">Share your thoughts</Button>
                    </Link>
                    <Link href="/capture" className="w-full">
                        <Button className="btn w-full md:w-auto">Capture ideas</Button>
                    </Link>
                </section>
            </section>
        </main>
    );
}

export default Home;