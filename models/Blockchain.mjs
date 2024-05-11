import { createHash } from '../utilities/crypto-lib.mjs';
import Block from './Block.mjs';

export default class Blockchain {
  constructor() {
    this.chain = [];

    this.createBlock('0', '0', []);
  }

  createBlock(previousBlockHash, currentBlockHash, data) {
    const block = new Block(
      this.chain.length + 1,
      previousBlockHash,
      currentBlockHash,
      data
    );

    this.chain.push(block);

    return block;
  }

  hashBlock(previousBlockHash, currentBlockData) {
    const stringToHash = previousBlockHash + JSON.stringify(currentBlockData);
    const hash = createHash(stringToHash);

    return hash;
  }
}
