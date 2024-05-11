import { blockchain } from '../startup.mjs';

const getBlockchain = (req, res, next) => {
  res.status(200).json({ success: true, data: blockchain });
};

const createBlock = (req, res, next) => {
  const lastBlockHash = '00000';
  const data = req.body;

  const currentBlockHash = blockchain.hashBlock(lastBlockHash, data);
  const block = blockchain.createBlock(lastBlockHash, currentBlockHash, data);
  res.status(201).json({ success: true, data: block });
};

export { createBlock, getBlockchain };
