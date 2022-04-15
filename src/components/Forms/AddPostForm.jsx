import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import classes from "./formStyles.module.scss";

const validationsSchema = Yup.object().shape({
  post: Yup.string().min(2, "Too Short!").max(50, "Max length 50 symbols!"),
});

const AddPostForm = ({ submitHandler }) => {
  return (
    <div>
      <Formik
        initialValues={{ id: Date.now(), post: "", likeCount: 0 }}
        onSubmit={submitHandler}
        validationSchema={validationsSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              className={
                errors.post && touched.post ? classes.error__border : null
              }
              placeholder="Enter your post"
              name="post"
              component="textarea"
            />
            {errors.post && touched.post ? (
              <p className={classes.error}>{errors.post}</p>
            ) : null}
            <div>
              <button type="submit">Add post</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPostForm;
