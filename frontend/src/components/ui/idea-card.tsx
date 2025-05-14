import React from 'react';
import type {IdeaProps} from "@/types/shareTypes";

export const IdeaCard: React.FC<IdeaProps> = ({
                                                  title,
                                                  description,
                                                  category,
                                                  firstName,
                                                  lastName,
                                                  date,
                                              }) => {
    return (
        <div className="bg-primary-200 p-4 rounded-lg grid gap-2">
            <strong><p className="text-primary-100">{title}</p></strong>
            <p className="opacity-50 text-sm text-primary-100">{firstName} {lastName} &#8226; {date}</p>
            <p className="text-primary-100">{description}</p>
            <div>
                {category.map((category) => (
                    <span key={category}
                          className="text-primary-100 text-sm font-normal px-2 py-1 rounded-lg bg-primary-300 mr-2">
                        {category}
                </span>
                ))}
            </div>
        </div>
    );
}