export type CategoryType = {
    id: string;
    name: string;
    segment: string;
};

export type IdeaProps = {
    title: string;
    description: string;
    categories: string[];
    firstName: string;
    lastName: string;
    date: string;
    id?: number;
}