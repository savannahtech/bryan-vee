module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                diagnostics: false,
            },
        ],
    },
    setupFilesAfterEnv: ['./jest.setup.ts'],
};
