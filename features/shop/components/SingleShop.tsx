
import { NavBar } from '@/features/components'
import Header from './Header'
import ProductCards from './ProductCards'

const SingleShop = () => {
  return (
    <div className={`flex flex-col gap-4 py-5`}>
      <NavBar logo={`/Dark@2xTransparent.png`} />
      <Header />
      <ProductCards />
    </div>
  )
}

export default SingleShop