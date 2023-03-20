export interface TestBaseOpts {
    blah?: boolean;
}
export declare class TestBase {
    #private;
    getPrivateThing(): string;
    publicThing: string;
    opts: TestBaseOpts;
    constructor(opts: TestBaseOpts);
    test(fn: (t: TestBase) => any): void;
    pass(msg: string): void;
    fail(msg: string, fn?: Function): void;
}
//# sourceMappingURL=test-base.d.ts.map