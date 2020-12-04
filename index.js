const fs = require('fs');

const re = new RegExp('\w');

function resolveInput(fileName) {
    const content = fs.readFileSync(fileName, 'utf8');
    return getPassports(content.split('\r\n\r\n'));
}

function getPassports(content) {
    const passports = [];

    content.forEach(data => {
        let passport = {};

        const splitData = data.split(/\s+/);
        splitData.forEach(kvp => {
            kvpSplit = kvp.split(':');
            key = kvpSplit[0];
            val = kvpSplit[1];
            passport[key] = val;
        })
        passports.push(passport);
    });

    return passports;
}

function countValidPassports(passports) {
    let count = 0;
    passports.forEach(passport => {
        console.log(passport);
        valid = true;
        reqFields.forEach(req => {
            if (valid) {
                valid = passport.hasOwnProperty(req);
            }
        });
        console.log("Valid=", valid);
        count = valid ? count + 1 : count;
    });
    return count;
}

const reqFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', /* 'cid' */];

console.log(countValidPassports(resolveInput('input.txt')));