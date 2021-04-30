class Category {
    
    private _id: string

    constructor(private _name: string){}

    get id() { return this._id }
    
    get name() { return this._name }
}