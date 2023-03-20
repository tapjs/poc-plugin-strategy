import { TestBase } from '../test-base.js';
declare const greaterThan: (t: TestBase, { orEq }: {
    orEq?: {} | undefined;
}) => {
    orEq: {} | undefined;
    "__#2@#privateGT": string;
    "__#2@#privateInitialized": number;
    getPrivateGTs(): (string | number)[];
    greaterThan(a: number, b: number): void;
};
export default greaterThan;
//# sourceMappingURL=greater-than.d.ts.map