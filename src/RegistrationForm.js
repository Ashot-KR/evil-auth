import PropTypes from 'prop-types'
import { Form, Formik } from 'formik'
import { useCallback } from 'react'
import * as yup from 'yup'

import FormRow from './components/form/FormRow'
import { FormikInput } from './components/form/Input'
import Button from './components/button/Button'
import api from './api'
import { noop } from './util'
import { FormikCheckBox } from './components/form/CheckBox'

const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  passwordRepeat: yup.string().required()
    .test(
      'match',
      'Passwords do not match', // your error message
      (value, { parent }) => {
        return parent.password === parent.passwordRepeat
      }
    ),
  accept: yup.bool().required().oneOf([true], 'You should accept terms')
})

const RegistrationForm = ({ onSuccess }) => {
  const submitHandler = useCallback(async (values, actions) => {
    try {
      const res = await api.post('/register', values)

      onSuccess(res)
    } catch (e) {
      actions.setErrors(e.response.errors)
    }
  }, [])

  return (
    <Formik
      validateOnMount
      validationSchema={validationSchema}
      initialValues={{
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
        accept: false
      }}
      onSubmit={submitHandler}
    >
      {
        ({ isSubmitting, isValid }) => {
          return (
            <Form>
              <FormRow>
                <FormikInput
                  name='name'
                  label='Full name'
                />
              </FormRow>

              <FormRow>
                <FormikInput
                  name='email'
                  label='Email'
                />
              </FormRow>

              <FormRow>
                <FormikInput
                  type='password'
                  name='password'
                  label='Password'
                />
              </FormRow>

              <FormRow>
                <FormikInput
                  type='password'
                  name='passwordRepeat'
                  label='Repeat password'
                />
              </FormRow>

              <FormRow>
                <FormikCheckBox name='accept' label={<>I accept the terms of the offer of the <a href='#'>privacy policy</a></>} />
              </FormRow>

              <FormRow>
                <Button loading={isSubmitting} block type='submit'>Register</Button>
              </FormRow>
            </Form>
          )
        }
      }
    </Formik>
  )
}

RegistrationForm.propTypes = {
  onSuccess: PropTypes.func
}

RegistrationForm.defaultProps = {
  onSuccess: noop
}

export default RegistrationForm
