import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  useEffect(()=>{
    router.push("dashboard")
  },[])
  return (
    <div className={styles.container}>
      <Head>
        <title>CookiePOS</title>
        <meta name="description" content="free cashier app" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Loading dashboard...
        </h1>
      </main>
    </div>
  )
}
