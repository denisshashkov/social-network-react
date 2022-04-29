import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../UI/button/Button";
import classes from "./formStyles.module.scss";

const validationsSchema = Yup.object().shape({
  message: Yup.string().max(50, "Max length 50 symbols!"),
});

const AddMessageForm = ({ submitHandler }) => {
  return (
    <div>
      <Formik
        initialValues={{ id: Date.now(), message: "" }}
        onSubmit={submitHandler}
        validationSchema={validationsSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              className={
                errors.message && touched.message ? classes.error__border : null
              }
              placeholder="Enter your message"
              name="message"
              component="textarea"
            />
            {errors.message && touched.message ? (
              <p className={classes.error}>{errors.message}</p>
            ) : null}
            <div>
              <Button type="submit">Send</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddMessageForm;
