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
}
