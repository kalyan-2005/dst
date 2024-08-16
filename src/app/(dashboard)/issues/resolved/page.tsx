import { getIssuesForUser } from '@/actions/issues'
import React from 'react'

async function page() {
  const issues = await getIssuesForUser("CLOSE");
  return (
    <div>
      <h1>Resolved Issues</h1>
      {
        JSON.stringify(issues)
      }
    </div>
  )
}

export default page