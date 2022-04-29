// To unit-test the function that generates 'password.enc.txt', you should
//  make sure the unit test does the following check.
// 1. Make sure password.enc.txt does not exist before running the function.
// 2. Make sure password.enc.txt does exist after running the function.
// 3. Make sure the contents of password.enc.txt has correct contents.
// For unit tests, you don't have to have a large input in the beginning.
// Start with smallest input, and add more contents in the input

const p = require('../src/makepassword');
const u = require('../src/utility');
const fs = require('fs');

describe('Test makepassword.js', () => {
    test('test file should exist before running the test',() => {
        const fileName = './tests/passwordtest.txt'

        // 1. Make sure `filename` does exist before running the function.
        expect(fs.existsSync(fileName)).toBe(true)
    })

    test('makepassword() should create encrypted file',() => {
        const fileName = './tests/passwordtest.txt'
        const encFileName = './tests/passwordtest.enc.txt'

        // 1. Make sure password.enc.txt does not exist before running the function.
        expect(fs.existsSync(encFileName)).toBe(false)
        
        p.makepassword(fileName, encFileName)

        // 2. Make sure password.enc.txt does exist after running the function.
        expect(fs.existsSync(encFileName)).toBe(true)

        // 3. Make sure the contents of password.enc.txt has correct contents.

        // Delete after test
        if (fs.existsSync(encFileName)) fs.unlinkSync(encFileName);
    })

    test('encrypted file should have correct contents (valid format)',() => {
        const fileName = './tests/passwordtest.txt'
        const encFileName = './tests/passwordtest.enc.txt'

        // 1. Make sure password.enc.txt does not exist before running the function.
        expect(fs.existsSync(encFileName)).toBe(false)

        p.makepassword(fileName, encFileName)

        // 2. Make sure password.enc.txt does exist after running the function.
        expect(fs.existsSync(encFileName)).toBe(true)

        // 3. Make sure the contents of password.enc.txt has correct contents.
        const { readFile, hash, convertToUser } = u
        const userRecordsIn = convertToUser(readFile(fileName))
        const userRecordsOut = convertToUser(readFile(encFileName))

        // Make sure all records are parsed
        expect(userRecordsOut.length).toBe(userRecordsIn.length)

        // Make sure email:password is converted into email:hashPassword
        for (let index = 0; index < userRecordsIn.length; index++) {
            expect(userRecordsOut[index].email).toBe(userRecordsIn[index].email)
            expect(hash(userRecordsIn[index].password)).toBe(userRecordsOut[index].password)
        }

        // Delete encrypted file after test
        if (fs.existsSync(encFileName)) fs.unlinkSync(encFileName);
    })
})