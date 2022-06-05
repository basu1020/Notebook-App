import React,{useContext} from 'react'
import Login from './Login'
import Note from './Note'
import authContext from '../context/auth/authContext'

const Home = () => {
  const context = useContext(authContext)
  const { loggedIN } = context
  return (
    <>
      {!loggedIN && <Login/>}
      {loggedIN && <Note/>}
    </>
  )
}

export default Home