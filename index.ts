export class Zipper<a> {
    /* Takes a head and a list and makes a Zipper with known boundaries
    */
    public static fromCons<a>(head: a, tail: a[]): Zipper<a> {
        return new Zipper(
            [],
            head,
            tail,
        );
    }

    private _previous: a[];
    private _current: a;
    private _after: a[];

    constructor(before: a[], current: a, after: a[]) {
        this._previous = before;
        this._current = current;
        this._after = after;
    }

    public current(): a {
        return this._current;
    }

    /* Move back one in the zipper if possible. If not, do nothing
    */
    public previous(): void {
        if (this._previous.length === 0) { return; }

        const lastCurrent = this._current;

        const nextCurrent = this._previous.pop();
        this._after.unshift(lastCurrent);
        this._current = nextCurrent;
    }

    /* Move forward one in the zipper if possible. If not, do nothing
    */
    public next(): void {
        if (this._after.length === 0) { return; }

        const lastCurrent = this._current;

        const nextCurrent = this._after.shift();
        this._previous.push(lastCurrent);
        this._current = nextCurrent;
    }

    /* Move to first element
    */
    public first(): void {
        if (this._previous.length === 0) { return; }

        const lastCurrent = this._current;

        const nextCurrent = this._previous.shift();
        this._previous.push(lastCurrent);
    }

    /* Move to last element
    */
    public last(): void {
        if (this._after.length === 0) { return; }

        const lastCurrent = this._current;

        const nextCurrent = this._after.pop();
        this._after.unshift(lastCurrent);
    }

    /* Map all elements
    */
    public map<b>(fn: (element: a, index: number, array: a[]) => b): Zipper<b> {
        return new Zipper(
            this._previous.map(fn),
            fn(this._current, 0, []),
            this._after.map(fn),
        );
    }

    /* Get the size of the zipper
    */
    public size(): number {
        return this._previous.length + 1 + this._after.length;
    }

    public toArray(): a[] {
        return [].concat(this._previous, [this._current], this._after);
    }
}
