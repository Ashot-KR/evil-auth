import useClassNameMemo from '../../hooks/useClassNameMemo'

import css from './FormRow.module.css'

const FormRow = ({ className, ...props }) => {
  const clsName = useClassNameMemo(() => {
    return [css.row, className]
  }, [className])

  return (
    <div className={clsName} {...props} />
  )
}

export default FormRow
