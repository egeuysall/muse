"use client";

import React, {useCallback, useState} from "react";
import {Button} from "@/components/ui/button";
import {IdeaCard} from "@/components/ui/idea-card";
import {IdeaProps, RawIdea} from "@/types/shareTypes";
import {defaultCategories} from "@/lib/shareData";
import {JellyTriangle} from "ldrs/react";
import "ldrs/react/JellyTriangle.css";

const Explore: React.FC = () => {
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const [ideas, setIdeas] = useState<IdeaProps[]>([]);
    const [loading, setLoading] = useState(false);

    const toggleCategory = (id: string) => {
        setActiveCategories((prev) =>
            prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
        );
    };

    const transformData = (data: RawIdea[]): IdeaProps[] =>
        data.map((idea) => ({
            id: idea.id,
            title: idea.title,
            description: idea.description,
            category: Array.isArray(idea.category) ? idea.category : [idea.category],
            firstName: idea.first_name,
            lastName: idea.last_name,
            date: idea.date,
        }));

    const extractErrorMessage = (data: unknown): string => {
        if (
            typeof data === "object" &&
            data !== null &&
            "message" in data &&
            typeof (data as { message: unknown }).message === "string"
        ) {
            return (data as { message: string }).message;
        }
        return "Something went wrong";
    };

    const handleFetch = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("https://www.museapi.egeuysal.com/share");
            const data: RawIdea[] | unknown = await res.json();

            if (!res.ok) {
                throw new Error(extractErrorMessage(data));
            }

            const transformed = transformData(data as RawIdea[]);

            if (activeCategories.length > 0) {
                setIdeas(
                    transformed.filter((idea) =>
                        idea.category.some((cat) => activeCategories.includes(cat))
                    )
                );
            } else {
                setIdeas(transformed);
            }
        } catch (err) {
            console.error("Error fetching ideas:", err);
        } finally {
            setLoading(false);
        }
    }, [activeCategories]);

    const handleRandom = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("https://www.museapi.egeuysal.com/share");
            const data: RawIdea[] | unknown = await res.json();

            if (!res.ok) {
                throw new Error(extractErrorMessage(data));
            }

            const transformed = transformData(data as RawIdea[]);

            const randomIdea = transformed[Math.floor(Math.random() * transformed.length)];
            setIdeas(randomIdea ? [randomIdea] : []);
        } catch (err) {
            console.error("Error fetching random idea:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <>
            {loading ? (
                <main
                    className="w-full h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center gap-6">
                    <JellyTriangle size="40" speed="0.9" color="#800F2F"/>
                    <p>Gathering sparks of inspiration...</p>
                </main>
            ) : (
                <main className="w-full flex flex-col gap-4">
                    <h2>Explore ideas from the community.</h2>
                    <section className="flex flex-col gap-4">
                        <p>
                            Discover community-shared ideas by selecting categories and getting inspired with curated
                            content,
                            tailored to your interests and creativity.
                        </p>
                        <p className="font-bold">Select categories</p>
                        <div className="flex overflow-x-auto gap-2">
                            {defaultCategories.map(({id, name}) => (
                                <Button
                                    key={id}
                                    type="button"
                                    onClick={() => toggleCategory(id)}
                                    className={`${
                                        activeCategories.includes(id) ? "bg-primary-200" : "bg-primary-200 opacity-50"
                                    } text-primary-100 text-sm font-normal px-2 py-1 rounded-lg transition duration-200`}
                                >
                                    {name}
                                </Button>
                            ))}
                        </div>
                    </section>
                    <section className="w-full grid md:grid-cols-4 gap-4">
                        <Button className="btn md:col-span-3" onClick={handleFetch}>
                            Get inspired
                        </Button>
                        <Button className="btn" onClick={handleRandom}>
                            Random
                        </Button>
                    </section>
                    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {ideas.map((idea) => (
                            <IdeaCard {...idea} key={idea.id}/>
                        ))}
                    </section>
                </main>
            )}
        </>
    );
};

export default Explore;