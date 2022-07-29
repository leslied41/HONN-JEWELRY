import React from 'react'
import s from './Intro.module.css'
import Image from 'next/image'

interface Props {}

const Intro = (props: Props) => {
  return (
    <>
      {/* lg screen */}
      <div className="grid-cols-6 text-brown hidden md:grid">
        <div className="col-span-2 relative">
          <img
            src="/landing_pic3.png"
            alt="flower pic"
            className="absolute -top-60 z-10 h-[610px] w-auto"
          />
        </div>
        <div className="col-span-4 text-h1-s font-kessler lg:text-h1 mt-32 mb-12">
          <p className="ml-8">THE</p>
          <p>CRAFTSMANSHIP</p>
          <p className="ml-4">AND EXPERTISE SERVICES</p>
        </div>
      </div>
      <div className="hidden md:grid grid-cols-6 gap-x-7">
        <div className="col-span-3">
          <div className="ml-10 ">
            <Image
              layout="intrinsic"
              src="/landing_pic2.png"
              width="529px"
              height="548px"
              className="z-20"
            />
          </div>
        </div>
        <div className="col-span-3 flex flex-col  gap-y-[208px] ">
          <p className="mr-[5.5rem] text-body-1 text-darkGray">
            Honn Fine Jewelry is a Stockholm based jewelry brand since 2013. We
            have the craftsmanship and expertise to bring your inspiration to
            life. Whether you already have a singular idea, need help designing
            something unique, or just want help in your search for the perfect
            piece of jewelry for that special occasion - we are here to help.
          </p>
          <div className="relative w-fit">
            <img
              src="/landing_pic1.png"
              className="md:w-[248px] md:h-[210px] lg:w-[330px] lg:h-[280px]  xl:w-[395px] xl:h-[335px]"
            />
            <img
              src="/landing_pic4.png"
              alt="light pic"
              className="absolute   md:top-[140px] md:left-[120px]  lg:top-[190px] xl:top-[220px] lg:left-[165px] xl:left-[188px]"
            />
          </div>
        </div>
      </div>
      <div className="hidden md:grid grid-cols-6 text-brown gap-x-7">
        <div className="col-span-1"></div>
        <div className="col-span-5 mb-[7.5rem] justify-self-start mt-20">
          <p className="text-primary font-kessler text-h1">MADE </p>
          <p className="text-primary ml-10 font-kessler text-h1">FOR YOU</p>
          <p className="text-body-1 text-darkGray ml-10  mt-12  max-w-md">
            Honn Fine Jewelry is a Stockholm based jewelry brand since 2013. We
            have the craftsmanship and expertise to bring your inspiration to
            life. Whether you already have a singular idea, need help designing
            something unique, or just want help in your search for the perfect
            piece of jewelry for that special occasion - we are here to help.
          </p>
        </div>
      </div>
      {/* small screen */}
      <div className="grid grid-cols-7 gap-x-5 md:hidden">
        <div className="col-span-4 mt-[58px] w-full">
          <img src="/landing_pic2.png" alt="landing_pic2" />
        </div>
        <div className="col-span-3  w-full ">
          <img src="/landing_pic3.png" alt="flower pic" />
          <img src="/landing_pic1.png" />
          <img
            src="/landing_pic4.png"
            alt="light pic"
            className="relative -top-8 z-10"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-16 mx-4 relative -top-40 z-20 md:hidden">
        <div className="col-span-1">
          <p className="text-h2 font-kessler text-brown uppercase">the</p>
          <p className="text-h2 font-kessler text-brown uppercase">
            craftsmanship
          </p>
          <p className="text-h2 font-kessler text-brown uppercase">
            and expertise
          </p>
          <p className="text-h2 font-kessler text-brown uppercase">Services</p>
          <p className="text-darkGray text-body-1 mt-6 ">
            Honn Fine Jewelry is a Stockholm based jewelry brand since 2013. We
            have the craftsmanship and expertise to bring your inspiration to
            life. Whether you already have a singular idea, need help designing
            something unique, or just want help in your search for the perfect
            piece of jewelry for that special occasion - we are here to help.
          </p>
        </div>
        <div className="col-span-1">
          <p className="text-h2 text-brown uppercase">Made for you </p>
          <p className="text-darkGray text-body-1 mt-6">
            Honn Fine Jewelry is a Stockholm based jewelry brand since 2013. We
            have the craftsmanship and expertise to bring your inspiration to
            life. Whether you already have a singular idea, need help designing
            something unique, or just want help in your search for the perfect
            piece of jewelry for that special occasion - we are here to help.
          </p>
        </div>
      </div>
    </>
  )
}
export default Intro
