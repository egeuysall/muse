import React from 'react';

interface IdeaCardProps {
    title: string;
    description: string;
    categoryNames?: string[];  // Make optional to handle missing prop safely
    firstName: string;
    lastName: string;
    date: string;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({
                                                      title,
                                                      description,
                                                      categoryNames = [],  // Default to empty array
                                                      firstName,
                                                      lastName,
                                                      date,
                                                  }) => {
    return (
        <div className="bg-primary-200 p-4 rounded-lg flex flex-col gap-2 w-full">
            <strong><p className="text-primary-100">{title}</p></strong>
            <p className="opacity-50 text-sm text-primary-100">
                {firstName} {lastName} &#8226; {date}
            </p>
            <p className="text-primary-100">{description}</p>
            <div className="flex gap-2">
                {categoryNames.map((name) => (
                    <span
                        key={name}
                        className="text-primary-100 flex text-sm font-normal px-2 py-1 rounded-lg bg-primary-300"
                    >
                        {name}
                    </span>
                ))}
            </div>
        </div>
    );
};
