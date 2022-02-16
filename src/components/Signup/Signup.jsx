import { fb } from 'service';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

// import { defaultValues, validationSchema } from './formikConfig';

export const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);
  const [btnState,setBtnState] = useState("button");
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
            "Something Uncommon Happened :( please try again !",
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
            "Something Uncommon Happened :( please try again !",
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
      <div className={"form"}>
      {!!serverError && <h2 className="error">{serverError}</h2>}
        <h1 className={"title"}>Web Chat Application</h1>
        <Formik
          onSubmit={signup}
          validateOnMount={true}
          initialValues={defaultValues}
          validationSchema={validationSchema}
        >
          {({isValid, isSubmitting}) => {
            setActive(isValid && !isSubmitting);
            setBtnState(active ? "button" : "button disabled")
            return (
              <Form>
                <ErrorMessage name="userName" component="h2" className={"error"}/>
                <Field name="userName" label="User Name" className={"input"}
                       placeholder={"Username"}/>
                <ErrorMessage name="email" component="h2" className={"error"}/>
                <Field name="email" label="Email" type="email" className={"input"}
                       placeholder={"Email"}/>
                <ErrorMessage name="password" component="h2" className={"error"}/>
                <Field name="password" label="Password" type="password"
                       className={"input"} placeholder={"Password"}/>
                <ErrorMessage name="verifyPassword" component="h2" className={"error"}/>
                <Field name="verifyPassword" label="Password" type="password" className={"input"}
                       placeholder={"Confirm password"}/>
                <div align={"center"}>
                  <button type={"submit"} className={btnState
                  } disabled={!active}>
                    <span>Register User</span>
                  </button>
                  <button type={"button"} className={"button"} onClick={() => {
                    history.push('/login');
                  }}>
                            <span>
                                Back to login
                            </span>
                  </button>
                </div>
                {/*<h2 className={"error"}>{error}</h2>*/}
              </Form>)
          }}
        </Formik>
      </div>
    </div>
  );

  // return (
  //   <div className="auth-form">
  //     <h1>Signup</h1>
  //     <Formik
  //       onSubmit={signup}
  //       validateOnMount={true}
  //       initialValues={defaultValues}
  //       validationSchema={validationSchema}
  //     >
  //       {({ isValid, isSubmitting }) => (
  //         <Form>
  //           <FormField name="userName" label="User Name" />
  //           <FormField name="email" label="Email" type="email" />
  //           <FormField name="password" label="Password" type="password" />
  //           <FormField
  //             type="password"
  //             name="verifyPassword"
  //             label="Verify Password"
  //           />
  //
  //           <div className="auth-link-container">
  //             Already have an account?{' '}
  //             <span className="auth-link" onClick={() => history.push('login')}>
  //               Log In!
  //             </span>
  //           </div>
  //
  //           <button disabled={isSubmitting || !isValid} type="submit">
  //             Sign Up
  //           </button>
  //         </Form>
  //       )}
  //     </Formik>
  //

  //   </div>
  // );
};
