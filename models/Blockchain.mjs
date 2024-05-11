import { createHash } from '../utilities/crypto-lib.mjs';
import Block from './Block.mjs';

export default class Blockchain {
  constructor() {
    this.chain = [];

    this.createBlock(Date.now(), '0', '0', []);
  }

  createBlock(timestamp, previousBlockHash, currentBlockHash, data) {
    const block = new Block(
      timestamp,
      this.chain.length + 1,
      previousBlockHash,
      currentBlockHash,
      data
    );

    this.chain.push(block);

    return block;
  }

  getLastBlock() {
    return this.chain.at(-1);
  }

  hashBlock(timestamp, previousBlockHash, currentBlockData, nonce) {
    const stringToHash =
      timestamp.toString() +
      previousBlockHash +
      JSON.stringify(currentBlockData) +
      nonce;
    const hash = createHash(stringToHash);

    return hash;
  }

  proofOfWork(timestamp, previousBlockHash, data) {
    const DIFFICULTY_LEVEL = process.env.DIFFICULTY;
    let nonce = 0;
    let hash = this.hashBlock(timestamp, previousBlockHash, data, nonce);

    while (
      hash.substring(0, DIFFICULTY_LEVEL) !== '0'.repeat(DIFFICULTY_LEVEL)
    ) {
      nonce++;
      hash = this.hashBlock(timestamp, previousBlockHash, data, nonce);
    }

    console.log(nonce);
    return nonce;
  }
}
