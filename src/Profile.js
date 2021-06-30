import Card, { CardBody } from './components/card/Card'
import Button from './components/button/Button'
import { useCallback } from 'react'

const Profile = ({ user, onLogOut }) => {
  const logoutHandler = useCallback(() => {
    onLogOut()
  }, [onLogOut])

  return (
    <div className='centredContainer'>
      <Card>
        <CardBody>
          <h4 style={{ margin: 0 }}>{user.name} <Button onClick={logoutHandler}>LogOut</Button></h4>
        </CardBody>
      </Card>
    </div>
  )
}

export default Profile
