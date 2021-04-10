export class Category
{
    constructor(private _name: string){
        this._name = _name;
    }

    get name(){
        return this._name;
    }
}