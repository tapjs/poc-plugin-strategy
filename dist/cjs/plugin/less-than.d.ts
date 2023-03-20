import { TestBase, TestBaseOpts } from '../test-base.js';
interface LessThanOpts extends TestBaseOpts {
    orEq?: boolean;
}
declare const lessThan: (t: TestBase, opts: LessThanOpts) => {
    orEq: boolean;
    lessThan(a: number, b: number): void;
};
export default lessThan;
//# sourceMappingURL=less-than.d.ts.map