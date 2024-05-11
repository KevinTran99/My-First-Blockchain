import { blockchain } from '../startup.mjs';

export const listMembers = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, statuscode: 200, data: blockchain.memberNodes });
};

export const registerNode = (req, res, next) => {
  const node = req.body;

  if (
    blockchain.memberNodes.indexOf(node.nodeUrl) === -1 &&
    blockchain.nodeUrl !== node.nodeUrl
  ) {
    blockchain.memberNodes.push(node.nodeUrl);

    res.status(201).json({
      success: true,
      statuscode: 201,
      data: { message: `Node ${node.nodeUrl} is registered` },
    });
  } else {
    res.status(400).json({
      success: false,
      statusCode: 400,
      data: { message: `Node ${node.nodeUrl} is already registered or yours` },
    });
  }
};
