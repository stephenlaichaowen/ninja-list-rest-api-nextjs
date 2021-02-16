import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="logo">
          <Image src="/logo.png" width={128} height={77} />
        </div>
        <Link href="/"><a>Home</a></Link>
        <Link href="/about"><a>About</a></Link>
        <Link href="/ninjas"><a>Ninja Listing</a></Link>
        <Link href="/create"><a>Create Ninja</a></Link>
      </nav>
      <style jsx>{`
        @media (max-width: 360px) {
          
        }
      `}</style>
    </div>
  );
}

export default Navbar;