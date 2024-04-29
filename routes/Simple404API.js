const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/Simple404Controller");

const initSimple404APIRoutes = (app) => {
  //GET METHOD
  router.get("/getInfo", getInfo);

  //POST METHOD
  router.post("/getAllowance", getAllowance);
  router.post("/getBalanceOf", getBalanceOf);
  router.post("/getErc721BalanceOf", getErc721BalanceOf);
  router.post("/getErc721TransferExempt", getErc721TransferExempt);
  router.post("/getOwnedListToken", getOwnedListToken);
  router.post("/getOwnerOf", getOwnerOf);
  router.post("/getTokenURI", getTokenURI);
  router.post("/getisApprovedForAll", getisApprovedForAll);

  router.post("/erc20TransferFrom", erc20TransferFrom);
  router.post("/safeTransferFrom", safeTransferFrom);
  router.post("/erc20Approve", erc20Approve);
  router.post("/erc721Approve", erc721Approve);
  router.post("/setERC721TransferExempt", setERC721TransferExempt);
  router.post("/setApprovalForAll", setApprovalForAll);

  return app.use("/simple404API/v1", router);
};

module.exports = { initSimple404APIRoutes };
