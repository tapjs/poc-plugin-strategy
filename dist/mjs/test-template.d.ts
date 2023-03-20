import { TestBase, TestBaseOpts } from './test-base.js';
type TestOpts = TestBaseOpts;
type TTest = TestBase;
export interface Test extends Omit<TTest, 'test'> {
    test(fn: (t: Test) => any): void;
}
export declare class Test extends TestBase {
    constructor(opts: TestOpts);
}
export {};
//# sourceMappingURL=test-template.d.ts.map