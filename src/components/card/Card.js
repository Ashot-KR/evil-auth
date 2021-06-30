import useClassNameMemo from '../../hooks/useClassNameMemo'

import css from './Card.module.css'

const Card = ({ className, ...props }) => {
  const clsName = useClassNameMemo(() => {
    return [css.card, className]
  }, [className])
  return <div className={clsName} {...props} />
}

export default Card

export const CardBody = ({ className, ...props }) => {
  const clsName = useClassNameMemo(() => {
    return [css.cardBody, className]
  }, [className])

  return <div className={clsName} {...props} />
}
