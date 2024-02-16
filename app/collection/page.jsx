"use client";
import { NFTCollectionTokenListView } from "@covalenthq/goldrush-kit";
import "@covalenthq/goldrush-kit/styles.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {useRef} from "react";
import { useNftContext } from "../context";
import { DetailCollection } from "../components/ui/home/DetailCollection";

export default function page() {

  const route = useRouter();
  const { updateNftData,setnftAddress,nftAddress } = useNftContext();
  const contractRef = useRef("")

  const handleTokenDetailView = (e) => {
    updateNftData(e);
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   setnftAddress(contractRef.current.value);
  // }
  
  return (
    <section className="flex justify-center gap-x-8 p-8">
      <section className="nft-collection-container w-9/12">
        {/* <div>
          <form className="flex items-center justify-center bg-base-100 w-fit mx-auto px-2 rounded-lg" onSubmit={handleSubmit}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" placeholder="Type here" className="input w-full max-w-xs pl-2" ref={contractRef} />
          </form>
        </div> */}
        <NFTCollectionTokenListView
          chain_name={"zora-mainnet"}
          collection_address={nftAddress}
          on_nft_click={(e) => {
            console.log(e);
            route.push(`/collection/${e.nft_data.token_id}`);
            handleTokenDetailView(e);
          }}
          className="bg-red-400"
          style={{ background: 'purple' }}
        >
          OPenine
        </NFTCollectionTokenListView>
      </section>
      <section className="w-3/12">
        <DetailCollection collection_address={nftAddress}/>
      </section>
    </section>
  );
}
