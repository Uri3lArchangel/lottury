import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";


export const fetchPrice = async (apikey:string) => {
    if(!Moralis.Core.isStarted){
  await Moralis.start({
    apiKey:apikey,
  });
}

  const address = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";

  const chain = EvmChain.BSC;

  const response = await Moralis.EvmApi.token.getTokenPrice({
    address,
    chain,
  });

  return (response.raw.usdPrice)
}