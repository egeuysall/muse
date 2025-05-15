'use client';

import React, {useCallback, useState} from 'react';
import {Button} from '@/components/ui/button';
import {defaultCategories} from '@/lib/shareData';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/text-area';
import {JellyTriangle} from "ldrs/react";

const Share: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const toggleCategory = (id: string) => {
        setActiveCategories((prev) =>
            prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
        );
    };

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            const formData = {
                firstName,
                lastName,
                title,
                description,
                category: activeCategories,
            };

            try {
                const res = await fetch('https://museapi.egeuysal.com/share', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify(formData),
                });

                let data;
                try {
                    data = await res.json();
                } catch {
                    data = null;
                }

                if (!res.ok) {
                    throw new Error(data?.message || 'Something went wrong');
                }

                setSubmitted(true);
            } catch (err) {
                console.error('Error submitting idea:', err);
            }
        },
        [firstName, lastName, title, description, activeCategories, apiKey]
    );

    return submitted ? (
        <main
            className="w-full h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center gap-6">
            <JellyTriangle size="40" speed="0.9" color="#800F2F"/>
            <h2>You just inspired the community!</h2>
            <p>Thank you for sharing! Reload the page to submit another idea and keep the inspiration flowing.</p>
        </main>
    ) : (
        <main className="flex flex-col gap-20">
            <form onSubmit={handleSubmit}>
                <section className="w-full flex flex-col gap-4">
                    <h2>Share your ideas with the world.</h2>
                    <p>
                        Share your best ideas with the community by submitting a title, description, and category to
                        inspire others and spark creativity.
                    </p>

                    <section className="grid gap-4 md:grid-cols-2">
                        <Input
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <Input
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </section>
                    <Input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <Textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <section className="flex flex-col gap-2">
                        <p className="font-bold">Select categories</p>
                        <div className="flex overflow-x-auto gap-2">
                            {defaultCategories.map(({id, name}) => (
                                <Button
                                    key={id}
                                    type="button"
                                    onClick={() => toggleCategory(id)}
                                    className={`${
                                        activeCategories.includes(id) ? 'bg-primary-200' : 'bg-primary-200 opacity-50'
                                    } text-primary-100 text-sm font-normal px-2 py-1 rounded-lg transition duration-200`}
                                >
                                    {name}
                                </Button>
                            ))}
                        </div>
                    </section>
                    <Button type="submit" className="btn">
                        Spark
                    </Button>
                </section>
            </form>
        </main>
    );
};

export default Share;