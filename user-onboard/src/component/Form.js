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

            <Field type="text" name="email" placeholder="E-Mail" />
            {touched.email && errors.name && <p className="error">{errors.email}</p>}


            <Field type="password" name="password" placeholder="Password" />
            {touched.password && errors.password && <p className="error">{errors.password}</p>}

            <label className="terms">
            <Field type="checkbox" name="tos" className="termcheck" />
            <span>Terms of Service</span>
            </label>
            {touched.tos && errors.tos && <p className="error">{errors.tos}</p>}

            <button type="submit">Submit</button>
            
            {users.map(user => (
                <div className="user-display">
                    Name: {user.name}<br />
                    e-mail: {user.email}
                </div>
            ))}
        </Form>
    )
}



export default withFormik({
    mapPropsToValues: (values) => {
        return {
            name: values.name || '',
            email: values.email || '',
            password: values.password || '',
            tos: values.tos || ''
        }
    },

    validationSchema: yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email().required('Email is required'),
        password: yup.string().min(5, 'Password Must Contain At Least 5 Characters').required(`Password is required`),
        tos: yup.boolean().oneOf([true], 'You must accept Terms of Service')
    }),

    handleSubmit: (values, { setStatus }) => {
         axios.post('https://reqres.in/api/users', values)
         .then((res) => {
           setStatus(res.data);
         })
         .catch((err) => {
           console.log('Error');
         })
       }
})(UserForm);