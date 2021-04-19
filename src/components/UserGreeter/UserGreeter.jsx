import React from 'react'

export const UserContext = React.createContext()

function UserGreeter() {
  const user = React.useContext(UserContext)

  if (!user) return 'Hello stranger!'
  return `Hello ${user.name}!`
}

export default UserGreeter
