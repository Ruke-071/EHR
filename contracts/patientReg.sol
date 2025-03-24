// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PatientRegistry {
    struct Patient {
        string fullName;
        string dateOfBirth;
        string gender;
        string bloodGroup;
        string homeAddress;
        string hhNumber;
        string email;
        address walletAddress;
    }

    mapping(address => Patient) public patients;
    address[] public registeredPatients;

    event PatientRegistered(address indexed walletAddress, string fullName);

    function registerPatient(
        string memory _fullName,
        string memory _dateOfBirth,
        string memory _gender,
        string memory _bloodGroup,
        string memory _homeAddress,
        string memory _hhNumber,
        string memory _email
    ) public {
        require(bytes(patients[msg.sender].fullName).length == 0, "Patient already registered");

        patients[msg.sender] = Patient(
            _fullName,
            _dateOfBirth,
            _gender,
            _bloodGroup,
            _homeAddress,
            _hhNumber,
            _email,
            msg.sender
        );
        registeredPatients.push(msg.sender);

        emit PatientRegistered(msg.sender, _fullName);
    }

    function getPatient(address _walletAddress) public view returns (Patient memory) {
        require(bytes(patients[_walletAddress].fullName).length > 0, "Patient not registered");
        return patients[_walletAddress];
    }

    function getRegisteredPatients() public view returns (address[] memory) {
        return registeredPatients;
    }
}