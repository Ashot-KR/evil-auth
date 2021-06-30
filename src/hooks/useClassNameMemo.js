import { useMemo } from 'react'
import cc from 'classcat'

const useClassNameMemo = (fn, input) => {
  return useMemo(() => {
    return cc(fn())
  }, input)
}

export default useClassNameMemo
