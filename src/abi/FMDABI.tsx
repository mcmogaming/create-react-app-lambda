export const FMDABI = [
  // Authenticated Functions
  "function deposit(uint depositAmt) public payable",
  "function createSpending(address _reciever, uint _spendingAmt, string memory _purpose)",
  "function approveSpending(uint spendingId, bool vote)",
  "function executeSpending(uint spendingId)",
  // Events
  "event Deposit(address newStakeholder, uint depositAmt)",
  "event Vote(address voter, bool vote)",
  "event NewSpending(address receiver, uint spendingAmt)",
  "event SpendingExecuted(address executor, uint spendingId)",
];
