// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DiagnosticRegistry {
    struct DiagnosticCenter {
        string centerName;
        string hospitalName;
        string location;
        string email;
        string hhNumber;
        address walletAddress;
    }

    mapping(address => DiagnosticCenter) public diagnosticCenters;
    address[] public registeredCenters;

    event CenterRegistered(address indexed walletAddress, string centerName);

    function registerCenter(
        string memory _centerName,
        string memory _hospitalName,
        string memory _location,
        string memory _email,
        string memory _hhNumber
    ) public {
        require(bytes(diagnosticCenters[msg.sender].centerName).length == 0, "Center already registered");

        diagnosticCenters[msg.sender] = DiagnosticCenter(
            _centerName,
            _hospitalName,
            _location,
            _email,
            _hhNumber,
            msg.sender
        );
        registeredCenters.push(msg.sender);

        emit CenterRegistered(msg.sender, _centerName);
    }

    function getCenter(address _walletAddress) public view returns (DiagnosticCenter memory) {
        require(bytes(diagnosticCenters[_walletAddress].centerName).length > 0, "Center not registered");
        return diagnosticCenters[_walletAddress];
    }

    function getRegisteredCenters() public view returns (address[] memory) {
        return registeredCenters;
    }
}