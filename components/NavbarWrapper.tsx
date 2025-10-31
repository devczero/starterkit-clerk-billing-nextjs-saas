import { hasProPlan } from '@/lib/subscription'
import Navbar from './Navbar'

export default async function NavbarWrapper() {
  const hasPro = await hasProPlan()
  return <Navbar hasPro={hasPro} />
}
