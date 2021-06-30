import PropTypes from 'prop-types'
import useClassNameMemo from '../../hooks/useClassNameMemo'

import css from './Button.module.css'

const Button = ({ className, block, loading, ...props }) => {
  const clsName = useClassNameMemo(() => {
    return [css.btn, block && css.block, loading && css.loading, className]
  }, [className, loading, block])

  return <button {...props} className={clsName} />
}

Button.propTypes = {
  block: PropTypes.bool,
  className: PropTypes.string
}

export default Button
