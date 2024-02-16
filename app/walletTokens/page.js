"use client";
import { NFTWalletTokenListView } from "@covalenthq/goldrush-kit";
import "@covalenthq/goldrush-kit/styles.css";
import React from "react";

const page = () => {
  return (
    <NFTWalletTokenListView
      address="0xfc43f5f9dd45258b3aff31bdbe6561d97e8b71de" //sample address
      chain_names={[
        "eth-mainnet",
        "matic-mainnet",
        "bsc-mainnet",
        "avalanche-mainnet",
        "optimism-mainnet",
      ]} //sample list of chains
    />
  );
};

export default page;
