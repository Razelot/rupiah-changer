import {
  expect
} from 'chai'
import {
  moneyChange
} from "@/assets/js/moneyChange.js"

// Rp2000 is included in this test
const denominations = [100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 100, 50]

const tests = [{
    amount: 15000,
    expBills: 2,
    expRemain: 0
  },
  {
    amount: 3900,
    expBills: 7,
    expRemain: 0
  },
  {
    amount: 12510,
    expBills: 3,
    expRemain: 10
  },
]

describe('moneyChange.js', () => {

  tests.forEach(test => {
    it(`Rp${test.amount} uses 2 bills with Rp${test.expRemain} remaining`, () => {
      const result = moneyChange(test.amount, denominations)

      expect(result.amount).to.equal('Rp' + test.amount)
      expect(result.remaining).to.equal('Rp' + test.expRemain)
      const totalBills = Object.values(result.used).reduce((a, b) => a + b)
      expect(totalBills).to.equal(test.expBills)
    })
  });

})