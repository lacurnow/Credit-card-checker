// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// The following functions take a card number array input and checks validity based on the Luhn algorithm.
const luhnAlgo = array => {
    let creditSum = 0;
    const checkDigit = array[array.length - 1];
    creditSum += checkDigit;

    for (let i = (array.length - 2); i >= 0; i -= 2) {
        const doubleDig = array[i] * 2;
        doubleDig > 9 ? creditSum += (doubleDig - 9) : creditSum += doubleDig;
    };

    for (let j = array.length - 3; j >= 0; j -= 2) {
        creditSum += array[j];
    };
    return creditSum;
};

const validateCred = array => {
    const creditSum = luhnAlgo(array);
    return creditSum % 10 == 0;
};

//Test:
//console.log(validateCred(valid2));

// The following function identifies invalid card number arrays from a nested array of card number arrays and returns
// a new nested array containing those invalid card number arrays.
const findInvalidCards = nestedArray => {
    const invalidCards = [];
    nestedArray.forEach(cardNumber => {
        const validityCheck = validateCred(cardNumber);
        if (!validityCheck) {
            invalidCards.push(cardNumber);
        }
    });
    return invalidCards;
};

//Test:
//console.log(findInvalidCards(batch));


// The following function takes in a nested array of card number arrays and returns an array containing the names of 
// credit card companies that have issued at least one card number in the card number array. 
const idInvalidCardCompanies = nestedArray => {
    const companyArray = [];
    nestedArray.forEach(arrayElement => {
        const initialDigit = arrayElement[0];
        switch (initialDigit) {
            case 3:
                if(!companyArray.includes('Amex (American Express)')) {
                    companyArray.push('Amex (American Express)');
                };
                break;
            case 4:
                if(!companyArray.includes('Visa')) {
                    companyArray.push('Visa');
                };
                break;
            case 5:
                if(!companyArray.includes('Mastercard')) {
                    companyArray.push('Mastercard');
                };
                break;
            case 6:
                if (!companyArray.includes('Discover')) {
                    companyArray.push('Discover');
                };
                break;
            default:
                return "Company not found";

        }
    })
    return companyArray;
};

//Test:
//console.log(idInvalidCardCompanies(findInvalidCards(batch)));

// The following function takes in a card number of string type and converts it into array cotaining
// each number of the card number.
const cardStringtoNumber = cardString => {
    const cardArray = [];
    for (let i = 0; i < cardString.length; i++) {
        cardArray.push(parseInt(cardString[i]));
    }
    return cardArray;
};

//Test:
//const visa1 = '4485160820175980';
//console.log(cardStringtoNumber(visa1));

const validityConverter = invalidNumber => {
    const invalidCheckDig = invalidNumber[invalidNumber.length - 1];
    const invalidSum = luhnAlgo(invalidNumber);
    const remainder = invalidSum % 10;
    invalidNumber.pop();

    if (invalidCheckDig < remainder) {
        const newCheckDig = invalidCheckDig + (10 - remainder);
        invalidNumber.push(newCheckDig);
    } else {
        const newCheckDig = invalidCheckDig - remainder;
        invalidNumber.push(newCheckDig);
    };
    return invalidNumber;
};


/* Test:
console.log(validateCred(invalid1));

validityConverter(invalid1);

console.log(validateCred(invalid1));
*/