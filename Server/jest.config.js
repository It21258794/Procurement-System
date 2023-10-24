"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    automock: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,jsx}",
        "src/**/*.{ts,tsx}",
        "!vendor/**/*.{js,jsx}",
        "!**/node_modules/**"
    ],
    coverageProvider: "babel",
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    maxConcurrency: 5,
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
};
exports.default = config;
