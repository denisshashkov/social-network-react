import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../UI/button/Button";
import classes from "./formStyles.module.scss";

const LoginForm = ({ submitHandler, captcha }) => {
  const validationsSchema = Yup.object().shape({
    email: Yup.string().required("Required field"),
    password: Yup.string().required("Required field"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          rememberMe: false,
          captcha: "",
        }}
        onSubmit={submitHandler}
        validationSchema={validationsSchema}
      >
        {({ errors, touched, status }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <div className={classes.input__wrapper}>
              <Field
                placeholder={"Email"}
                name={"email"}
                className={
                  errors.email && touched.email ? classes.error__border : null
                }
              />
            </div>
            {errors.email && touched.email ? (
              <p className={classes.error}>{errors.email}</p>
            ) : null}
            <label htmlFor="password">Password</label>
            <div className={classes.input__wrapper}>
              <Field
                placeholder={"Password"}
                type={"password"}
                name={"password"}
                className={
                  errors.password && touched.password
                    ? classes.error__border
                    : null
                }
              />
            </div>
            {errors.password && touched.password ? (
              <p className={classes.error}>{errors.password}</p>
            ) : null}
            <div className={classes.checkbox__wrapper}>
              <Field
                type={"checkbox"}
                name={"rememberMe"}
                className={classes.checkbox}
              />
              Remember me
            </div>

            {captcha && <img src={captcha} alt="captcha" />}
            {captcha && (
              <div>
                <Field
                  placeholder={"Insert captcha symbols"}
                  name={"captcha"}
                  className={
                    errors.captcha && touched.captcha
                      ? classes.error__border
                      : null
                  }
                />
              </div>
            )}

            {status ? <p className={classes.error}>{status.error}</p> : null}

            <div>
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
