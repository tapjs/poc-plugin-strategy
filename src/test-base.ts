export interface TestBaseOpts {
  blah?: boolean
}

export class TestBase {
  #privateThing: string = 'private thing'
  #testBaseConstructed: boolean = false
  getPrivateThing() {
    return this.#privateThing
  }
  publicThing: string = 'public thing'
  opts: TestBaseOpts
  constructor(opts: TestBaseOpts) {
    this.opts = opts
    if (this.#testBaseConstructed) return
    this.#testBaseConstructed = true
  }
  test(fn: (t: TestBase) => any) {
    fn(new TestBase(this.opts))
  }
  pass(msg: string) {
    console.log('ok - ' + msg)
  }
  fail(msg: string, fn: Function = this.fail) {
    const e = new Error('trace')
    type ECS = typeof Error & {
      captureStackTrace: (e: Error, fn: Function) => void
    }
    if (
      typeof (Error as ECS).captureStackTrace === 'function'
    )
      (Error as ECS).captureStackTrace(e, fn)
    const s = (e.stack || '')
      .split('\n')
      .filter(l => !/Proxy.<anonymous>/.test(l))
      .join('\n')
    console.log('not ok - ' + msg, s)
  }
}
