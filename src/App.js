import Auth from './Auth'
import { useCallback, useState } from 'react'
import Profile from './Profile'
import { useTransition, animated, config } from 'react-spring'
import { userStorage } from './util'

function App () {
  const [user, setUser] = useState(userStorage.get() || null)
  const transitions = useTransition(user, {
    from: { opacity: 0, scale: 1.5, filter: 'blur(10px)' },
    enter: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    leave: { opacity: 0, scale: 1.5, filter: 'blur(10px)' },
    config: config.stiff
  })

  const authHandler = useCallback((res) => {
    setUser(res.user)
  }, [setUser])

  const logoutHandler = useCallback(() => {
    setUser(null)
    userStorage.clear()
  }, [setUser])

  return transitions(
    (style, user) => {
      return (
        user
          ? <Profile user={user} onLogOut={logoutHandler} />
          : (
            <animated.div className={'centredContainer auth'} style={style}>
              <Auth onSuccess={authHandler} />
            </animated.div>
            )
      )
    })
}

export default App
