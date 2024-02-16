import { NftTokenContract } from "@covalenthq/client-sdk"
import { IconProps } from "@radix-ui/react-icons/dist/types"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import { URL } from "url"

export type GridValue = "grid-6" | "grid-4" | "no-dec" | "list" 

export interface IGridObject {
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>,
  value: GridValue
}

export interface IPropsImage {
  src: string
  alt: string
  classname: string
}

export interface IDetailCollection {
  loading: boolean
  totalItems: number
}

export interface IListNft {
  loading: boolean
  listNft: NftTokenContract[]
}

export interface ISocialMediaShare {
  icon: ({ className }: { className: string; }) => JSX.Element
  color: string
  iconColor: string
  link: URL
}