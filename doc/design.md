# Software Design and Diagrams

### Github repository 
https://github.com/jasoncao-dev/ase285-hw8

### Input and Output Description

The program accepts an input from a file containing data separated line-by-line. Each record follows the format `<email>`:`<password>`(separated by `:`). It creates an encrypted file with all records from input. Each record from encrypted file follows the format `<email>`:`<hashpassword>`(separated by `:`). Password will be hashed before being stored to the encrypted file for security purposes.

### Data flow

The program accepts a `filename` as an input. It first checks to see if the given `filename`does exist. If no, it throws an error indicating that the file cannot be found. If yes, it will read all the data in the file, split them line-by-line and return as an array. Then the program loops for each record in the returned array. For each record, it splits into 2 parts: email and password. Password will then be hashed first before being pushed into hashedUserRecords array following the format `<email>`:`<hashedPassword>`. The content of hashedUserRecords will then be written into an encrypted file.

To check if a given email and password is correct, the program first obtains given inputs, then reads all user records from the encrypted file. It converts the return data array into an array of objects storing user records following the format `[{ email: 'email', password: 'password' }]`. Then it loops through all records and find if entered email is stored in user records. If not, it will return false. If yes, it will hash the entered password and compare to the hashed password stored in the encrypted file, then return `true` if they match, `false` otherwise. 