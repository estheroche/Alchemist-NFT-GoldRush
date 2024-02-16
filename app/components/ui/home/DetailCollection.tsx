/* eslint-disable @next/next/no-img-element */
import { Button } from "../../ui/button"
import { Separator } from "../../ui/separator"
import { useEffect, useState } from "react"
import { trimWallet } from "../../../lib/utils"
import { Skeleton } from "../skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../../ui/drawer"

export const DetailCollection = ({ collection_address }) => {
  const [readMore, setReadmore] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-4">
      <img src="/alchemist-logo.jpeg" className="w-28 h-28" alt="" />
      <h3 className="text-[2rem] font-semibold text-[#ff4c8b]">Alchemist 4.0</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/covalent-logo.png" className="w-8 h-8 rounded-full" alt="" />
          <div className="dark:text-white">Covalent</div>
        </div>
        <div className="flex items-center gap-2">
        </div>
      </div>
      <div>
        <p className={`text-sm ${readMore ? '' : 'line-clamp-2'} dark:text-white`}>
          Special-made NFTs for Alchemists that have shown above and beyond contributions to the ecosystem and community.
          <br />
          <br />
          These are available for a limited time for version Alchemist 4.0.
        </p>
        <p className="underline underline-offset-4 text-xs font-semibold mt-2 cursor-pointer dark:text-white" onClick={() => setReadmore(!readMore)}>{readMore ? 'less' : 'more'}</p>
      </div>
      <Separator />
      <div className="text-sm grid grid-cols-1 gap-2">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">Contract Address</div>
          <a href={`https://opensea.io/collection/alchemist-program-4-0`} target="_blank" rel="noopener noreferrer"><Button variant="link" className="text-sm !px-0 !py-0 !h-fit font-normal">{trimWallet(collection_address)}</Button></a>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">Total Items</div>
          <div className="dark:text-white">17</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">Network</div>
          <div className="dark:text-white">Zora Mainnet</div>
        </div>
      </div>
      <Separator />
      <div className="my-4">
          <Dialog >
            <DialogTrigger className="w-full hidden md:flex" asChild>
              <Button variant="default" className="w-full bg-primary-covalent text-white hover:opacity-[0.75] hover:bg-primary-covalent transition-all" size="icon">
                Mint Info
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription className="text-sm text-left">
                  <MintInfoDesc />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="default" className="flex md:hidden w-full bg-pink-500 text-white font-bold hover:opacity-[0.75] hover:bg-primary-covalent transition-all" size="icon">
                Mint Info
              </Button>
            </DrawerTrigger>
            <DrawerContent className="focus-visible:outline-none">
              <DrawerHeader className="py-4 mb-4 text-sm text-left">
                <MintInfoDesc />
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </div>
    </div>
  )
}

const MintInfoDesc = () => {
  const benefits = [
    'Growth and development (grow personally and professionally)',
    'Exclusive access to product releases before the general public',
    'Embark on thrilling bounties and challenges',
    'Open up a career path in Web 3.0',
    'Learn about entrepreneurship',
    'Unlock your inner data nerd',
    'Build your project',
    'Alpha Leaks'
  ]
  return (
    <>
      <p>
        <strong>Do you want this wicked-cool Alchemist 4.0 NFT ?</strong>
      </p>
      <br />
      <p>
        Be an alchemist and rank up to mint one and get others benefit like:
        <ul className="leading-6">
          {
            benefits.map((item) => {
              return (
                <li key={item}>
                  <div className="grid gap-1 grid-cols-[1rem_1fr]">
                    <div>🧪</div>
                    <div>{item}</div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </p>
      <br />
      <p>
        <strong>Become an Alchemist now!</strong>
      </p>
      <p>
        Next registration opens on Covalent Discord. Join <a href="/" target="_blank" rel="noopener noreferrer" className="underline-offset-4 underline text-primary-covalent">here</a>
      </p>
    </>
  )
}