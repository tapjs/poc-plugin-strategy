"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestBase = void 0;
class TestBase {
    #privateThing = 'private thing';
    #testBaseConstructed = false;
    getPrivateThing() {
        return this.#privateThing;
    }
    publicThing = 'public thing';
    opts;
    constructor(opts) {
        this.opts = opts;
        if (this.#testBaseConstructed)
            return;
        this.#testBaseConstructed = true;
    }
    test(fn) {
        fn(new TestBase(this.opts));
    }
    pass(msg) {
        console.log('ok - ' + msg);
    }
    fail(msg, fn = this.fail) {
        const e = new Error('trace');
        if (typeof Error.captureStackTrace === 'function')
            Error.captureStackTrace(e, fn);
        const s = (e.stack || '')
            .split('\n')
            .filter(l => !/Proxy.<anonymous>/.test(l))
            .join('\n');
        console.log('not ok - ' + msg, s);
    }
}
exports.TestBase = TestBase;
//# sourceMappingURL=test-base.js.map