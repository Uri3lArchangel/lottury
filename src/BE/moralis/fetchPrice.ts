import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";


export const fetchPrice = async (apikey:string) => {
    if(!Moralis.Core.isStarted){
  await Moralis.start({
    apiKey:apikey,
  });
}

  const address = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";

  const chain = EvmChain.ETHEREUM;

  const response = await Moralis.EvmApi.token.getTokenPrice({
    address,
    chain,
  });

//   console.log(response.toJSON());
  return (response.raw.usdPrice - 600)
}