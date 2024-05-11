import { blockchain } from '../startup.mjs';

const getBlockchain = (req, res, next) => {
  res.status(200).json({ success: true, data: blockchain });
};

const createBlock = (req, res, next) => {
  const lastBlock = blockchain.getLastBlock();
  const data = req.body;
  const timestamp = Date.now();

  const currentBlockHash = blockchain.hashBlock(
    timestamp,
    lastBlock.currentBlockHash,
    data
  );

  const block = blockchain.createBlock(
    timestamp,
    lastBlock.currentBlockHash,
    currentBlockHash,
    data
  );

  res.status(201).json({ success: true, data: block });
};

export { createBlock, getBlockchain };
