'use strict'
const fs = require('fs');
const {readFile, writeFile, hash} = require('./utility')

function makepassword(passwordFileName, passwordEncFileName) {
   const userRecords = readFile(passwordFileName)
    const hashedRecords = []
    userRecords.forEach(record => {
        const userRecord = record.split(":")
        hashedRecords.push(`${userRecord[0]}:${hash(userRecord[1])}`)
    })
    writeFile(hashedRecords, passwordEncFileName)
}

if (require.main === module) {
    makepassword('../password.txt', '../password.enc.txt')
}

module.exports = { makepassword };