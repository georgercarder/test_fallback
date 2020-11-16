// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Fallbacker {

	event Fallback();

	// fallback
	function () external payable {
		
	}
}

contract NonFallbacker {

}
