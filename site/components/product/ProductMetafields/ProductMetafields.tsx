import React from 'react'
import Carat from '../Carat'
import ColorOption from '../ColorOption'
import { Variant, SquareGroupOption } from '../SquareGroupOption'

interface Props {}

const ProductMetafelds = (props: Props) => {
  return (
    <div>
      <ColorOption variant="A" />
      <Carat />
      <SquareGroupOption variant={Variant.A} />
      <SquareGroupOption variant={Variant.B} />
      <SquareGroupOption variant={Variant.C} />
      <SquareGroupOption variant={Variant.D} />
      <ColorOption variant="B" />
      <SquareGroupOption variant={Variant.E} layout="A" />
    </div>
  )
}
export default ProductMetafelds
