import { TestBase, TestBaseOpts } from '../test-base.js'
interface LessThanOpts extends TestBaseOpts {
  orEq?: boolean
}
const lessThan = (t: TestBase, opts: LessThanOpts) =>
  new (class LessThan {
    orEq: boolean
    constructor(opts: LessThanOpts) {
      this.orEq = !!opts.orEq
    }
    lessThan(a: number, b: number) {
      return (this.orEq ? a > b : a >= b)
        ? t.fail('expect to be less than', this.lessThan)
        : t.pass('expect to be less than')
    }
  })(opts)
export default lessThan
