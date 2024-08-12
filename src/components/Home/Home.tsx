import React from 'react'
import { Header } from '../Header/Header.tsx'
import { Userform } from '../UserDetails/Userform.tsx'

export const Home = () => {
  return (
     <div className="container">
        <Header/>
        <main>
           <Userform/>
        </main>
     </div>
  )
}
