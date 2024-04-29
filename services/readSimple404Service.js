const Simple404DAO = require("../models/Simple404DAO");
const ethers = require("ethers");

const readName = async (dao) => {
  const nameContract = await dao.contract.name();
  return nameContract;
};

const readSymbol = async (dao) => {
  const symbol = await dao.contract.symbol();
  return symbol;
};

const readDecimals = async (dao) => {
  const decimals = await dao.contract.decimals();
  return ethers.toNumber(decimals);
};

const readErc20Totalsupply = async (dao) => {
  const erc20TotalSupply = await dao.contract.erc20TotalSupply();
  return `${erc20TotalSupply}`;
};

const readErc721Totalsupply = async (dao) => {
  const erc721TotalSupply = await dao.contract.erc721TotalSupply();
  return ethers.toNumber(erc721TotalSupply);
};

const readTotalSupply = async (dao) => {
  const totalSuppply = await dao.contract.totalSupply();
  return `${totalSuppply}`;
};

const readErc721TokenInQueue = async (dao) => {
  const erc721TokenInQueue = await dao.contract.getERC721QueueLength();
  return ethers.toNumber(erc721TokenInQueue);
};

const readMinted = async (dao) => {
  const minted = await dao.contract.minted();
  return ethers.toNumber(minted);
};

const readBaseTokenUri = async (dao) => {
  const baseTokenUri = await dao.contract.baseTokenURI();
  return baseTokenUri;
};

const readIdEncode = async (dao) => {
  const idEncode = await dao.contract.ID_ENCODING_PREFIX();
  return idEncode;
};

const readBalanceOf = async (address) => {
  const dao = new Simple404DAO();
  const balance = await dao.contract.balanceOf(address);
  return `${balance}`;
};

const readErc721BalanceOf = async (address) => {
  const dao = new Simple404DAO();
  const erc721BalanceOf = await dao.contract.erc721BalanceOf(address);
  return ethers.toNumber(erc721BalanceOf);
};

const readErc721TransferExempt = async (address) => {
  const dao = new Simple404DAO();
  const erc721TransferExempt = await dao.contract.erc721TransferExempt(address);
  return erc721TransferExempt;
};

const readOwnedListToken = async (address) => {
  const dao = new Simple404DAO();
  const idEncode = await readIdEncode(dao);
  const owned = await dao.contract.owned(address);
  const list = owned.map((id) => ethers.toNumber(id - idEncode));
  return list;
};

const readOwnerOf = async (id) => {
  const dao = new Simple404DAO();
  const idEncode = +`${await readIdEncode(dao)}`;
  const ownerOf = await dao.contract.ownerOf(BigInt(idEncode) + BigInt(id));
  return ownerOf;
};

const readTokenUri = async (id) => {
  const dao = new Simple404DAO();
  const idEncode = +`${await readIdEncode(dao)}`;
  const tokenURI = await dao.contract.tokenURI(BigInt(idEncode) + BigInt(id));
  return tokenURI;
};

const readAllowance = async (ownerAddress, spenderAddress) => {
  const dao = new Simple404DAO();
  const allowance = await dao.contract.allowance(ownerAddress, spenderAddress);
  return `${allowance}`;
};

const readisApprovedForAll = async (ownerAddress, spenderAddress) => {
  const dao = new Simple404DAO();
  const isApprovedForAll = await dao.contract.isApprovedForAll(
    ownerAddress,
    spenderAddress
  );
  return isApprovedForAll;
};

module.exports = {
  readAllowance,
  readBalanceOf,
  readBaseTokenUri,
  readDecimals,
  readErc20Totalsupply,
  readErc721BalanceOf,
  readErc721TokenInQueue,
  readErc721Totalsupply,
  readErc721TransferExempt,
  readMinted,
  readName,
  readOwnedListToken,
  readOwnerOf,
  readSymbol,
  readTokenUri,
  readTotalSupply,
  readisApprovedForAll,
  readIdEncode,
};
