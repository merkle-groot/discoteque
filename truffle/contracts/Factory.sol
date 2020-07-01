pragma solidity ^0.5.0;

contract Factory{
    ERC20 newContract;
    mapping (string => address) public artistToERC;
    address public owner;
    
    constructor() public{
        owner = msg.sender;
    }
    
    event contractCreated(string artistName, address contractAddress);
    
    function createTokens(uint _initialSupply, string calldata _name, string calldata _symbol, string calldata artistName) external{
        require(msg.sender == owner,"Unauthorized Access");
        newContract = new ERC20(_initialSupply,_name,_symbol);
        artistToERC[artistName] = address(newContract);
        emit contractCreated(artistName,artistToERC[artistName]);
    }
}




contract ERC20{
    string  public name = "";
    string  public symbol = "";
    uint256 public totalSupply;
    uint8 public decimals;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor (uint256 _initialSupply, string memory _name, string memory _symbol) public {
        name = _name;
        symbol = _symbol;
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
        decimals = 2;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value,"You don't have enough balance for this transaction");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from],"The sender does not have enough balance for this transaction");
        require(_value <= allowance[_from][msg.sender],"Not authorized by the sender");

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}