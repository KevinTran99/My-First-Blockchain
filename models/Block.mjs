export default class Block {
  constructor(blockIndex, previousBlockHash, currentBlockHash, data) {
    this.blockIndex = blockIndex;
    this.previousBlockHash = previousBlockHash;
    this.currentBlockHash = currentBlockHash;
    this.data = data;
  }
}
