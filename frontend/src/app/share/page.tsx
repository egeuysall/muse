'use client';

import React, {useCallback, useState} from 'react';
import {Button} from '@/components/ui/button';
import {defaultCategories} from '@/lib/shareData';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/text-area';

const Share: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const toggleCategory = (id: string) => {
        setActiveCategories((prev) =>
            prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
        );
    };

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Form submitted");

        const formData = {
            firstName,
            lastName,
            title,
            description,
            category: activeCategories,
        };

        try {
            const res = await fetch('https://www.museapi.egeuysal.com/share', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${apiKey}`,
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

        } catch (err) {
            console.error('Error submitting idea:', err);
        }
    }, [firstName, lastName, title, description, activeCategories, apiKey]);

    return (
        <main className="flex flex-col gap-20">
            <form onSubmit={handleSubmit}>
                <section className="w-full flex flex-col gap-4">
                    <h2>Share your ideas with the world.</h2>
                    <p>Share your best ideas with the community by submitting a title, description, and category to
                        inspire others and spark creativity.</p>

                    <section className="grid gap-4 md:grid-cols-2">
                        <Input
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </section>
                    <Input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                                        activeCategories.includes(id)
                                            ? 'bg-primary-200'
                                            : 'bg-primary-200 opacity-50'
                                    } text-primary-100 text-sm font-normal px-2 py-1 rounded-lg transition duration-200`}
                                >
                                    {name}
                                </Button>
                            ))}
                        </div>
                    </section>
                    <Button type="submit" className="btn">Spark</Button>
                </section>
            </form>
        </main>
    );
};

export default Share;