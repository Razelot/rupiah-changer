import {
    expect
} from 'chai'
import {
    validRupiah
}
from "@/assets/js/validRupiah.js"

const validInputs = [{
        string: '18.215',
        isValid: true,
        value: 18215
    },
    {
        string: '18.215',
        value: 18215
    },
    {
        string: 'Rp17500',
        value: 17500
    },
    {
        string: 'Rp17.500,00',
        value: 17500
    },
    {
        string: 'Rp 120.325',
        value: 120325
    },
]

const invalidInputs = ['17,500', '2 500', '3000 Rp'];

describe('validRupiah.js', () => {
    describe('testing valid inputs', function () {
        validInputs.forEach(test => {
            it(`'${test.string}' is accepted with value of ${test.value}`, () => {
                const result = validRupiah(test.string)

                expect(result.isValid).to.equal(true)
                expect(result.value).to.equal(test.value)
            })
        })
    })
    describe('testing invalid inputs', function () {
        invalidInputs.forEach(test => {
            it(`'${test}' is rejected`, () => {
                const result = validRupiah(test)
                expect(result.isValid).to.equal(false)
            })
        })
    })

})