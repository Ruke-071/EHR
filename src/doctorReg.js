import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const DoctorRegistry = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [registeredDoctors, setRegisteredDoctors] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState(null);

  const [fullName, setFullName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalLocation, setHospitalLocation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [hhNumber, setHhNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [workExperience, setWorkExperience] = useState("");

  const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "fullName",
				"type": "string"
			}
		],
		"name": "DoctorRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "doctors",
		"outputs": [
			{
				"internalType": "string",
				"name": "fullName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hospitalName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hospitalLocation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dateOfBirth",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hhNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "specialization",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "department",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "designation",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "workExperience",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_walletAddress",
				"type": "address"
			}
		],
		"name": "getDoctor",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "fullName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "hospitalName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "hospitalLocation",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dateOfBirth",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "gender",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "hhNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "specialization",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "department",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "designation",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "workExperience",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "walletAddress",
						"type": "address"
					}
				],
				"internalType": "struct DoctorRegistry.Doctor",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRegisteredDoctors",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_fullName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hospitalName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hospitalLocation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dateOfBirth",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hhNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_specialization",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_department",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_designation",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_workExperience",
				"type": "uint256"
			}
		],
		"name": "registerDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "registeredDoctors",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}

  ];

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const web3Signer = web3Provider.getSigner();
        const doctorContract = new ethers.Contract(contractAddress, contractABI, web3Signer);

        setProvider(web3Provider);
        setSigner(web3Signer);
        setContract(doctorContract);
        const accounts = await web3Provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);

        fetchDoctors(doctorContract);
      }
    };
    init();
  }, []);

  const fetchDoctors = async (contract) => {
    try {
      const doctors = await contract.getRegisteredDoctors();
      setRegisteredDoctors(doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const registerDoctor = async () => {
    if (!contract) return;

    try {
      const tx = await contract.registerDoctor(
        fullName,
        hospitalName,
        hospitalLocation,
        dateOfBirth,
        gender,
        email,
        hhNumber,
        specialization,
        department,
        designation,
        workExperience
      );
      await tx.wait();
      alert("Doctor registered successfully!");
      fetchDoctors(contract);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const getDoctorDetails = async (doctorAddress) => {
    try {
      const doctor = await contract.getDoctor(doctorAddress);
      setDoctorDetails(doctor);
    } catch (error) {
      console.error("Failed to fetch doctor details:", error);
    }
  };

  return (
    <div>
      <h2>Doctor Registry</h2>
      <p>Connected Account: {account}</p>

      <h3>Register a Doctor</h3>
      <input type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} />
      <input type="text" placeholder="Hospital Name" onChange={(e) => setHospitalName(e.target.value)} />
      <input type="text" placeholder="Hospital Location" onChange={(e) => setHospitalLocation(e.target.value)} />
      <input type="text" placeholder="Date of Birth" onChange={(e) => setDateOfBirth(e.target.value)} />
      <input type="text" placeholder="Gender" onChange={(e) => setGender(e.target.value)} />
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="HH Number" onChange={(e) => setHhNumber(e.target.value)} />
      <input type="text" placeholder="Specialization" onChange={(e) => setSpecialization(e.target.value)} />
      <input type="text" placeholder="Department" onChange={(e) => setDepartment(e.target.value)} />
      <input type="text" placeholder="Designation" onChange={(e) => setDesignation(e.target.value)} />
      <input type="number" placeholder="Work Experience" onChange={(e) => setWorkExperience(e.target.value)} />
      <button onClick={registerDoctor}>Register Doctor</button>

      <h3>Registered Doctors</h3>
      {registeredDoctors.map((doctor, index) => (
        <div key={index}>
          <p>{doctor}</p>
          <button onClick={() => getDoctorDetails(doctor)}>View Details</button>
        </div>
      ))}

      {doctorDetails && (
        <div>
          <h3>Doctor Details</h3>
          <p>Full Name: {doctorDetails.fullName}</p>
          <p>Specialization: {doctorDetails.specialization}</p>
        </div>
      )}
    </div>
  );
};

export default DoctorRegistry;