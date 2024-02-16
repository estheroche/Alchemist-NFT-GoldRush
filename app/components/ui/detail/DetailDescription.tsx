/* eslint-disable @next/next/no-img-element */
import { Button } from "../button"
import { DotsHorizontalIcon, DownloadIcon, ImageIcon, Share1Icon, ArrowTopRightIcon, EyeOpenIcon, LightningBoltIcon, MagicWandIcon, ExternalLinkIcon, PlusIcon, PaperPlaneIcon } from "@radix-ui/react-icons"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../dialog"
import CopyToClipboard from "react-copy-to-clipboard"
import data from '../../../lib/data.json';
import { useEffect, useState } from "react"
import { listSocialMediaShare, trimWallet, useNftTransactionById } from "../../../lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu";
import { OpenseaIcon, Spinner } from "../Icons";
import { Separator } from "../separator";
import { Badge } from "../badge";
import { LogEvent, NftTokenContract } from "@covalenthq/client-sdk";
import { Skeleton } from "../skeleton";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const DetailDescription: React.FC<{ dataNft: NftTokenContract[], sizeNft: string, id: string, loading: boolean, totalView: string }> = ({ dataNft, sizeNft, id, loading, totalView }) => {
  const [readMore, setReadmore] = useState(false);
  const [hostname, setHostname] = useState('');
  const [isCopy, setIsCopy] = useState(false);

  const { loading: loadingTx, listTx } = useNftTransactionById(id);

  useEffect(() => {
    (() => {
      setHostname(window.location.href);
    })()
  }, [])

  const handleCopy = () => {
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 gap-4 h-fit max-h-fit lg:max-h-[700px] overflow-auto">
      {
        (!loading && !loadingTx) &&
        <div className="flex gap-2 lg:hidden items-center justify-end">
          <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1 focus-visible:outline-none">
            <EyeOpenIcon /> { totalView }
          </Badge>
          <Drawer shouldScaleBackground={true}>
            <DrawerTrigger asChild>
              <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1 focus-visible:outline-none">
                <LightningBoltIcon /> {listTx.length}
              </Badge>
            </DrawerTrigger>
            <DrawerContent className="focus-visible:outline-none">
              <DrawerHeader className="py-4 mb-4">
                <div className="text-left mb-4"><DrawerTitle>Activity</DrawerTitle></div>
                <div className="grid gried-cols-1 gap-4">
                  {
                    listTx.map((item) => {
                      return (
                        <TxDetail key={item.tx_hash} image={dataNft[0].nft_data.external_data.image} item={item} />
                      )
                    })
                  }
                </div>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </div>
      }
      {!loading && <div className="text-primary-covalent text-[2rem] font-medium">{dataNft[0]?.nft_data.external_data.name}</div>}
      {loading && <Skeleton className="h-[3rem] w-full" />}
      <div className="flex items-center justify-between text-sm">

        {!loading &&
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={dataNft[0]?.nft_data.external_data.image} className="rounded-lg w-12 aspect-square" alt="" />
              <img src="/covalent-logo.png" className="absolute -right-1 -bottom-1 w-6 h-6 border border-background rounded-full" alt="" />
            </div>
            <div>
              <div>Alchemist 4.0</div>
              <div className="text-muted-foreground">Covalent</div>
            </div>
          </div>
        }
        {loading &&
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <div>
              <Skeleton className="w-20 h-4 mb-2" />
              <Skeleton className="w-20 h-4" />
            </div>
          </div>
        }
        {
          !loading &&
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Share1Icon className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[250px] md:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle>Share</DialogTitle>
                  <DialogDescription>
                    <div className="flex items-center justify-center md:justify-start gap-2 py-4">
                      {listSocialMediaShare(hostname).map((item) => {
                        return (
                          <a href={item.link.toString()} target="_blank" rel="noopener noreferrer" key={item.color} className={`flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full`} style={{ backgroundColor: item.color }}>
                            <item.icon className={` h-4 w-4 md:w-6 md:h-6 stroke-white fill-white`} />
                          </a>
                        )
                      })}
                    </div>
                    <div className="flex items-center gap-2 max-w-[calc(250px_-_3rem)] md:max-w-[calc(400px_-_3rem)]">
                      <div className="flex-1 border-input border rounded-md px-2 py-2 truncate flex justify-start">
                        {hostname}
                      </div>
                      <div className="flex-none -mr-1">
                        <CopyToClipboard text={hostname} onCopy={handleCopy}>
                          <Button variant="default" size="sm">{isCopy ? 'Copied' : 'Copy'}</Button>
                        </CopyToClipboard>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="flex md:hidden">
                  <Share1Icon className="h-4 w-4" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="focus-visible:outline-none">
                <DrawerHeader className="py-4 mb-4">
                  <div className="text-left mb-4"><DrawerTitle>Share</DrawerTitle></div>
                  <div className="grid gried-cols-1 gap-4">
                    <div className="flex items-center justify-start md:justify-start gap-2 py-1">
                      {listSocialMediaShare(hostname).map((item) => {
                        return (
                          <a href={item.link.toString()} target="_blank" rel="noopener noreferrer" key={item.color} className={`flex items-center justify-center w-12 h-12 rounded-full`} style={{ backgroundColor: item.color }}>
                            <item.icon className={`w-6 h-6 stroke-white fill-white`} />
                          </a>
                        )
                      })}
                    </div>
                    <div className="flex items-center gap-2 max-w-[calc(100vw_-_3rem)] md:max-w-[calc(400px_-_3rem)]">
                      <div className="flex-1 border-input border rounded-md px-2 py-2 truncate flex justify-start">
                        {hostname}
                      </div>
                      <div className="flex-none -mr-1">
                        <CopyToClipboard text={hostname} onCopy={handleCopy}>
                          <Button variant="default" size="sm">{isCopy ? 'Copied' : 'Copy'}</Button>
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="focus-visible:ring-0">
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <a href={dataNft[0]?.nft_data.external_data.animation_url} target="_blank" rel="noopener noreferrer">
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2 text-sm">
                      <DownloadIcon className="w-4 h-4" />
                      <div>Download</div>
                    </div>
                  </DropdownMenuItem>
                </a>
                <a href={dataNft[0]?.nft_data.external_data.animation_url} target="_blank" rel="noopener noreferrer">
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2 text-sm">
                      <ImageIcon className="w-4 h-4" />
                      <div>View Token Thumbnail</div>
                    </div>
                  </DropdownMenuItem>
                </a>
                <DropdownMenuSeparator />
                <a href={data.block_explorer + 'token/' + data.contract_address + '/instance/' + id} target="_blank" rel="noopener noreferrer">
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2 text-sm">
                      <img src="/zora.png" alt="zora" className="w-4 h-4" />
                      <div>Explore</div>
                    </div>
                  </DropdownMenuItem>
                </a>
                <a href={`https://opensea.io/assets/zora/0xfeee3700698f8d75bcc18e009022c7b44d2af44f/${id}`} target="_blank">
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2 text-sm">
                      <OpenseaIcon className="w-4 h-4" />
                      <div>Opensea</div>
                    </div>
                  </DropdownMenuItem>
                </a>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
        {
          loading &&
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8" />
          </div>
        }
      </div>
      {
        !loading &&
        <div>
          <p className={`text-sm ${readMore ? '' : 'line-clamp-2'}`}> {dataNft[0]?.nft_data.external_data.description}</p>
          <p className="underline underline-offset-4 text-xs font-semibold mt-2 cursor-pointer" onClick={() => setReadmore(!readMore)}>{readMore ? 'less' : 'more'}</p>
        </div>
      }
      {
        loading &&
        <div>
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4 my-2" />
          <Skeleton className="w-12 h-4" />
        </div>
      }
      <Separator />
      <div className="grid grid-cols-1 gap-2 text-sm">
        <div className="flex items-center justify-between">
          {!loading && <><div className="text-muted-foreground">Token ID</div><div>{Number(dataNft[0]?.nft_data.token_id)}</div></>}
          {loading && <><Skeleton className="w-20 h-4" /><Skeleton className="w-20 h-4" /></>}
        </div>
        <div className="flex items-center justify-between">
          {!loading && <><div className="text-muted-foreground">Original Owner</div><div>{trimWallet(dataNft[0]?.nft_data.original_owner)}</div></>}
          {loading && <><Skeleton className="w-20 h-4" /><Skeleton className="w-20 h-4" /></>}
        </div>
        <div className="flex items-center justify-between">
          {
            !loading &&
            <>
              <div className="text-muted-foreground">Traits</div>
              <div className="flex items-center gap-2">
                {dataNft[0]?.nft_data.external_data.attributes.map((item) => {
                  return (
                    <Badge key={item.trait_type} variant="secondary">{item.trait_type} {item.value}</Badge>
                  )
                })}
              </div>
            </>
          }
          {
            loading &&
            <>
              <Skeleton className="w-12 h-4" />
              <div className="flex items-center gap-2">
                <Skeleton className="w-12 h-4 rounded-lg" />
                <Skeleton className="w-12 h-4 rounded-lg" />
              </div>
            </>
          }
        </div>
        <div className="flex items-center justify-between">
          {(!loadingTx && !loading) && <><div className="text-muted-foreground">Total Minters</div><div>{listTx.filter((item) => item.decoded.name === 'TransferSingle' && item.decoded.params[1].value === data.genesis_address).length}</div></>}
          {loadingTx && <><Skeleton className="w-20 h-4" /><Skeleton className="w-20 h-4" /></>}
        </div>
      </div>
      <Separator />
      {
        !loading &&
        <>
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div>
              <Badge variant="default"><span className="italic">VIDEO</span></Badge> {sizeNft} MB
            </div>
            <a href={`https://zora.co/collect/zora:0xfeee3700698f8d75bcc18e009022c7b44d2af44f/${id}`} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button variant="default" className="bg-primary-covalent hover:bg-primary-covalent/75 hover:text-white/75 text-white w-full transition-all">
                Mint Now on Zora
                <ArrowTopRightIcon className="w-4 h-4" />
              </Button>
            </a>
          </div>
          <TabsActivity image={dataNft[0].nft_data.external_data.image} loading={loadingTx} listTx={listTx} totalView={totalView} />
        </>
      }
      {
        loading &&
        <>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-1">
              <Skeleton className="w-12 h-4" /> <Skeleton className="w-12 h-4" />
            </div>
            <Skeleton className="w-full h-8" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
          </div>
          <Skeleton className="w-full h-4" />
        </>
      }

    </div>
  )
}

const TabsActivity: React.FC<{ loading: boolean, listTx: LogEvent[], image: string, totalView: string }> = ({ loading, listTx, image, totalView }) => {
  const [activeTab, setActiveTab] = useState(0);


  const styles = ['flex items-center justify-center gap-2 py-2 text-muted-foreground border-b', 'flex items-center justify-center gap-2 py-2 border-b border-primary']
  return (
    <div className="hidden lg:block text-sm mt-6 py-2">
      <div className="grid grid-cols-2">
        <button className={activeTab !== 0 ? styles[0] : styles[1]} onClick={() => setActiveTab(0)}>
          <EyeOpenIcon className="w-4 h-4" />
          <div>Views</div>
        </button>
        <button className={activeTab !== 1 ? styles[0] : styles[1]} onClick={() => setActiveTab(1)}>
          <LightningBoltIcon className="w-4 h-4" />
          <div>Activity</div>
        </button>
      </div>
      <div className="mt-4">
        {
          activeTab === 1 &&
          <div className="grid grid-cols-1 gap-4">
            {
              !loading && listTx.map((item) => {
                return (
                  <TxDetail key={item.tx_hash} image={image} item={item} />
                )
              })
            }
            {
              loading &&
              <div className="flex items-center justify-center w-full h-[150px]">
                <Spinner className="animate-spin h-6 w-6 text-primary-covalent" />
              </div>
            }
          </div>
        }
        {
          activeTab === 0 &&
          <div>
            This page has been viewed {totalView} times
          </div>
        }
      </div>
    </div>
  )
}

const TxDetail = ({ item, image }: { item: LogEvent, image: string }) => {
  const [isMinted, setIsMinted] = useState(true);

  useEffect(() => {
    (() => {
      setIsMinted(item.decoded.params[1].value === data.genesis_address)
    })()
  }, [item.decoded.params])

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="relative w-fit">
        <img src={image} className="rounded-lg w-12 aspect-square" alt="" />
        <div className="absolute -right-1 -bottom-1 w-4 h-4 border border-primary bg-primary rounded-full">
          <div className="w-full h-full flex items-center justify-center">
            {isMinted && <PlusIcon className="w-3 h-3 stroke-background" />}
            {!isMinted && <PaperPlaneIcon className="w-4 h-4" />}
          </div>
        </div>
      </div>
      <div>
        {isMinted && <div>{trimWallet(item.decoded.params[2].value)} <span className="text-muted-foreground">minted</span></div>}
        {!isMinted && <div>{trimWallet(item.decoded.params[1].value)} <span className="text-muted-foreground">transfer to</span> <span>{trimWallet(item.decoded.params[2].value)}</span></div>}
        <a href={data.block_explorer + 'tx/' + item.tx_hash} target="_blank" className="text-muted-foreground flex items-center">
          <div>{dayjs(item.block_signed_at).fromNow()}</div>
          <ArrowTopRightIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}