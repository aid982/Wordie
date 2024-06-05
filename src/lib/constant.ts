
import Category from '@/components/icons/category'
import Logs from '@/components/icons/clipboard'
import Templates from '@/components/icons/cloud_download'
import Home from '@/components/icons/home'
import Payment from '@/components/icons/payment'
import Settings from '@/components/icons/settings'
import Workflows from '@/components/icons/workflows'
export const clients = [...new Array(10)].map((client, index) => ({
  href: `/${index + 1}.png`,  

}));

export const menuOptions = [
  { id:1,name: 'Dashboard', Component: Home, href: '/dashboard' },
  { id:2,name: 'Add words in JSON', Component: Workflows, href: '/dashboard/add_json' },
  { id:3,name: 'Settings', Component: Settings, href: '/dashboard/settings' },
  { id:4,name: 'Schare vocapluary', Component: Category, href: '/dashboard/share' },  
]


