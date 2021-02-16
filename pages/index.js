import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ninja List | Home</title>
        <meta name="keyword" content="ninjas" />
      </Head>
      <h1 className={styles.title}>Homepage</h1>
      <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, reprehenderit sapiente. Deleniti saepe vel vero asperiores repudiandae, eaque magni assumenda.</p>
      <Link href="/ninjas">
        <a className={styles.btn}>See Ninja Listing</a>
      </Link>
    </div>
  )
}
