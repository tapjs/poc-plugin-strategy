import { Test } from '../'
const t = new Test({})

console.log('ctor name', t.constructor.name)
console.log('ctor toString()', t.constructor.toString())
console.log('instanceof Test', t instanceof Test)

console.log('keys', Object.keys(t))
console.log(
  'has isEq',
  Object.prototype.hasOwnProperty.call(t, 'orEq')
)
console.log('isEq', t.orEq)

t.lessThan(0, 1)
console.log(t.lessThan.toString())
console.log(t.getPrivateThing())

t.test(t => {
  t.lessThan(1, 2)
  console.log(t.getPrivateGTs())
  t.test(t => {
    t.greaterThan(1, 2)
    console.log(t.getPrivateThing.toString())
    console.log(t.getPrivateThing())
  })
})
