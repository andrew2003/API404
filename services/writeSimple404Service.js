const Simple404DAO = require("../models/Simple404DAO");
const ethers = require("ethers");
const { readIdEncode } = require("./readSimple404Service");

const writeApprove = async (dao, spenderAddress, value) => {
  if (typeof value === "bigint") {
    const tx = await dao.contract.approve(spenderAddress, value);
    tx.wait();
    return tx;
  } else {
    const idEncode = +`${await readIdEncode(dao)}`;
    const tx = await dao.contract.approve(
      spenderAddress,
      BigInt(idEncode) + BigInt(value)
    );
    tx.wait();
    return tx;
  }
};

const writeErc20Approve = async (dao, spenderAddress, value) => {
  const tx = await dao.contract.erc20Approve(spenderAddress, value);
  tx.wait();
  return tx;
};

const writeErc721Approve = async (dao, spenderAddress, tokenId) => {
  const idEncode = +`${await readIdEncode(dao)}`;
  const tx = await dao.contract.erc721Approve(
    spenderAddress,
    BigInt(idEncode) + BigInt(tokenId)
  );
  tx.wait();
  return tx;
};

const writeSafeTransferFrom = async (dao, fromAddress, toAddress, tokenId) => {
  const idEncode = +`${await readIdEncode(dao)}`;
  const tx = await dao.contract.safeTransferFrom(
    fromAddress,
    toAddress,
    BigInt(idEncode) + BigInt(tokenId),
    dao.option
  );
  tx.wait();
  return tx;
};

const writeErc20TransferFrom = async (dao, fromAddress, toAddress, value) => {
  const tx = await dao.contract.erc20TransferFrom(
    fromAddress,
    toAddress,
    value,
    dao.option
  );
  tx.wait();
  return tx;
};

const writeTransferFrom = async (dao, fromAddress, toAddress, value) => {
  if (typeof value === "bigint") {
    const tx = await dao.contract.transferFrom(
      fromAddress,
      toAddress,
      value,
      dao.option
    );
    tx.wait();
    return tx;
  } else {
    const idEncode = +`${await readIdEncode(dao)}`;
    const tx = await dao.contract.transferFrom(
      fromAddress,
      toAddress,
      BigInt(idEncode) + BigInt(value),
      dao.option
    );
    tx.wait();
    return tx;
  }
};

const writeSetERC721TransferExempt = async (dao, address, value) => {
  const tx = await dao.contract.setERC721TransferExempt(address, value);
  tx.wait();
  return tx;
};

const writeSetApprovalForAll = async (dao, address, value) => {
  const tx = await dao.contract.setApprovalForAll(address, value);
  tx.wait();
  return tx;
};

module.exports = {
  writeApprove,
  writeErc20Approve,
  writeErc20TransferFrom,
  writeErc721Approve,
  writeSafeTransferFrom,
  writeSetERC721TransferExempt,
  writeTransferFrom,
  writeSetApprovalForAll,
};
