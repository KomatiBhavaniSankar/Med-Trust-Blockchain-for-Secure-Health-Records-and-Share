// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthcareRecords {
    
    // Structure to store a medical record
    struct Record {
        uint256 recordID;
        string patientName;
        string diagnosis;
        string treatment;
        uint256 timestamp;
    }

    // Mapping to store patient records based on their unique patient ID
    mapping(uint256 => Record[]) private patientRecords;

    // Event to log when a new record is added
    event RecordAdded(uint256 indexed patientID, uint256 recordID, uint256 timestamp);

    /**
     * @dev Adds a medical record for a patient.
     */
    function addRecord(
        uint256 patientID, 
        string memory patientName, 
        string memory diagnosis, 
        string memory treatment
    ) public {
        uint256 recordID = patientRecords[patientID].length + 1;
        patientRecords[patientID].push(Record(recordID, patientName, diagnosis, treatment, block.timestamp));
        emit RecordAdded(patientID, recordID, block.timestamp);
    }

    /**
     * @dev Retrieves all medical records for a given patient.
     */
    function getPatientRecords(uint256 patientID) public view returns (Record[] memory) {
        return patientRecords[patientID];
    }
}
