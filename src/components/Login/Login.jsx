import { fb } from 'service';
import { useState } from 'react';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { FormField } from 'components/FormField/FormField';
import { validationSchema, defaultValues } from './formikConfig';

export const Login = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);
  const [btnState, setBtnState] = useState('button');
  const login = ({ email, password }, { setSubmitting }) => {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        if (!res.user) {
          setServerError(
            'We\'re having trouble logging you in. Please try again.',
          );
        }
      })
      .catch(err => {
        if (err.code === 'auth/wrong-password') {
          setServerError('Invalid Auth Credits !');
        } else if (err.code === 'auth/user-not-found') {
          setServerError('No account With this Email');
        } else {
          setServerError('Something went wrong :(');
        }
      })
      .finally(() => setSubmitting(false));
  };


  return (


    <div className={'wrapper'}>
      {!!serverError && <div className='error'>{serverError}</div>}
      <div className={'form'}>
        <h1 className={'title'}>Web Chat Application</h1>
        <Formik
          onSubmit={login}
          validateOnMount={true}
          initialValues={defaultValues}
          validationSchema={validationSchema}
        >
          {({ isValid, isSubmitting }) => {
            setActive(isValid && !isSubmitting);
            setBtnState(active ? 'button' : 'button disabled');
            return (<form>
              <ErrorMessage name='email' component='h2' className={'error'} />
              <Field name='email' label='Email' type='email' value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     placeholder={'Email'}
                     className={'input'}
                     required
              />
              <ErrorMessage name='password' component='h2' className={'error'} />
              <Field name='password' label='Password' type='password'
                     value={password} onChange={(e) => setPassword(e.target.value)}
                     placeholder={'Password'}
                     className={'input'}
                     required
              />
              <div align={'center'}>
                <button type={'submit'} className={btnState
                } disabled={!active}>
                  <span>Start Chatting</span>
                </button>
                <button type={'button'} className={'button'} onClick={() => {
                  history.push('/register');
                }}>
                            <span>
                                Register
                            </span>
                </button>
                {/*<button type='button' className='button' onClick={() => {*/}
                {/*}} style={{ justifyContent: 'center', alignItems: 'center' }}>*/}
                {/*</button>*/}
              </div>
            </form>);
          }}
        </Formik>
      </div>
    </div>
  );


  // return (
  //   <div className="wrapper">
  //     <div className={"form"}>
  //     <h1>Login</h1>
  //     <Formik
  //       onSubmit={login}
  //       validateOnMount={true}
  //       initialValues={defaultValues}
  //       validationSchema={validationSchema}
  //     >
  //       {({ isValid, isSubmitting }) => (
  //         <Form>
  //           <FormField name="email" label="Email" type="email" />
  //           <FormField name="password" label="Password" type="password" />
  //
  //           <div className="auth-link-container">
  //             Don't have an account?{' '}
  //             <span
  //               className="auth-link"
  //               onClick={() => history.push('signup')}
  //             >
  //               Sign Up!
  //             </span>
  //           </div>
  //
  //           <button type="submit" disabled={!isValid || isSubmitting}>
  //             Login
  //           </button>
  //         </Form>
  //       )}
  //     </Formik>
  //
  //     {!!serverError && <div className="error">{serverError}</div>}
  //     </div>
  //   </div>
  // );
};
