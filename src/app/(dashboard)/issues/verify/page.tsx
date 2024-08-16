import { getIssuesForUser } from '@/actions/issues'
import React from 'react'

async function page() {
  const issues = await getIssuesForUser("VERIFY");
  return (
    <div>
      <h1>Verify Issues</h1>
      {
        JSON.stringify(issues)
      }
    </div>
  )
}

export default page