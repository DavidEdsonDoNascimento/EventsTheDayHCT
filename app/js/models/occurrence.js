class Occurrence {
    constructor(_summary, _obs, _category_id, _category_name) {
        this._summary = _summary;
        this._obs = _obs;
        this._category_id = _category_id;
        this._category_name = _category_name;
    }
    get id() { return this._id; }
    get summary() { return this._summary; }
    get obs() { return this._obs; }
    get category_id() { return this._category_id; }
    get category_name() { return this._category_name; }
}
