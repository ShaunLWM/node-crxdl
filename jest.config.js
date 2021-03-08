module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["<rootDir>/src/**/?(*.)(unit).(js|ts)?(x)", "<rootDir>/src/**/__tests__/**/*.(js|ts)?(x)"],
};
