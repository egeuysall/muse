"use client";

import React, {useCallback, useState} from 'react';
import {Button} from '@/components/ui/button';
import {IdeaCard} from '@/components/ui/idea-card';
import {IdeaProps} from '@/types/shareTypes';

const Explore: React.FC = () => {

    const [ideas, setIdeas] = useState<IdeaProps[]>([]);

    const handleFetch = useCallback(async () => {
        try {
            const res = await fetch('/api/share');
            const data = await res.json();
            setIdeas(data);

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (err) {
            console.error('Error fetching ideas:', err);
        }
    }, [])

    return (
        <main className="w-full flex flex-col gap-4">
            <h2>Explore ideas from the community.</h2>
            <Button className="btn" onClick={handleFetch}>Get inspired</Button>
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {ideas.map((idea) => {
                    return <IdeaCard {...idea} key={idea.id}/>
                })}
            </section>
        </main>

    );
}

export default Explore;