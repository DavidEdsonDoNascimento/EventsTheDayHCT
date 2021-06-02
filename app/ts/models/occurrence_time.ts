class Time{
    
    private _id: string;
    private _createdAt: string;

    constructor(private _start: string, 
        private _end:string, 
        private _status:boolean)
    {

    }
    get id() { return this._id; }
    get start() { return this._start; }
    get end() { return this._end; }
    get status() { return this._status; }
    get createdAt() { return this._createdAt; }
    
}