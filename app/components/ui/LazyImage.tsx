/* eslint-disable @next/next/no-img-element */
import { IPropsImage } from "../../types"
import { useEffect, useState } from "react"
import { Skeleton } from "./skeleton";

export const LazyImage = ({ src, alt, classname }: IPropsImage) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (() => {
      // checking if image is in browser cached
      const img = new Image();
      img.src = src;
      setLoading(!img.complete);
    })()
  }, [src])

  return (
    <>
      <img src={src} alt={alt} className={loading ? 'hidden' : classname} onLoad={() => setLoading(false)} loading="lazy" />
      <Skeleton className={loading ? 'w-full aspect-square rounded-t-lg' : 'hidden'} />
    </>
  )
}