import { blockchain } from '../startup.mjs';

export const listMembers = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, statuscode: 200, data: blockchain.memberNodes });
};
