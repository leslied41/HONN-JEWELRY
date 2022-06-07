import cn from 'clsx'
import Image from 'next/image'
import s from './ProductView.module.css'
import usePrice from '@framework/product/use-price'
import { Container, Text } from '@components/ui'
import { SEO } from '@components/common'
import ProductSidebar from '../ProductSidebar'
import ProductPicsbar from '../ProductPicsbar'
import Link from 'next/link'
import { useProductContext } from '../productProvider'

const ProductView = () => {
  const { product, allProducts } = useProductContext()
  const relatedProducts = allProducts.slice(0, 3)
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  return (
    <>
      <Container className="max-w-none w-full" clean>
        <div className={cn(s.root, 'fit ')}>
          <ProductPicsbar className={s.main} />
          <ProductSidebar key={product.id} className={s.sidebar} />
        </div>

        <section className="py-12 px-10 mb-10">
          <div className="grid grid-cols-3 gap-x-5 mb-10">
            <div></div>
            <div>
              <p className="text-lg text-center">YOU MAY ALSO LIKE</p>
            </div>
            <div></div>
          </div>
          <div className="grid grid-cols-3 gap-x-5">
            {relatedProducts.map((p) => {
              return (
                <div key={p.id} className="col-span-1">
                  <Link href={`/product/${p.slug}`}>
                    <a aria-label={p.name}>
                      <Image
                        quality="85"
                        src={p.images[0]?.url}
                        alt={p.name || 'Product Image'}
                        height={500}
                        width={360}
                        layout="responsive"
                      />
                    </a>
                  </Link>
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-3 mx-[142px] gap-x-5 mt-[120px]">
            <div>
              <div className="text-center mb-10">
                <img
                  src="/Group19.png"
                  alt="group19"
                  className="inline-block"
                />
              </div>
              <p className="text-center mb-4 text-base-1">TRUE SUSTANIBILITY</p>
              <p className="text-base text-basic">
                Sustainably grown in America, our diamonds are the world’s first
                diamonds produced with zero carbon footprint. Each diamond is
                cut and polished internationally by master craftsmen in our
                workshops.
              </p>
              <div className="mt-4">
                <a href="" className="border-b-2 ">
                  READ MORE
                </a>
              </div>
            </div>
            <div>
              <div className="text-center mb-10">
                <img
                  src="/Group20.png"
                  alt="group19"
                  className="inline-block"
                />
              </div>
              <p className="text-center mb-4 text-base-1">TRUE SUSTANIBILITY</p>
              <p className="text-base text-basic">
                Each made to order piece is designed by our master craftsmen and
                individually cast using recycled gold within 10 business days.
              </p>
              <div className="mt-4">
                <a href="" className="border-b-2 ">
                  READ MORE
                </a>
              </div>
            </div>
            <div>
              <div className="text-center mb-10">
                <img
                  src="/Group21.png"
                  alt="group19"
                  className="inline-block"
                />
              </div>
              <p className="text-center mb-4 text-base-1">TRUE SUSTANIBILITY</p>
              <p className="text-base text-basic">
                Refined to the very last detail, our designers create fine
                jewelry that spotlight your diamond first and foremost. With a
                desire to do things differently, we only work with the highest
                quality materials and reimagine timeless designs.
              </p>
              <div className="mt-4">
                <a href="" className="border-b-2 ">
                  READ MORE
                </a>
              </div>
            </div>
          </div>
        </section>
      </Container>
      <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: '800',
              height: '600',
              alt: product.name,
            },
          ],
        }}
      />
    </>
  )
}

export default ProductView
