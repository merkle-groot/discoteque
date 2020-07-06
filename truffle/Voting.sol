pragma solidity ^0.5.16;

import "./ER20Interface.sol;

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {

  /**
  * @dev Multiplies two numbers, throws on overflow.
  */
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }

  /**
  * @dev Integer division of two numbers, truncating the quotient.
  */
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  /**
  * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  /**
  * @dev Adds two numbers, throws on overflow.
  */
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}


contract Voting is ERC20{
    
    using SafeMath for uint256;
    address tokenAddress = 0xb7eE2fEe38342a7C0260A64392dd762D1f901c3A;
    mapping (address => uint256 ) public balances;
    ERC20 token = ERC20(tokenAddress);
    

    
    uint256[4] public options;
    uint256 public result;
    uint256 public nowTime;
    uint public endTime;
    
    
    constructor() public{
        endTime = (now + 2 minutes);
    }
    
    function getNowTime() external{
        nowTime = now;
    }
    
    function vote1(uint256 points, uint256 tokens) external{
        require(now < endTime,"Voting is still going on");
        require(tokens == points ** 2, "Tokens should be square of points");
        token.transferFrom(msg.sender, address(this), tokens);
        balances[msg.sender] += tokens;
        options[0] = options[0].add(points);
    }
    
    function vote2(uint256 points, uint256 tokens) external{
        require(now < endTime,"Voting is still going on");
        require(tokens == points ** 2,"Tokens should be square of points");
        token.transferFrom(msg.sender, address(this), tokens);
        balances[msg.sender] += tokens;
        options[1] = options[1].add(points);
    }
    
    function vote3(uint256 points, uint256 tokens) external{
        require(now < endTime,"Voting is still going on");
        require(tokens == points ** 2,"Tokens should be square of points");
        token.transferFrom(msg.sender, address(this), tokens);
        balances[msg.sender] += tokens;
        options[2] = options[2].add(points);
    }
    
    function vote4(uint256 points, uint256 tokens) external{
        require(now < endTime,"Voting is still going on");
        require(tokens == points ** 2,"Tokens should be square of points");
        token.transferFrom(msg.sender, address(this), tokens);
        balances[msg.sender] += tokens;
        options[3] = options[3].add(points);
    }
    
    function withdrawCoins() external{
        require(now > endTime,"Voting is still going on");
        token.transfer(msg.sender, balances[msg.sender]);
        balances[msg.sender] = 0;
    }
    
    function getResult() external {
        require(now > endTime,"Voting is still going on");
        uint biggie = 0;
        for( uint256 i = 1; i < 4; ++i){
            if(options[biggie] < options[i]){
                biggie = i;
            }
        }
        
        result = biggie + 1;
    }
    
}