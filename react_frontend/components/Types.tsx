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

export class Attraction {
    public id: number = -1;

    private _createdAt: Date = new Date();
    public get createdAt(): Date {
        return this._createdAt;
    }
    public set createdAt(value: string | Date) {
        if (typeof value === "string") {
            this._createdAt = new Date(value);
        }
        else {
            this._createdAt = value;
        }
    }

    private _updatedAt: Date = new Date();
    public get updatedAt(): Date {
        return this._updatedAt;
    }
    public set updatedAt(value: string | Date) {
        if (typeof value === "string") {
            this._updatedAt = new Date(value);
        }
        else {
            this._updatedAt = value;
        }
    }

    public name: string = "";    
    public description?: string;

    private _startTime: Date = new Date();
    public get startTime(): Date {
        return this._startTime;
    }
    public set startTime(value: string | Date) {
        if (typeof value === "string") {
            this._startTime = new Date(value);
        }
        else {
            this._startTime = value;
        }
    }
   
    private _endTime: Date = new Date();
    public get endTime(): Date {
        return this._endTime;
    }
    public set endTime(value: string | Date) {
        if (typeof value === "string") {
            this._endTime = new Date(value);
        }
        else {
            this._endTime = value;
        }
    }


    public tags?: Tag[];
};

