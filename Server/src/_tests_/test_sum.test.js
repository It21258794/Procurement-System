"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sum = jest.requireActual('../controller/account.controller').sum;
var successCases = [
    {
        id: 0,
        input: { a: 1, b: 1 },
        output: 2
    },
    {
        id: 1,
        input: { a: 2, b: 3 },
        output: 5
    },
    {
        id: 2,
        input: { a: 3, b: 4 },
        output: 7
    }, {
        id: 3,
        input: { a: 4, b: 5 },
        output: 9
    },
    {
        id: 4,
        input: { a: 5, b: 12 },
        output: 17
    }
];
describe("Test sum function", function () {
    it.each(successCases)('success case $id', function (_a) {
        var input = _a.input, output = _a.output;
        var a = input.a, b = input.b;
        expect(sum(a, b)).toBe(output);
    });
});
