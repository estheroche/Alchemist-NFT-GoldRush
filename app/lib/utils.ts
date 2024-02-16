import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CovalentClient, Chains, NftTokenContract, Chain, LogEvent } from "@covalenthq/client-sdk";
import data from './data.json';
import { IGridObject, ISocialMediaShare } from "../types";
import { ViewGridIcon, TableIcon, DashboardIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from "react";
import { TwitterIcon, FarcasterIcon, LensterIcon, TelegramIcon } from '../components/ui/Icons';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const apiService = new CovalentClient(process.env.NEXT_PUBLIC_COVALENT_KEY as string);

export const useNftCollection = (pageNumber: number) => {
  const [loading, setLoading] = useState(false);
  const [listNft, setListNft] = useState<NftTokenContract[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [hasMore, setHasmore] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const d = await apiService.NftService.getTokenIdsForContractWithMetadataByPage(data.chain as Chains, data.contract_address, { withUncached: true, pageNumber: pageNumber, pageSize: 12 });
        if (d.error) {
          setListNft([]);
        }
        d.data.items.reduce((_, item) => item.nft_data.external_data.image = data.ipfs_gateway + item.nft_data.external_data.image.slice(21), '');
        setTotalItems(d.data.pagination.total_count);
        setListNft(d.data.items);
        console.log(d.data.pagination.has_more)
        setHasmore(d.data.pagination.has_more);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setListNft([])
        setLoading(false);
      }
    })()
  }, [pageNumber])

  return {
    loading,
    listNft,
    totalItems,
    hasMore
  }
}

export const useNftCollectionById = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [dataNft, setData] = useState<NftTokenContract[]>([]);
  const [sizeNft, setSizeNft] = useState('0');
  const [totalView, setTotalView] = useState('0');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const res = await apiService.NftService.getNftMetadataForGivenTokenIdForContract(data.chain as Chain, data.contract_address, id, { withUncached: true });
        if (res.error) {
          setData([])
        } else {
          res.data.items.reduce((_, item) => item.nft_data.external_data.image = data.ipfs_gateway + item.nft_data.external_data.image.slice(21), '');
          res.data.items.reduce((_, item) => item.nft_data.external_data.animation_url = data.ipfs_gateway + item.nft_data.external_data.animation_url.slice(7), '');
          if (res.data.items.length > 0) {
            try {
              const size = await fetch(res.data.items[0].nft_data.external_data.animation_url).then(response => response.headers.get("content-length"));
              const sizeMb = (Number(size) / 1048576);
              setSizeNft(new Intl.NumberFormat().format(sizeMb));
            } catch (error) {
              console.log(error);
              setSizeNft('0');
            }
            await fetch(`/api/${id}`, { method: 'POST' })
            .then((resp) => resp.json())
            .then((data) => setTotalView(new Intl.NumberFormat().format(data.res.views)))
            .catch(() => setTotalView('0'))
          }
          setData(res.data.items)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setData([]);
      }
    })()
  }, [id])

  return {
    loading,
    dataNft,
    sizeNft,
    totalView
  }
}

export const useNftTransactionById = (id: string) => {
  const [listTx, setListTx] = useState<LogEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await apiService.NftService.getNftTransactionsForContractTokenId(data.chain as Chain, data.contract_address, id);
        if (res.error) {
          setListTx([])
        } else {
          const logEvents: LogEvent[] = []
          res.data.items[0].nft_transactions.forEach((item) => {
            logEvents.push(...item.log_events.filter((x) => x.decoded?.name === 'TransferSingle'));
          })
          setListTx(logEvents);
        }
        setLoading(false)
      } catch (error) {
        setListTx([])
        console.log(error)
        setLoading(false)
      }
    })()
  }, [id])

  return {
    listTx,
    loading,
    fetch
  }
}

export const listGrids: IGridObject[] = [
  {
    icon: ViewGridIcon,
    value: "grid-4"
  },
  {
    icon: TableIcon,
    value: "grid-6"
  },
  {
    icon: DashboardIcon,
    value: "no-dec"
  }
]

export const trimWallet = (s: string) => s.slice(0, 6) + '...' + s.slice(-5);

const buildUrl = (url: string, text: string, textKey: string, urlKey: string, hostname: string) => {
  const u = new URL(url);
  u.searchParams.append(textKey, text);
  u.searchParams.append(urlKey, hostname);
  return u;
}

const textShare = "Unveiling the Alchemist 4.0 NFT collection! Discover unique artwork & join the community."

export const listSocialMediaShare = (hostname: string) => {
  const res: ISocialMediaShare[] = [
    {
      icon: TwitterIcon,
      color: '#000',
      iconColor: '#fff',
      link: buildUrl('https://twitter.com/intent/tweet', textShare, "text", "url", hostname)
    },
    {
      icon: FarcasterIcon,
      color: '#8660cd',
      iconColor: '#fff',
      link: buildUrl('https://warpcast.com/~/compose', textShare, "text", "embeds[]", hostname)
    },
    {
      icon: LensterIcon,
      color: '#3d4b41',
      iconColor: '',
      link: buildUrl("https://lenster.xyz/", textShare, "text", "url", hostname)
    },
    {
      icon: TelegramIcon,
      color: '#229ed9',
      iconColor: '#fff',
      link: buildUrl('https://t.me/share/url', textShare, "text", "url", hostname)
    }
  ]
  return res;
}  