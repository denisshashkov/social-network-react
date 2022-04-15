import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import classes from "./formStyles.module.scss";

const LoginForm = ({ submitHandler }) => {
  const validationsSchema = Yup.object().shape({
    email: Yup.string().required("Required field"),
    password: Yup.string().required("Required field"),
  });

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        onSubmit={submitHandler}
        validationSchema={validationsSchema}
      >
        {({ errors, touched, status }) => (
          <Form>
            <div>
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
            <div>
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
            <div>
              <Field type={"checkbox"} name={"rememberMe"} />
              Remember me
            </div>

            {status ? <p className={classes.error}>{status.error}</p> : null}

            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
