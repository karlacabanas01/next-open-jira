module.exports = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], //agrega asert 
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
	moduleNameMapper: {
		'\\.(scss|sass|css)$': 'identity-obj-proxy', //Puede salir error, se debe instalar la libreria
		'^.+\\.svg$': 'jest-svg-transformer',
		'^@/atoms/(.*)$': '<rootDir>/src/components/atoms/$1',
		'^@/molecules/(.*)$': '<rootDir>/src/components/molecules/$1',
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	moduleDirectories: ['node_modules', 'src'],
	transform: { //Ocupa un plugging de babel
		'^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
	},
	transformIgnorePatterns: ['/node_modules/(?!@blue-express)/(.*)'],
	testEnvironment: 'jest-environment-jsdom',
	collectCoverageFrom: [
		'components/ui/**/*.{tsx,ts}',//Cualquier sub carpeta o cualquier archivo que termine en tsx o ts
		'src/**/*.{tsx,ts}',
		'!src/{components,contexts}/**/{index,types}.{tsx,ts}',
		'!src/mocks/**/*',
		'!src/models/**/*',

	],
	coverageThreshold: { 
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80
		}
	}
};