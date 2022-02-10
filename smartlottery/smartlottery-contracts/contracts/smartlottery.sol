//SPDX-License-Identifier: MIT
pragma solidity 0.8;
import "./LWT.sol";

contract smartlottery {
     struct user {                     
        uint tokens;
        bool registered;
    }
    LWT public tokenaddress;
    uint public t=10;

    address payable owner;
    mapping(address =>user) users;
    uint256 public endtime;
    uint flag=0;
    uint public lotterytime;
    event purchasedTokens(uint, address);
    uint public gain;
    uint totalfundsraised=0;
    address _contract;
    address public tokenadd;
    //uint public time=block.timestamp;
    constructor() payable{
        tokenaddress = new LWT(msg.sender);
        tokenadd = payable(address(tokenaddress));
        owner = payable(msg.sender);
        //add=tokenaddress;
         _contract = address(this);
    }
    
    modifier onlyowner(){
        require(msg.sender == owner);
        _;
     }
     modifier islotterystarted(){
        require(block.timestamp>starttime,"Lottery not yet started");
        _;
     }
     modifier isregistered(){
         require(users[msg.sender].registered==true,"please register before buying tickets");
         _;
     }
     
     modifier islotterytimeended()
     { 
         require(block.timestamp>endtime,"Lottery time not ended");
         _;
     }
     modifier islotterynotended(){  
         require(block.timestamp<endtime,"Lottery time ended");
         _;
     }
      modifier islotterynotstarted(){  
         require(flag==0,"Lottery started");
         _;
     }
     
      function startLottery(uint time,uint _gain) public onlyowner{
        flag=1;
       totalfundsraised=0;
       lotterytime=time;
        gain=_gain;
       starttime=block.timestamp;
       endtime=starttime+lotterytime;
    }
    
     function register(address use,uint bonustokens) public onlyowner islotterystarted {
       
        users[use].tokens = bonustokens;
        users[use].registered=true;
        tokenaddress.transferFrom(msg.sender,use,bonustokens);
        
    }
    uint ticketPrice=500;
    uint randNonce = 0;
    uint starttime;
    mapping(address=>uint[]) peopleTickets;
    mapping (uint=>address) winner;
    event purchasedTicket(uint, address); 
    event winningTicket(uint);
    uint[] purchasedTickets;
    address winnerAddress;
    address[] winners;
    
    function buyTicket(uint _tickets) public isregistered islotterynotended islotterystarted payable{
        uint totalPrice = _tickets*ticketPrice;
        totalfundsraised=totalfundsraised+totalPrice;
        require(totalPrice<=users[msg.sender].tokens, "You need more tokens.");
        tokenaddress.transferFrom(msg.sender, owner, totalPrice);
        for(uint i=0; i<_tickets; i++) {
            uint random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce)))%10000;
            randNonce++;
            peopleTickets[msg.sender].push(random);
            purchasedTickets.push(random);
            winner[random] = msg.sender;
            emit purchasedTicket(random, msg.sender);
        }
        uint ticketsQty = purchasedTickets.length;
        require(ticketsQty>0, "No ticket has been purchased.");
    }
   
    uint winnerscount = 1;
    function UpdateNumberofWinners(uint num) public onlyowner islotterynotstarted {
        winnerscount = num;
    }
    
    function generateWinningTicket() public onlyowner islotterytimeended payable{
        uint ticketsQty = purchasedTickets.length;
        require(ticketsQty>0, "No ticket has been purchased.");
        for (uint64 i = 0; i < winnerscount; i++) {
            uint randomIndex = uint(uint(keccak256(abi.encodePacked(block.timestamp)))%ticketsQty);
            uint winning = purchasedTickets[randomIndex];
            emit winningTicket(winning);
            winnerAddress = winner[winning];
            winners.push(winnerAddress);
             }
    }
    function settlePayment() public onlyowner islotterytimeended payable{
        uint winnergain=100-gain;
        flag=0;
        uint winningamount=(winnergain*totalfundsraised/100)/winnerscount;
       // uint ownerprofit=totalfundsraised-winningamount;
       for (uint64 i = 0; i < winnerscount; i++) {
        tokenaddress.transfer(winners[i],winningamount);
       }
    }
    function seeTokenaddress() public view returns(address){
      return tokenadd;
      
  }
  function seeWinners() public islotterytimeended view returns(address[] memory){
      return winners;
      
  }
}