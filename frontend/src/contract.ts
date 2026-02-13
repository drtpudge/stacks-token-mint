import { openContractCall } from '@stacks/connect';

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractName = "token";

export const mintToken = async (recipient: string, amount: number) => {
  await openContractCall({
    contractAddress,
    contractName,
    functionName: 'mint',
    functionArgs: [recipient, amount]
  });
};
