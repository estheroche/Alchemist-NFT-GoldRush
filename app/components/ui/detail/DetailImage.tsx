import { LazyVideo } from "../LazyVideo"

export const DetailImage = ({ url } : { url: string}) => {

  return (
    <div className='flex items-center justify-center rounded-lg p-0 lg:p-4 h-[100vw] max-h-[700px] lg:h-[calc(100vh_-_92px)]'>
      <div className='h-[90%] lg:h-full rounded-lg overflow-hidden'>
        <LazyVideo url={url} />
      </div>
    </div>
  )
}