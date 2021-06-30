import PropTypes from 'prop-types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useClassNameMemo from '../../hooks/useClassNameMemo'

import css from './Input.module.css'
import { useTransition, animated, config } from 'react-spring'
import { useField } from 'formik'

export const ErrorMessage = ({ ...props }) => {
  return (
    <div {...props} className={css.errorMessage} />
  )
}

const Input = ({ label, onChange, className, error, ...props }) => {
  const [hasValue, setHasValue] = useState(!!props.value)

  const clsName = useClassNameMemo(() => {
    return [css.inputRoot, className, { [css.filled]: hasValue, [css.hasError]: !!error }]
  }, [hasValue, error])

  const changeHandler = useCallback((e) => {
    setHasValue(!!e.target.value)

    onChange(e)
  }, [setHasValue, onChange])

  const errorTransition = useTransition(error, {
    keys: (err) => err ? 'err' : 'none',
    from: { opacity: 0, marginTop: '-27px' },
    enter: { opacity: 1, marginTop: '0px' },
    leave: { opacity: 0, marginTop: '-27px' },
    config: {
      ...config.molasses,
      duration: 50
    }
  })

  return (
    <div className={clsName}>
      <div className={css.wrapper}>
        <input onChange={changeHandler} className={css.input} {...props} />
        <label className={css.label}>{label}</label>
      </div>
      {
        errorTransition((styles, err) => {
          return err && <animated.div style={styles} className={css.errorContainer}><ErrorMessage>{err}</ErrorMessage></animated.div>
        })
      }
    </div>
  )
}

Input.propTypes = {
  className: PropTypes.string,
  error: PropTypes.node,
  label: PropTypes.node,
  onChange: PropTypes.func,
  value: PropTypes.string
}

Input.defaultProps = {
  onChange: () => {}
}

export default Input

export const FormikInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return <Input label={label} error={meta.touched && meta.error} {...props} {...field} />
}

FormikInput.propTypes = {
  label: PropTypes.node
}
