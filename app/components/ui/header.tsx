'use client';

/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { TwitterIcon } from "./Icons"
import { DiscordLogoIcon } from "@radix-ui/react-icons"
import { Button } from './button'
import data from '../../lib/data.json'

export const Header = () => {
  return (
    <div className="sticky bg-card top-0 z-[10]">
      <div className="max-w-[1665px] mx-auto flex items-center justify-between py-3 px-4 lg:px-8 xl:px-16">
        <Link href="/"><img src="/alchemist-logo.jpeg" className="rounded-full w-12 h-12" alt="" /></Link>
        <div className="flex items-center">
          <a href={data.socialMedia.x} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="focus-visible:ring-0">
              <TwitterIcon className="w-3 h-3 fill-primary" />
            </Button>
          </a>
          <a href={data.socialMedia.discord} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="focus-visible:ring-0">
              <DiscordLogoIcon className="w-4 h-4" />
            </Button>
          </a>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}