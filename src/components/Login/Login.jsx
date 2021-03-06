import { fb } from 'service';
import { useState } from 'react';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

export const Login = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');
  const [active, setActive] = useState(false);
  const [btnState, setBtnState] = useState('buttonl');
  const [visible, setVisible] = useState(false);
  const defaultValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const login = ({ email, password }, { setSubmitting }) => {
    setServerError('logging...');
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 4000);
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        if (!res.user) {
          setServerError(
            'We\'re having trouble logging you in. Please try again.',
          );
          setTimeout(() => {
            setServerError('');
          }, 3000);
        }
      })
      .catch(err => {
        if (err.code === 'auth/wrong-password') {
          setServerError('Invalid Auth Credits !');
          setTimeout(() => {
            setServerError('');
          }, 3000);
        } else if (err.code === 'auth/user-not-found') {
          setServerError('No account With this Email');
          setTimeout(() => {
            setServerError('');
          }, 3000);
        } else {
          setServerError('Something went wrong :(');
          setTimeout(() => {
            setServerError('');
          }, 3000);
        }
      })
      .finally(() => setSubmitting(false));
  };


  return (
    <div className={'wrapper'}>
      <div className={'form'}>
        {
          visible ?
            (<div className='centerd'>
              <div className='wave'></div>
              <div className='wave'></div>
              <div className='wave'></div>
              <div className='wave'></div>
              <div className='wave'></div>
              <div className='wave'></div>
              <div className='wave'></div>
              <div className='wave'></div>
              <div className='wave'></div>
              <div className='wave'></div>
            </div>) : null
        }
        {!!serverError && <h2 className='error'>{serverError}</h2>}
        <h1 className={'title'}>Web Chat Application</h1>
        <Formik
          onSubmit={login}
          validateOnMount={true}
          initialValues={defaultValues}
          validationSchema={validationSchema}
        >
          {({ isValid, isSubmitting }) => {
            setActive(isValid && !isSubmitting);
            setBtnState(active ? 'buttonl' : 'buttonl disabled');
            return (<Form>
              <ErrorMessage name='email' component='h2' className={'error'} />
              <Field name='email' label='Email' type='email'
                     placeholder={'Email'}
                     className={'input'}
              />
              <ErrorMessage name='password' component='h2' className={'error'} />
              <Field name='password' label='Password' type='password'
                     placeholder={'Password'}
                     className={'input'}
              />
              <div align={'center'}>
                <button type={'submit'} className={btnState
                } disabled={!active}>
                  <span>Start Chatting</span>
                </button>
                <button type={'button'} className={'buttonl'} onClick={() => {
                  history.push('/register');
                }}>
                            <span>
                                Register
                            </span>
                </button>
              </div>
            </Form>);
          }}
        </Formik>
      </div>
    </div>
  );
};
