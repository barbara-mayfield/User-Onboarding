import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const UserForm = ({ errors, touched, status }) => {
    console.log(status)

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }}, [status])

    return (
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && <p className="error">{errors.name}</p>}

            {users.map(user => (
                <div>Name: {user.name}</div>
            ))}
        </Form>
    )
}



export default withFormik({
    mapPropsToValues: (values) => {
        return {
            name: values.name || ''
        }
    },

    validationSchema: yup.object().shape({
        name: yup.string().required('Name is required')
    }),
})(UserForm);