// CSS
import './globals.css'

import Link from "next/link"

export default function Home() {
  return (
    <div className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'>
    <div>
      <Link href={"/movieTrackersApp"}>Appli Trackers de FILMS</Link>
    </div>
    <div>
      <Link href={"/TestApiAxiosEtFetch"}>TestApiAxiosEtFetch</Link>
    </div>
    <div>
      <Link href={"/testApiBook"}>TestAPI Book</Link>
    </div>
    <div>
      <Link href={"/testMovieApi"}>TestAPI Movies</Link>
    </div>
    {/* <div>
      <Link href={"/forme"}>Forme !!!</Link>
    </div> */}
    <div className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'
    >------------</div>
  </div>
  )
}
