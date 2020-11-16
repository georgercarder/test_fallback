const fb = artifacts.require("Fallbacker");
const nfb = artifacts.require("NonFallbacker");

contract("Fallbacker", accounts => {
	it("Contract can accept ETH with fallback", () => {
		let f = fb.new();
		return f
		.then((fbInstance) => {
			return sendETHToContract(
				fbInstance, accounts, expectReceipt);
		});
	});
});

function expectReceipt(receipt) {
	let from = receipt.from;
	let to = receipt.to;
	if (from === undefined) {
		return assert.equal(1, 0, "Receipt is invalid.");
	} else if (to === undefined) {
		return assert.equal(1, 0, "Receipt is invalid.");
	}
	return assert.equal(1, 1, "Receipt is valid.");
}

contract("NonFallbacker", accounts => {
	it("Contract can't accept ETH without fallback", () => {
		let nf = nfb.new();
		return nf
		.then((nfbInstance) => {
			return sendETHToContract(
				nfbInstance, accounts, expectError);
		});
	});
});

function expectError(err) {
	let expectedErr = 'Error: Returned error: VM Exception ' +
		'while processing transaction: revert';
	assert.equal(expectedErr, err, "We expect error here.");
}

function sendETHToContract(instance, accounts, fallback) {
	let contractAddress = instance.address;	
	return web3.eth.sendTransaction(
		{from: accounts[1], to: contractAddress, value: 1000})
	.then(res => {
		fallback(res);
	})
	.catch(err => {
		fallback(err);
	})
};
