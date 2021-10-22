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
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description?: string;
    startTime?: Date;
    endTime?: Date;
    tags?: Tag[];
};

