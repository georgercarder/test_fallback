module.exports = {
	contracts_directory: "./contracts",
	test_directory: "./test",
	compilers: {
		solc: {
			version: "0.5.8"
		}
	},
	networks: {
		development: {
			host: '127.0.0.1',
			port: 8545,
			network_id: '*',
		}
	}
};
