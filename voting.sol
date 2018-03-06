pragma solidity ^0.4.18;

contract Vote {

    mapping (address => uint8) public votesReceived;

    bytes32[] public candidateList;

    function Vote(bytes32[] candidateNames){
        candidatesList = candidateNames;
    }

    function totalVotesFor(bytes32 candidate) public returns (uint8) {
        return votesReceived[candidate];
    }

    function voteForCandidate(bytes32 candidate) public {
        if (isValid(candidate)){
        votesReceived[canidate]++;
        }
    }

    function isValid(bytes32 candidate) internal returns (bool) {
        for(uint8 i = 0; i < candidateList.length; i++) {
            if(candidateList[i] == candidate){
                return true;
            }
        }
        return false;
    }

}