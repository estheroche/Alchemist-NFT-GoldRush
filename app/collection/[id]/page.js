"use client";
import { NFTDetailView } from "@covalenthq/goldrush-kit";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();
  const { setnftAddress,nftAddress } = useNftContext();
  return (
    <NFTDetailView
      chain_name={"zora-mainnet"}
      collection_address={nftAddress} //sample collection address
      token_id={`${id}`} //sample token id
    />
  );
};

export default page;
