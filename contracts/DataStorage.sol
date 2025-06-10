// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DataStorage {
    struct DataEntry {
        address sender;
        string data;
        uint256 timestamp;
    }
    
    DataEntry[] public dataEntries;
    mapping(address => uint256[]) public userEntries;
    
    event DataStored(
        address indexed sender,
        string data,
        uint256 timestamp,
        uint256 indexed entryId
    );
    
    function storeData(string memory _data) public {
        require(bytes(_data).length > 0, "Data cannot be empty");
        
        uint256 entryId = dataEntries.length;
        DataEntry memory newEntry = DataEntry({
            sender: msg.sender,
            data: _data,
            timestamp: block.timestamp
        });
        
        dataEntries.push(newEntry);
        userEntries[msg.sender].push(entryId);
        
        emit DataStored(msg.sender, _data, block.timestamp, entryId);
    }
    
    function getDataEntry(uint256 _index) public view returns (address, string memory, uint256) {
        require(_index < dataEntries.length, "Index out of bounds");
        DataEntry memory entry = dataEntries[_index];
        return (entry.sender, entry.data, entry.timestamp);
    }
    
    function getTotalEntries() public view returns (uint256) {
        return dataEntries.length;
    }
    
    function getUserEntries(address _user) public view returns (uint256[] memory) {
        return userEntries[_user];
    }
}