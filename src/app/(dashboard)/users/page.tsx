import { getAllSensors, getAllUsers } from '@/actions/getCurrentUser'
import UsersTable from '@/components/usersTable'
import React from 'react'

async function page() {
  const users = await getAllUsers();
  const sensors = await getAllSensors();
  return (
    <div>
      <UsersTable users={users} sensors={sensors}/>
    </div>
  )
}

export default page