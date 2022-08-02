import styles from './Home.module.css'

import React from 'react'
import TransactionForm from './TransactionForm'
import {useAuthContext} from '../../hooks/useAuthContext'
export default function Home() {
  const{user}=useAuthContext()
  return (
    <div className={styles.container}>
      <div className={styles.content}>Transaction list</div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid}></TransactionForm>
      </div>
    </div>
  )
}
