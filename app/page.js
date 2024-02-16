"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        className="flex items-center justify-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#FF4B8B] mb-5">Alchemist 4.0 NFT Dashboard </h1>
        <p className="text-md dark:text-white max-w-lg mx-auto mb-3">This dashboard was built using Covalent's GoldRush Kit, focused on the NFT collection associated with the 2024 Alchemist program.</p>
        <button className="bg-[#FF4B8B] px-5 py-2 text-white font-bold rounded-md">
            <Link href="/collection/">GoTo Collection ListView</Link>
          </button>
        </div>
      </div>
    </>
  );
}
