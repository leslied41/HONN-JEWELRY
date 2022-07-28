import React, { useEffect, useState, useLayoutEffect } from 'react'
var debounce = require('lodash.debounce')

export const useViewportWidth = () => {
  const [viewWidth, setViewWidth] = useState<number>()
  useLayoutEffect(() => {
    setViewWidth(window.innerWidth)
  }, [])
  useEffect(() => {
    const getWidth = () => {
      return setViewWidth(window.innerWidth)
    }
    const debounceFn = debounce(getWidth, 200)
    window.addEventListener('resize', debounceFn)
    return () => {
      window.removeEventListener('resize', debounceFn)
    }
  }, [])
  return viewWidth
}
