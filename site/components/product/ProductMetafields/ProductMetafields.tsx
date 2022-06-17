import React from 'react'
import Carat from '../Carat'
import ColorOption from '../ColorOption'
import { Variant, SquareGroupOption } from '../SquareGroupOption'
import DropdownOption from '../DropdownOption'
import InputOption from '../InputOption'
interface Props {}

const ProductMetafelds = (props: Props) => {
  return (
    <div>
      <ColorOption variant="A" className="mt-6" />
      <Carat className="mt-6" />
      <SquareGroupOption variant={Variant.A} className="mt-6" />
      <SquareGroupOption variant={Variant.B} className="mt-6" />
      <SquareGroupOption variant={Variant.C} className="mt-6" />
      <SquareGroupOption variant={Variant.D} className="mt-6" />
      <DropdownOption variant="B" className="mt-10" />
      <InputOption className="mt-6" />
      <ColorOption variant="B" className="mt-6" />
    </div>
  )
}
export default ProductMetafelds
