/* eslint-disable @next/next/no-img-element */
import { Button } from './button'

export const Error: React.FC<{ link: string, backToHome?: boolean }> = ({ link, backToHome = true }) => {
  return (
    <div className='min-h-[calc(100vh_-_102px)] flex gap-4 grid-cols-1 items-center justify-center p-4 h-[500px] sm:h-[600px] bg-cover bg-center'>
      <div className='w-[400px] max-w-full text-center leading-6'>
        <img src="/alchemist-logo.jpeg" alt="alchemist 4.0" className='w-full aspect-square rounded-lg' />
        <div className='font-bold text-2xl'>Oops Something Went Wrong!</div>
        <div className='my-4'>Hold on, alchemist! There&apos;s a temporary hiccup in the data flow. Let&apos;s try again, or concoct something different on the homepage</div>
        <div className={backToHome ? 'grid grid-cols-2 gap-4' : 'grid grid-cols-1 gap-4'}>
          <a href={`${link}`}>
            <Button variant="secondary" size="default" className='w-full '>Give it another shot!</Button>
          </a>
          {
            backToHome &&
            <a href="/">
              <Button variant="secondary" size="default" className='w-full'>Head Back to HQ</Button>
            </a>
          }
        </div>
      </div>
    </div>
  )
}