import { useEffect, useState } from "react";
import { Spinner } from "./Icons";


export const LazyVideo = ({ url }: { url: string }) => {
  const [isLoad, setIsLoad] = useState(true);

  return (
    <>
      <video
        src={url}
        preload="auto"
        autoPlay
        loop
        playsInline
        muted
        className={isLoad ? 'hidden' : 'w-full h-full aspect-ratio'}
        onLoadedData={() => setIsLoad(false)}
      />
      <div className="flex items-center justify-cetner h-full">
        <Spinner className={isLoad ? 'animate-spin h-6 w-6 text-primary-covalent' : 'hidden'} />
      </div>
    </>

  )
}