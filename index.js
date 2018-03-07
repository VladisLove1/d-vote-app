
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

let VotingContract = web3.eth.contract([
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "votesReceived",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "candidate",
                "type": "bytes32"
            }
        ],
        "name": "totalVotesFor",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidateList",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "candidate",
                "type": "bytes32"
            }
        ],
        "name": "voteForCandidate",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "candidateNames",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
]);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
let vote =  VotingContract.at('0x35b1f28c12d992cfd9b52c2b64deda4b0dde02d7');

let candidates = {"Poroh": "candidate-1", "Blockchain": "candidate-2", "Groot": "candidate-3"};

function voteForCandidate() {
    candidateName = $("#candidate").val();
    vote.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
        let div_id = candidates[candidateName];
        $("#" + div_id).html(vote.totalVotesFor.call(candidateName).toString());
    });
}

$(document).ready(function() {
    candidateNames = Object.keys(candidates);
    for (let i = 0; i < candidateNames.length; i++) {
        let name = candidateNames[i];
        let val = vote.totalVotesFor.call(name).toString();
        $("#" + candidates[name]).html(val);
    }
});