interface Tag {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    parentId: number;
    parent: Tag;
    children: Tag[];  
    attractions: Attraction[]; 
}

interface Attraction {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    description?: string;
    startTime: string;
    endTime: string;
    tags?: Tag[];
};

