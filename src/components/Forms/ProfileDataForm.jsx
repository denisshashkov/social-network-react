import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import classes from "./formStyles.module.scss";

const ProfileDataForm = ({ submitHandler, profile }) => {
  const validationsSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required field"),
    aboutMe: Yup.string().min(2, "Too Short!").max(100, "Too Long!"),
    lookingForAJobDescription: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!"),
  });
  return (
    <div>
      <Formik
        initialValues={{
          fullName: profile.fullName,
          lookingForAJob: false,
          aboutMe: profile.aboutMe,
          lookingForAJobDescription: profile.lookingForAJobDescription,
        }}
        onSubmit={submitHandler}
        validationSchema={validationsSchema}
      >
        {({ errors, touched, status }) => (
          <Form>
            <label>Full Name</label>
            <div>
              <Field
                name={"fullName"}
                className={
                  errors.fullName && touched.fullName
                    ? classes.error__border
                    : null
                }
              />
            </div>
            {errors.fullName && touched.fullName ? (
              <p className={classes.error}>{errors.fullName}</p>
            ) : null}
            <div>
              <Field type={"checkbox"} name={"lookingForAJob"} />
              Looking for a job
            </div>

            <label>About me</label>
            <div>
              <Field
                component="textarea"
                name={"aboutMe"}
                className={
                  errors.aboutMe && touched.aboutMe
                    ? classes.error__border
                    : null
                }
              />
            </div>
            {errors.aboutMe && touched.aboutMe ? (
              <p className={classes.error}>{errors.aboutMe}</p>
            ) : null}

            <label>Skills</label>
            <div>
              <Field
                component="textarea"
                name={"lookingForAJobDescription"}
                className={
                  errors.lookingForAJobDescription &&
                  touched.lookingForAJobDescription
                    ? classes.error__border
                    : null
                }
              />
            </div>
            {errors.lookingForAJobDescription &&
            touched.lookingForAJobDescription ? (
              <p className={classes.error}>
                {errors.lookingForAJobDescription}
              </p>
            ) : null}

            {/* <label>Contacts</label>

            <div>
              {Object.keys(profile.contacts).map((key) => {
                return (
                  <div key={key}>
                    <b>{key}: </b>
                    <div>
                      <Field
                       
                        onChange={contactHandler}
                        placeholder={key}
                        name={`contacts.${key}`}
                        className={
                          errors.contacts && touched.contacts
                            ? classes.error__border
                            : null
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div> */}

            {status ? <p className={classes.error}>{status.error}</p> : null}

            <div>
              <button type="submit">Save</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileDataForm;
