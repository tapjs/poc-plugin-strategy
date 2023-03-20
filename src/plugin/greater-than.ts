import { TestBase } from '../test-base.js'
const greaterThan = (
  t: TestBase,
  { orEq }: { orEq?: {} }
) =>
  new (class GreaterThan {
    orEq = orEq
    #privateGT: string
    #privateInitialized: number = 123
    constructor() {
      this.#privateGT = 'is greater than'
    }
    getPrivateGTs() {
      console.log(
        'getting private GTs',
        this instanceof GreaterThan
      )
      return [this.#privateGT, this.#privateInitialized]
    }
    greaterThan(a: number, b: number) {
      return a <= b
        ? t.fail(
            'expect to be greater than',
            this.greaterThan
          )
        : t.pass('expect to be greater than')
    }
  })()
export default greaterThan
