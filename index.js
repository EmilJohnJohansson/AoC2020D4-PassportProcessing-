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
        valid = true;
        console.log(passport);
        reqFields.forEach(req => {
            if (valid) {
                valid = passport.hasOwnProperty(req);
            }
        });
        if (valid) {
            console.log(valid)
            valid = validatePassport(passport);
            console.log(valid)
        }
        count = valid ? count + 1 : count;
    });
    return count;
}

function validatePassport(passport) {
    valid = true;

    if (valid) {
        valid = validateNumber(passport.byr, 1920, 2002);
        console.log("byr=", valid)
    }
    if (valid) {
        valid = validateNumber(passport.iyr, 2010, 2020);
        console.log("iyr=", valid)
    }
    if (valid) {
        valid = validateNumber(passport.eyr, 2020, 2030);
        console.log("eyr=", valid)
    }
    if (valid) {
        valid = validateHeight(passport.hgt);
        console.log("hgt=", valid)
    }
    if (valid) {
        valid = validateHairColour(passport.hcl);
        console.log("hcl=", valid)
    }
    if (valid) {
        valid = validateEyeColour(passport.ecl);
        console.log("ecl=", valid)
    }
    if (valid) {
        valid = validatePID(passport.pid);
        console.log("pid=", valid)
    }
    
    return valid;
}

function validateNumber(n, _min, _max) {
    return _min <= n && n <= _max;
}

function validateHeight(h) {
    let valid = true;
    const pMetric = h.slice(-2)
    if (pMetric === 'cm') {
        valid = validateNumber(parseInt(h.slice(0, h.length - 2)), 150, 193)
    } else if (pMetric === 'in') {
        valid = validateNumber(parseInt(h.slice(0, h.length - 2)), 59, 76)
    } else {
        valid = false;
    }
    return valid;
}

function validateHairColour(h) {
    const re = /^\#[a-f0-9]{6}$/
    return re.test(h);
}

function validateEyeColour(e) {
    return ['amb','blu','brn','gry','grn','hzl','oth'].includes(e);
}

function validatePID(p) {
    const re = /^\d{9}$/
    return re.test(p);
}

const reqFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', /* 'cid' */];


console.log(countValidPassports(resolveInput('input.txt')));