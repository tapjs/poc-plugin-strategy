const greaterThan = (t, { orEq }) => new (class GreaterThan {
    orEq = orEq;
    #privateGT;
    #privateInitialized = 123;
    constructor() {
        this.#privateGT = 'is greater than';
    }
    getPrivateGTs() {
        console.log('getting private GTs', this instanceof GreaterThan);
        return [this.#privateGT, this.#privateInitialized];
    }
    greaterThan(a, b) {
        return a <= b
            ? t.fail('expect to be greater than', this.greaterThan)
            : t.pass('expect to be greater than');
    }
})();
export default greaterThan;
//# sourceMappingURL=greater-than.js.map