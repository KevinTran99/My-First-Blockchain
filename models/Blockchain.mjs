import { createHash } from '../utilities/crypto-lib.mjs';
import Block from './Block.mjs';

export default class Blockchain {
  constructor() {
    this.chain = [];

    this.memberNodes = [];

    this.nodeUrl = process.argv[3];

    this.createBlock(Date.now(), '0', '0', [], process.env.DIFFICULTY);
  }

  createBlock(
    timestamp,
    previousBlockHash,
    currentBlockHash,
    data,
    nonce,
    difficulty
  ) {
    const block = new Block(
      timestamp,
      this.chain.length + 1,
      previousBlockHash,
      currentBlockHash,
      data,
      nonce,
      difficulty
    );

    this.chain.push(block);

    return block;
  }

  getLastBlock() {
    return this.chain.at(-1);
  }

  hashBlock(timestamp, previousBlockHash, currentBlockData, nonce, difficulty) {
    const stringToHash =
      timestamp.toString() +
      previousBlockHash +
      JSON.stringify(currentBlockData) +
      nonce +
      difficulty;
    const hash = createHash(stringToHash);

    return hash;
  }

  proofOfWork(timestamp, previousBlockHash, data) {
    const lastBlock = this.getLastBlock();
    let nonce = 0;
    let currentTime;
    let difficulty = process.env.DIFFICULTY;
    let hash = this.hashBlock(timestamp, previousBlockHash, data, nonce);

    while (hash.substring(0, difficulty) !== '0'.repeat(difficulty)) {
      nonce++;
      currentTime = Date.now();

      difficulty = this.difficultyAdjustment(lastBlock, currentTime);

      hash = this.hashBlock(
        currentTime,
        previousBlockHash,
        data,
        nonce,
        difficulty
      );
    }

    console.log(nonce);
    console.log(difficulty);
    return { nonce, difficulty };
  }

  difficultyAdjustment(lastBlock, timestamp) {
    const MINE_RATE = process.env.MINE_RATE;
    let { difficulty } = lastBlock;

    if (difficulty < 1) return 1;

    return timestamp - lastBlock.timestamp > MINE_RATE
      ? +difficulty - 1
      : +difficulty + 1;
  }

  validateChain(blockchain) {
    let isValid = true;

    for (let i = 1; i < blockchain.length; i++) {
      const block = blockchain[i];
      console.log(block);
      const previousBlock = blockchain[i - 1];

      const hash = this.hashBlock(
        block.timestamp,
        previousBlock.currentBlockHash,
        block.data,
        block.nonce,
        block.difficulty
      );

      if (hash !== block.currentBlockHash) isValid = false;

      if (block.previousBlockHash !== previousBlock.currentBlockHash)
        isValid = false;
    }

    return isValid;
  }
}
