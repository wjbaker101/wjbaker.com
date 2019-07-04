const assert = require('assert');

const titleParser = require('../../../backend/parse/TitleParser.js');

describe('TitleParser', () => {
    describe('.getTitleURL()', () => {
        const testCases = [
            {
                testValue: 'My Title To Be PARSED!',
                expectedValue: 'my-title-to-be-parsed',
            },
            {
                testValue: '123 my TITLE',
                expectedValue: '123-my-title',
            },
            {
                testValue: '!!----!!',
                expectedValue: '',
            },
        ];

        testCases.forEach(testCase => {
            it(`should return "${testCase.expectedValue}" when "${testCase.testValue}" is passed`, () => {
                assert.strictEqual(titleParser.getTitleURL(testCase.testValue), testCase.expectedValue);
            });
        });
    });
});