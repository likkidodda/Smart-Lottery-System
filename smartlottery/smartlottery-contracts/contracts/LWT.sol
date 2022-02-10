//SPDX-License-Identifier: MIT
pragma solidity 0.8;
interface ERC20Interface {

    function totalSupply() external view returns(uint256);
    
    function balanceOf(address account) external view returns(uint256);
    
    function allowance(address owner, address spender) external view returns(uint256);
    
    function transfer(address recipient, uint256 amount) external returns(bool);
    
    function approve(address spender, uint256 amount) external returns(bool);
    
    function transferFrom(address sender, address recipient, uint256 amount) external returns(bool);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
}

contract LWT is ERC20Interface {
    
    string public constant name = "LWTCoin";
    string public constant symbol = "LWT";
    uint8 public constant decimals = 2;
    address public owner;
    
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;
    uint256 totalSupply_;
    
    constructor(address _owner) {
        totalSupply_ = 50000000;
        owner=_owner;
        balances[owner] = totalSupply_;
    }
    
       function totalSupply() public override view returns(uint256) {
        return totalSupply_;
    }
    
     function increaseTotalSupply(uint newTokensAmount) public {
         totalSupply_ += newTokensAmount;
         balances[owner] += newTokensAmount;
     }
    
    function balanceOf(address tokenOwner) public override view returns(uint256) {
        return balances[tokenOwner];   
    }
    
    function allowance(address _owner, address delegate) public override view returns(uint256) {
        return allowed[_owner][delegate];
    }
    
    function transfer(address recipient, uint256 numTokens) public override returns(bool) {
        require(numTokens <= balances[owner]);
        balances[owner] -= numTokens;
        balances[recipient] += numTokens;
        emit Transfer(owner, recipient, numTokens);
        return true;
    }

 
    function approve(address delegate, uint256 numTokens) public override returns(bool) {
        allowed[owner][delegate] = numTokens;
        emit Approval(owner, delegate, numTokens);
        return true;
    }
    
    function transferFrom(address _owner, address buyer, uint256 numTokens) public override returns(bool) {
        require(numTokens <= balances[_owner]);
       // require(numTokens <= allowed[_owner][buyer]);
        balances[_owner] -= numTokens;
        //allowed[_owner][buyer] -= numTokens;
        balances[buyer] += numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    } 
}