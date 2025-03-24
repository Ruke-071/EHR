// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DoctorRegistry {
    struct Doctor {
        string fullName;
        string hospitalName;
        string hospitalLocation;
        string dateOfBirth;
        string gender;
        string email;
        string hhNumber;
        string specialization;
        string department;
        string designation;
        uint256 workExperience;
        address walletAddress;
    }

    mapping(address => Doctor) public doctors;
    address[] public registeredDoctors;

    event DoctorRegistered(address indexed walletAddress, string fullName);

    function registerDoctor(
        string memory _fullName,
        string memory _hospitalName,
        string memory _hospitalLocation,
        string memory _dateOfBirth,
        string memory _gender,
        string memory _email,
        string memory _hhNumber,
        string memory _specialization,
        string memory _department,
        string memory _designation,
        uint256 _workExperience
    ) public {
        require(bytes(doctors[msg.sender].fullName).length == 0, "Doctor already registered");

        doctors[msg.sender] = Doctor(
            _fullName,
            _hospitalName,
            _hospitalLocation,
            _dateOfBirth,
            _gender,
            _email,
            _hhNumber,
            _specialization,
            _department,
            _designation,
            _workExperience,
            msg.sender
        );
        registeredDoctors.push(msg.sender);

        emit DoctorRegistered(msg.sender, _fullName);
    }

    function getDoctor(address _walletAddress) public view returns (Doctor memory) {
        require(bytes(doctors[_walletAddress].fullName).length > 0, "Doctor not registered");
        return doctors[_walletAddress];
    }

    function getRegisteredDoctors() public view returns (address[] memory) {
        return registeredDoctors;
    }
}