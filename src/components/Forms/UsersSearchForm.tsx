import React from "react";
import { Formik, Form, Field } from "formik";
import { FilterType } from "redux/usersReducer";
import Button from "../UI/button/Button";
import { useSelector } from "react-redux";
import { getUsersFilter } from "redux/usersSelectors";

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
    <div>
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
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Followed</option>
              <option value="false">Unfollowed</option>
            </Field>
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
