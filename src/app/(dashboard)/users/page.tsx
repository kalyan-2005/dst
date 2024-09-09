import { getAllSensors, getAllUsers, getCurrentUser } from '@/actions/getCurrentUser'
import UsersTable from '@/components/usersTable'
import React from 'react'

async function page() {
  const users = await getAllUsers();
  const sensors = await getAllSensors();
  const currentUser = await getCurrentUser();
  return (
    <div>
      <UsersTable users={users} sensors={sensors} currentUser={currentUser}/>
    </div>
  )
}

export default page