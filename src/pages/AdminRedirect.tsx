import { useEffect } from 'react'
export default function AdminRedirect() {
  useEffect(() => {
    window.location.replace('https://dang.pestflowpro.com/admin/login')
  }, [])
  return <p>Redirecting to dashboard...</p>
}
