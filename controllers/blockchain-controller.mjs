import { blockchain } from '../startup.mjs';

const getBlockchain = (req, res, next) => {
  res.status(200).json({ success: true, data: blockchain });
};

const createBlock = (req, res, next) => {
  const lastBlock = blockchain.getLastBlock();
  const data = req.body;
  const timestamp = Date.now();

  const { nonce, difficulty } = blockchain.proofOfWork(
    timestamp,
    lastBlock.currentBlockHash,
    data
  );

  const currentBlockHash = blockchain.hashBlock(
    timestamp,
    lastBlock.currentBlockHash,
    data,
    nonce,
    difficulty
  );

  const block = blockchain.createBlock(
    timestamp,
    lastBlock.currentBlockHash,
    currentBlockHash,
    data,
    nonce,
    difficulty
  );

  res.status(201).json({ success: true, data: block });
};

const synchronizeChain = (req, res, next) => {
  const currentLength = blockchain.chain.length;
  let maxLength = currentLength;
  let longestChain = null;

  blockchain.memberNodes.forEach(async (member) => {
    const response = await fetch(`${member}/api/v1/blockchain`);
    if (response.ok) {
      const result = await response.json();

      if (result.data.chain.length > maxLength) {
        maxLength = result.data.chain.length;
        longestChain = result.data.chain;
      }

      if (
        !longestChain ||
        (longestChain && !blockchain.validateChain(longestChain))
      ) {
        console.log('Blockchain is synced');
      } else {
        blockchain.chain = longestChain;
        console.log(blockchain);
      }
    }
  });

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: { message: 'Synchronization is complete' },
  });
};

export { createBlock, getBlockchain, synchronizeChain };
