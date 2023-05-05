//SPDX-License-Identifier:MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract Lottury is ReentrancyGuard{
    using SafeMath for uint256;
    mapping(uint256 => address payable) public ticketToAddress;
    mapping(address => uint256) public ticketsCountPerAddress;
    uint256 public playersCount;
    uint256 interval = 60;
    uint256 public prizePot;
    uint256 public winningAmount;
    address payable public winnerAddress;
    uint256 public totalWonAmount;
    uint256 public ticketCount = 0;
    address[] public players;
    uint256 public startTimestamp;
    address payable public feeAddress1;
    address payable public owner;
    uint256 public winingID;
    uint16 isDrawStarted = 0;
    event ticketPurchase(address _buyer, uint256 amount);
    event drawCalled(address _winner, uint256 _amountWon);
    event ownerChanged(address _from, address payable _to);
    event feeReceiverChanged(address _from, address payable _to);

    constructor(address payable _feeAddress1) {
        feeAddress1 = _feeAddress1;
        owner = payable(msg.sender);
        startTimestamp = block.timestamp;
    }

    function buyTickets(
        uint256 _ticketCount,
        uint256 _pricePerTicket
    ) external payable {
        require(msg.sender != address(0), "Address must not be null");
        require(isDrawStarted == 0, "Draw is ongoing buy function is on hold");
        require(
            msg.value == _ticketCount * _pricePerTicket,
            "Price sent must be equal to price per ticket"
        );
        require(_ticketCount <= 6,"cannot purchase higher than 6 tickets");
        require(ticketsCountPerAddress[msg.sender] < 6, "Cannot have higher than 6 tickets per player");

        if (ticketsCountPerAddress[msg.sender] == 0) {
            playersCount += 1;
            players.push(msg.sender);
        }
        for (uint256 i = 0; i < _ticketCount; i++) {
            ticketToAddress[i + ticketCount] = payable(msg.sender);
        }
        ticketCount += _ticketCount;
        prizePot += msg.value;
        ticketsCountPerAddress[msg.sender] += _ticketCount;
        emit ticketPurchase(msg.sender, _ticketCount);
    }

    function transferOwnership(address payable _newOwner) public {
        require(msg.sender == owner, "only owner can call this function");
        require(_newOwner != address(0), "Address must not be null");
        owner = _newOwner;
        emit ownerChanged(msg.sender, _newOwner);
    }

    function changeFeeAddress(address payable _newFeeAddress) public {
        require(msg.sender == owner, "only owner can call this function");
        require(_newFeeAddress != address(0), "Address must not be null");
        emit feeReceiverChanged(feeAddress1, _newFeeAddress);
        feeAddress1 = _newFeeAddress;
    }

    function draw(uint256 _randomNumber) external nonReentrant() {
        require(msg.sender == owner, "only owner can call this function");
        require(
            playersCount > 1,
            "Draw function is held until atleast players are atleast 2 in number"
        );
        require(_randomNumber != 0, "Random string cannot be 0");
        require(prizePot > 0, "Prize pot cannot be empty");
        require(block.timestamp >= startTimestamp + interval);
        isDrawStarted = 1;
        uint256 _winningId = _randomNumber % ticketCount;
        winingID = _winningId;
        address payable winner = ticketToAddress[_winningId];
        (bool status, ) = winner.call{value:((prizePot).mul(90).div(100)),gas:30000}("");
        require(status, "failed to send winner prize");
        winnerAddress = winner;
        winningAmount = ((prizePot).mul(90).div(100));
        totalWonAmount = (prizePot).mul(90).div(100);
        prizePot = prizePot - ((prizePot).mul(90).div(100));
        (bool status2, ) = owner.call{value:((prizePot).div(2)),gas:30000}("");
        prizePot = prizePot - ((prizePot).div(2));
        (bool status3, ) = feeAddress1.call{value:((prizePot)),gas:30000}("");
        require(status2 && status3, "failed to transfer fees");
        prizePot = 0;
        for (uint256 i = 0; i < players.length; i++) {
            ticketsCountPerAddress[players[i]] = 0;
        }
        for (uint256 i = 0; i < ticketCount; i++) {
            ticketToAddress[i] = payable(address(0));
        }
        ticketCount = 0;
        delete players;
        isDrawStarted = 0;
        startTimestamp = block.timestamp;
        playersCount = 0;
        emit drawCalled(winnerAddress, winningAmount);
    }
}
