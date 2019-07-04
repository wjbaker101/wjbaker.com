const assert = require('assert');

const dtoValidator = require('../../../backend/validator/DTOValidator.js');

describe('DTOValidator', () => {
    describe('.isValidDTO()', () => {
        const postitiveTestCases = [
            {
                testValue: { a: 1, b: 2, c: 3, },
                expectedProperties: ['a', 'b' ],
                expectedValue: { a: 1, b: 2, },
            },
            {
                testValue: { a: 1, b: 2, c: 3, },
                expectedProperties: ['a', 'b', 'c' ],
                expectedValue: { a: 1, b: 2, c: 3, },
            },
        ];

        const negativeTestCases = [
            {
                testValue: { a: 1, b: 2, c: 3, },
                expectedProperties: ['a', 'b', 'd', ],
                expectedValue: ['d'],
            },
            {
                testValue: { a: 1, b: 2, c: 3, },
                expectedProperties: ['d', 'e', 'f', ],
                expectedValue: ['d', 'e', 'f', ],
            },
        ];

        postitiveTestCases.forEach(testCase => {
            it(`should return ${JSON.stringify(testCase.expectedValue)} when ${JSON.stringify(testCase.expectedProperties)} is expected from ${JSON.stringify(testCase.testValue)}`, () => {
                assert.deepStrictEqual(dtoValidator.isValidDTO(testCase.testValue, testCase.expectedProperties), testCase.expectedValue);
            });
        });

        negativeTestCases.forEach(testCase => {
            it(`should fail with missing properties ${JSON.stringify(testCase.expectedValue)} when ${JSON.stringify(testCase.expectedProperties)} is expected from ${JSON.stringify(testCase.testValue)}`, () => {
                const result = dtoValidator.isValidDTO(testCase.testValue, testCase.expectedProperties);
                assert.deepStrictEqual(result.message.split(','), testCase.expectedValue);
            });
        });
    });
});