const Simple404DAO = require("../models/Simple404DAO");
const ethers = require("ethers");
const {
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
} = require("../services/readSimple404Service");

const {
  writeApprove,
  writeErc20Approve,
  writeErc20TransferFrom,
  writeErc721Approve,
  writeSafeTransferFrom,
  writeSetERC721TransferExempt,
  writeTransferFrom,
  writeSetApprovalForAll,
} = require("../services/writeSimple404Service");

const getInfo = async (req, res, next) => {
  try {
    const dao = new Simple404DAO();
    const name = await readName(dao);
    const symbol = await readSymbol(dao);
    const decimals = await readDecimals(dao);
    const erc20TotalSupply = await readErc20Totalsupply(dao);
    const erc721TotalSupply = await readErc721Totalsupply(dao);
    const totalSupply = await readTotalSupply(dao);
    const erc721TokenInQueue = await readErc721TokenInQueue(dao);
    const minted = await readMinted(dao);
    const baseTokenURI = await readBaseTokenUri(dao);

    return res.status(200).json({
      name: name,
      symbol: symbol,
      decimals: decimals,
      erc20TotalSupply: erc20TotalSupply,
      erc721TotalSuy: erc721TotalSupply,
      totalSupply: totalSupply,
      erc721TokenInQueue: erc721TokenInQueue,
      minted: minted,
      baseTokenURI: baseTokenURI,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something is wrong");
  }
};

const getBalanceOf = async (req, res, next) => {
  try {
    const { address } = req.body;
    if (address === undefined) {
      return res.status(400).json("Bad request");
    }

    const balance = await readBalanceOf(address);

    return res.status(200).json({
      balance: balance,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something is wrong");
  }
};

const getErc721BalanceOf = async (req, res, next) => {
  try {
    const { address } = req.body;
    if (address === undefined) {
      return res.status(400).json("Bad request");
    }

    const balance = await readErc721BalanceOf(address);

    return res.status(200).json({
      erc721Balance: balance,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something is wrong");
  }
};

const getErc721TransferExempt = async (req, res, next) => {
  try {
    const { address } = req.body;
    if (address === undefined) {
      return res.status(400).json("Bad request");
    }

    const value = await readErc721TransferExempt(address);

    return res.status(200).json({
      isErc721TransferExempt: value,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something is wrong");
  }
};

const getOwnedListToken = async (req, res, next) => {
  try {
    const { address } = req.body;
    if (address === undefined) {
      return res.status(400).json("Bad request");
    }

    const value = await readOwnedListToken(address);

    return res.status(200).json({
      ownedListToken: value,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something is wrong");
  }
};

const getOwnerOf = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (id === undefined) {
      return res.status(400).json("Bad request");
    }

    const value = await readOwnerOf(id);

    return res.status(200).json({
      ownerOf: value,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something is wrong");
  }
};

const getTokenURI = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (id === undefined) {
      return res.status(400).json("Bad request");
    }

    const value = await readTokenUri(id);

    return res.status(200).json({
      tokenUri: value,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something is wrong");
  }
};

const getAllowance = async (req, res, next) => {
  try {
    const { ownerAddress, spenderAddress } = req.body;
    if (ownerAddress === undefined || spenderAddress === undefined) {
      return res.status(400).json("Bad request");
    }

    const value = await readAllowance(ownerAddress, spenderAddress);

    return res.status(200).json({
      allowance: value,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something is wrong");
  }
};

const getisApprovedForAll = async (req, res, next) => {
  try {
    const { ownerAddress, spenderAddress } = req.body;
    if (ownerAddress === undefined || spenderAddress === undefined) {
      return res.status(400).json("Bad request");
    }

    const value = await readisApprovedForAll(ownerAddress, spenderAddress);

    return res.status(200).json({
      isApprovedForAll: value,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something is wrong");
  }
};

const erc20TransferFrom = async (req, res, next) => {
  try {
    const { privateKey, fromAddress, toAddress, value } = req.body;
    if (
      privateKey === undefined ||
      fromAddress === undefined ||
      toAddress === undefined ||
      value === undefined
    ) {
      return res.status(400).json("Bad request");
    }
    const amount = BigInt(+value);
    if (amount <= 0n) {
      return res.status(400).json("Bad request");
    }
    const dao = new Simple404DAO(privateKey);
    const tx = await writeErc20TransferFrom(
      dao,
      fromAddress,
      toAddress,
      amount
    );

    return res.status(200).json({
      tx: tx,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something is wrong");
  }
};

const safeTransferFrom = async (req, res, next) => {
  try {
    const { privateKey, fromAddress, toAddress, tokenId } = req.body;
    if (
      privateKey === undefined ||
      fromAddress === undefined ||
      toAddress === undefined ||
      tokenId === undefined
    ) {
      return res.status(400).json("Bad request");
    }

    const value = +tokenId;
    if (value <= 0) {
      return res.status(400).json("Bad request");
    }
    const dao = new Simple404DAO(privateKey);
    const tx = await writeSafeTransferFrom(dao, fromAddress, toAddress, value);

    return res.status(200).json({
      tx: tx,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something is wrong");
  }
};

const erc20Approve = async (req, res, next) => {
  try {
    const { privateKey, spenderAddress, value } = req.body;
    if (
      privateKey === undefined ||
      spenderAddress === undefined ||
      value === undefined
    ) {
      return res.status(400).json("Bad request");
    }
    const amount = BigInt(+value);
    if (amount <= 0n) {
      return res.status(400).json("Bad request");
    }
    const dao = new Simple404DAO(privateKey);
    const tx = await writeErc20Approve(dao, spenderAddress, amount);

    return res.status(200).json({
      tx: tx,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something is wrong");
  }
};

const erc721Approve = async (req, res, next) => {
  try {
    const { privateKey, spenderAddress, tokenId } = req.body;
    if (
      privateKey === undefined ||
      spenderAddress === undefined ||
      tokenId === undefined
    ) {
      return res.status(400).json("Bad request");
    }
    const value = +tokenId;
    if (value <= 0) {
      return res.status(400).json("Bad request");
    }
    const dao = new Simple404DAO(privateKey);
    const tx = await writeErc721Approve(dao, spenderAddress, value);

    return res.status(200).json({
      tx: tx,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something is wrong");
  }
};

const setERC721TransferExempt = async (req, res, next) => {
  try {
    const { privateKey, address, value } = req.body;
    if (
      privateKey === undefined ||
      address === undefined ||
      value === undefined
    ) {
      return res.status(400).json("Bad request");
    }
    const dao = new Simple404DAO(privateKey);
    const tx = await writeSetERC721TransferExempt(dao, address, value);

    return res.status(200).json({
      tx: tx,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something is wrong");
  }
};

const setApprovalForAll = async (req, res, next) => {
  try {
    const { privateKey, address, value } = req.body;
    if (
      privateKey === undefined ||
      address === undefined ||
      value === undefined
    ) {
      return res.status(400).json("Bad request");
    }
    const dao = new Simple404DAO(privateKey);
    const tx = await writeSetApprovalForAll(dao, address, value);

    return res.status(200).json({
      tx: tx,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something is wrong");
  }
};

module.exports = {
  getAllowance,
  getBalanceOf,
  getErc721BalanceOf,
  getErc721TransferExempt,
  getInfo,
  getOwnedListToken,
  getOwnerOf,
  getTokenURI,
  getisApprovedForAll,

  erc20TransferFrom,
  safeTransferFrom,
  erc20Approve,
  erc721Approve,
  setERC721TransferExempt,
  setApprovalForAll,
};
