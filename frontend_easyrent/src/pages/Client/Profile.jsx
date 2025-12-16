import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthProvider'

function Profile() {

  const { user } = useContext(AuthContext)
  return (
    <div>Hello {user?.nom}</div>
  )
}

export default Profile