'use client'

import { useNftCollectionById } from '../../../lib/utils'
import { DetailImage } from './DetailImage';
import { DetailDescription } from './DetailDescription';
import { Button } from '../button';
import { Error } from '../error';

export const DetailNFT = ({ id }: { id: string }) => {
  const { dataNft, sizeNft, loading, totalView } = useNftCollectionById(id);
  if (!loading && dataNft.length === 0) {
    return (
      <Error link={`/${id}`} />
    )
  }
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_450px] py-4">
      <DetailImage url={dataNft[0]?.nft_data.external_data.animation_url} />
      <DetailDescription dataNft={dataNft} id={id} sizeNft={sizeNft} loading={loading} totalView={totalView} />
    </div>
  )
}