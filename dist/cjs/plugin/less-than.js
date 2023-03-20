"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lessThan = (t, opts) => new (class LessThan {
    orEq;
    constructor(opts) {
        this.orEq = !!opts.orEq;
    }
    lessThan(a, b) {
        return (this.orEq ? a > b : a >= b)
            ? t.fail('expect to be less than', this.lessThan)
            : t.pass('expect to be less than');
    }
})(opts);
exports.default = lessThan;
//# sourceMappingURL=less-than.js.map