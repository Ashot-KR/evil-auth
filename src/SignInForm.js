import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import { useCallback } from 'react'
import * as yup from 'yup'
import { FormikInput } from './components/form/Input'
import Button from './components/button/Button'
import FormRow from './components/form/FormRow'
import api from './api'
import { noop, userStorage } from './util'
import { FormikCheckBox } from './components/form/CheckBox'

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  remember: yup.bool()
})

const SignInForm = ({ onSuccess }) => {
  const submitHandler = useCallback(async ({ remember, ...values }, actions) => {
    try {
      const res = await api.post('/login', values)
      onSuccess(res)

      if (remember) {
        userStorage.set(res.user)
      }
    } catch (e) {
      actions.setErrors(e.response.errors)
    }
  }, [onSuccess])

  return (
    <Formik
      validateOnMount
      validationSchema={validationSchema}
      initialValues={{
        email: '',
        password: '',
        remember: false
      }}
      onSubmit={submitHandler}
    >
      {
        ({ isSubmitting }) => {
          return (
            <Form>
              <FormRow>
                <FormikInput
                  label='Email'
                  name='email'
                />
              </FormRow>

              <FormRow>
                <FormikInput
                  type='password'
                  label='Password'
                  name='password'
                />
              </FormRow>

              <FormRow>
                <FormikCheckBox name='remember' label='Remember me' />
              </FormRow>

              <FormRow>
                <Button block loading={isSubmitting} type='submit'>SignIn</Button>
              </FormRow>
            </Form>
          )
        }
      }
    </Formik>
  )
}

SignInForm.propTypes = {
  onSuccess: PropTypes.func
}

SignInForm.defaultProps = {
  onSuccess: noop
}

export default SignInForm
