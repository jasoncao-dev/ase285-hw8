// Make tests when you have sub functions in this module.
// passwordjs() is tested by acceptance tests (acceptance.bat)
const { convertToUser } = require('../src/utility')

describe('Test password.js', () => {
    test('convertToUser() should convert and return an object with 2 properties email and password',() => {
        expect(convertToUser(['test@test.com:12345678'])[0]).toStrictEqual({ email: 'test@test.com', password: '12345678' })
    })
})
