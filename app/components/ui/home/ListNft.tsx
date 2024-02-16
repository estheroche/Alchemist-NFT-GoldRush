/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { NftTokenContract } from '@covalenthq/client-sdk';
import {
  Card,
  CardFooter,
} from "../card"
import { ArrowLeftIcon, ArrowRightIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { listGrids } from '../../../lib/utils';
import { GridValue, Views } from '../../../types';
import { LazyImage } from '../LazyImage';
import { Skeleton } from '../skeleton';
import Link from 'next/link';
import { Badge } from '../badge';
import { Button } from '../button';

export const ListNft: React.FC<{ listNft: NftTokenContract[], loading: boolean, page: number, setPage: (n: number) => void, hasMore: boolean }> = ({ listNft, loading, page, setPage, hasMore }) => {
  const [selectedGrid, setSelectedGrid] = useState<GridValue>("grid-4");

  return (
    <>
      <div className="items-center justify-end sticky top-[62px] z-[10] bg-background hidden md:flex">
        <div className="inline-flex items-center justify-center rounded-lg border border-input p-1 text-muted-foreground grid grid-cols-3 mb-4">
          {
            listGrids.map((item) => {
              return (
                <div
                  key={item.value}
                  data-state={selectedGrid === item.value ? 'active' : 'inactive'}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md p-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#ff4c8b] data-[state=active]:text-white data-[state=active]:shadow cursor-pointer"
                  onClick={() => setSelectedGrid(item.value)}
                >
                  <item.icon className='w-4 h-4' />
                </div>
              )
            })
          }
        </div>
      </div>
      {
        loading ?
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {
              Array(12).fill(0).map((_, index) => {
                return (
                  <Card key={index}>
                    <Skeleton className='w-full aspect-square rounded-t-lg' />
                    <CardFooter className='px-2 py-4 flex-col items-start gap-1'>
                      <Skeleton className='w-[50%] h-4' />
                      <Skeleton className='w-[80%] h-4' />
                    </CardFooter>
                  </Card>
                )
              })
            }
          </div> :
          <>
            <div className={`${selectedGrid === 'grid-4' ? 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ' : 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'}`}>
              {
                listNft.map((item) => {
                  return (
                    <CardNft key={item.nft_data.token_id} item={item} selectedGrid={selectedGrid} />
                  )
                })
              }
            </div>
          </>
      }
      <div className='py-4 md:py-8 flex items-center justify-end'>
        <div className='flex items-center gap-4'>
          <Button size="icon" variant="ghost" disabled={loading || page === 0} onClick={() => setPage( page - 1)}>
            <ArrowLeftIcon className='w-4 h-4' />
          </Button>
          <Button size="icon" variant="ghost" disabled={loading || !hasMore} onClick={() => setPage(page + 1)}>
            <ArrowRightIcon className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </>
  )
}

const CardNft: React.FC<{ item: NftTokenContract, selectedGrid: GridValue }> = ({ item, selectedGrid }) => {
  const [totalView, setTotalView] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true)
      await fetch(`/api/${Number(item.nft_data.token_id)}`)
        .then(async (data) => {
          const res: { res : Views[] } = await data.json()
          if (res.res.length > 0) setTotalView(res.res[0].views)
          else setTotalView(0)
          setLoading(false)
        }).catch(() => {
          setLoading(false)
          setTotalView(0)
        })
    })()
  }, [item.nft_data.token_id])

  return (
    <Link href={`/${Number(item.nft_data.token_id)}`}>
      <Card>
        <div className={`overflow-hidden rounded-t-lg ${selectedGrid === 'no-dec' ? 'rounded-b-lg' : ''}`}>
          <LazyImage
            src={item.nft_data.external_data.image}
            alt={item.nft_data.external_data.name}
            classname={`object-contain aspect-square rounded-t-lg ${selectedGrid === 'no-dec' ? 'rounded-b-lg' : ''} transform hover:scale-110 transition duration-200`}
          />
        </div>
        {
          selectedGrid !== 'no-dec' &&
          <CardFooter className='px-2 py-4 flex-col items-start gap-1'>
            <div className='w-full flex justify-end gap-2 text-xs'>
              {
                !loading &&
                <Badge variant="outline" className='flex items-center gap-1 px-2 py-1'>
                  <EyeOpenIcon className='w-3 h-3 stroke-muted-foreground' />
                  <div className='text-xs text-muted-foreground'>{ totalView }</div>
                </Badge>
              }
              {
                loading &&
                <Skeleton className='w-10 h-6' />
              }
            </div>
            <div>
              <p className='text-sm font-semibold'>{item.contract_name} <span className='text-primary-covalent'>#{Number(item.nft_data.token_id)}</span></p>
              <p className='text-xs line-clamp-1'>{item.nft_data.external_data.name}</p>
            </div>
          </CardFooter>
        }
      </Card>
    </Link>
  )
}