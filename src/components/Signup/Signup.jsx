import { fb } from 'service';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');
  const [active, setActive] = useState(false);
  const [btnState, setBtnState] = useState('buttonl');
  const [visible, setVisible] = useState(false);
  const defaultValues = {
    email: '',
    password: '',
    userName: '',
    verifyPassword: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required').min(8, 'Must be at least 8 characters'),
    verifyPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    userName: Yup.string().required('Required').matches(/^\S*$/, 'No spaces').min(3, 'Must be at least 3 characters'),
  });
  const signup = ({ email, userName, password }, { setSubmitting }) => {
    setServerError('signing up...');
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 4000);
    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res?.user?.uid) {
          fetch('/api/createUser', {
            method: 'POST',
            body: JSON.stringify({
              userName,
              userId: res.user.uid,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(() => {
            fb.firestore
              .collection('chatUsers')
              .doc(res.user.uid)
              .set({ userName, avatar: '' });
          });
        } else {
          setServerError(
            'Something Uncommon Happened :( please try again !',
          );
          setTimeout(() => {
            setServerError('');
          }, 3000);
        }
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          setServerError('User with this email already exists!');
          setTimeout(() => {
            setServerError('');
          }, 3000);
        } else {
          setServerError(
            'Something Uncommon Happened :( please try again !',
          );
          setTimeout(() => {
            setServerError('');
          }, 3000);
        }
      })
      .finally(() => {
        (setTimeout(() => {
          setServerError('');
        }, 3000));
        setSubmitting(false);
      });
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
          onSubmit={signup}
          validateOnMount={true}
          initialValues={defaultValues}
          validationSchema={validationSchema}
        >
          {({ isValid, isSubmitting }) => {
            setActive(isValid && !isSubmitting);
            setBtnState(active ? 'buttonl' : 'buttonl disabled');
            return (
              <Form>
                <ErrorMessage name='userName' component='h2' className={'error'} />
                <Field name='userName' label='User Name' className={'input'}
                       placeholder={'Username'} />
                <ErrorMessage name='email' component='h2' className={'error'} />
                <Field name='email' label='Email' type='email' className={'input'}
                       placeholder={'Email'} />
                <ErrorMessage name='password' component='h2' className={'error'} />
                <Field name='password' label='Password' type='password'
                       className={'input'} placeholder={'Password'} />
                <ErrorMessage name='verifyPassword' component='h2' className={'error'} />
                <Field name='verifyPassword' label='Password' type='password' className={'input'}
                       placeholder={'Confirm password'} />
                <div align={'center'}>
                  <button type={'submit'} className={btnState
                  } disabled={!active}>
                    <span>Register User</span>
                  </button>
                  <button type={'button'} className={'buttonl'} onClick={() => {
                    history.push('/login');
                  }}>
                            <span>
                                Back to login
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
