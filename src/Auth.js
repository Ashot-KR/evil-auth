import PropTypes from 'prop-types'
import Card, { CardBody } from './components/card/Card'
import SignInForm from './SignInForm'
import Tabs, { Tab, TabsBody, TabsList } from './components/tabs/Tabs'
import RegistrationForm from './RegistrationForm'
import { noop } from './util'

const Auth = ({ onSuccess }) => {
  return (
    <div>
      <div style={{ minWidth: '474px' }}>
        <Card>
          <CardBody>
            <h4 style={{ margin: 0 }}>Profile</h4>
          </CardBody>

          <Tabs>
            <TabsList style={{ padding: '0 32px' }}>
              <Tab>Sign In</Tab>
              <Tab>Registration</Tab>
            </TabsList>
            <TabsBody>
              {
                (activeTab) => {
                  let body
                  if (activeTab === 0) {
                    body = <SignInForm onSuccess={onSuccess} />
                  } else {
                    body = <RegistrationForm onSuccess={onSuccess} />
                  }

                  return <CardBody>{body}</CardBody>
                }
              }
            </TabsBody>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

Auth.propTypes = {
  onSuccess: PropTypes.func
}

Auth.defaultProps = {
  onSuccess: noop
}

export default Auth
