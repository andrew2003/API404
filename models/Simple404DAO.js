require("dotenv").config();
const ethers = require("ethers");
const Web3 = require("web3");
const simple404abi = require("../contracts/simple404.json");

class Simple404DAO {
  constructor(privateKey) {
    this.rpcProvider = new ethers.AlchemyProvider(
      "sepolia",
      "AHl0XW6Lfsp_UqmXyqOAhIUt0BSgBRaU"
    );
    this.tokenAddress = process.env.SIMPLE404_ADDRESS;
    this.abi = simple404abi;
    this.option = { gasLimit: 1000000 };
    if (privateKey) {
      this.wallet = new ethers.Wallet(privateKey, this.rpcProvider);
      this.contract = new ethers.Contract(
        this.tokenAddress,
        this.abi,
        this.wallet
      );
    } else {
      this.wallet = null;
      this.contract = new ethers.Contract(
        this.tokenAddress,
        this.abi,
        this.rpcProvider
      );
    }
  }
}

module.exports = Simple404DAO;
