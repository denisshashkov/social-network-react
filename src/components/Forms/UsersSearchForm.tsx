import React from "react";
import { Formik, Form, Field } from "formik";
import { FilterType } from "redux/usersReducer";
import Button from "../UI/button/Button";
import { useSelector } from "react-redux";
import { getUsersFilter } from "redux/usersSelectors";
import classes from "./formStyles.module.scss";

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const filter = useSelector(getUsersFilter);

  const validateForm = (values: any) => {
    const errors = {};
    return errors;
  };

  const submit = (values: FilterType, { setSubmitting }) => {
    props.onFilterChanged(values);
    setSubmitting(false);
  };

  return (
    <div className={classes.form}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          term: filter.term,
          friend: String(filter.friend),
        }}
        validate={validateForm}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="friend" className={classes.form__select} as="select">
              <option value="null">All</option>
              <option value="true">Followed</option>
              <option value="false">Unfollowed</option>
            </Field>
            <Field type="text" name="term" />
            <Button type="submit" disabled={isSubmitting}>
              Find
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default UsersSearchForm;
