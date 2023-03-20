import { TestBase, TestBaseOpts } from './test-base.js';
type SecondParam<T extends [any] | [any, any], Fallback extends unknown = unknown> = T extends [any, any] ? T[1] : Fallback;
import plugin0 from "./plugin/greater-than.js";
import plugin1 from "./plugin/less-than.js";
type Plugin0Opts = SecondParam<Parameters<typeof plugin0>, TestBaseOpts>;
type Plugin1Opts = SecondParam<Parameters<typeof plugin1>, TestBaseOpts>;
type TestOpts = TestBaseOpts & Plugin0Opts & Plugin1Opts;
type TTest = TestBase & ReturnType<typeof plugin0> & ReturnType<typeof plugin1>;
export interface Test extends Omit<TTest, 'test'> {
    test(fn: (t: Test) => any): void;
}
export declare class Test extends TestBase {
    constructor(opts: TestOpts);
}
export {};
//# sourceMappingURL=test.d.ts.map