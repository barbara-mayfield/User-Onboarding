import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Button } from 'reactstrap';

const UserForm = ({ errors, touched, status }) => {
    console.log(status)

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }}, [status])

    return (
        <Form>
        <h1>User Sign-Up</h1>
            <Field type="text" name="name" placeholder="Name" className="form-field" />
            {touched.name && errors.name && <p className="error">{errors.name}</p>}

            <Field type="text" name="email" placeholder="E-Mail" className="form-field" />
            {touched.email && errors.name && <p className="error">{errors.email}</p>}


            <Field type="password" name="password" placeholder="Password" className="form-field" />
            {touched.password && errors.password && <p className="error">{errors.password}</p>}

            <Field component="select" name="role" className="form-field roleselect">
                <option value="" disabled>Select Role:</option>
                <option value="Front End Dev">Front End Dev</option>
                <option value="Back End Dev">Back End Dev</option>
                <option value="Disc Jockey">Disc Jockey</option>
                <option value="Other">Other</option>
            </Field>
            {touched.role && errors.role && <p className="error">{errors.role}</p>}

            <label className="terms">
            <Field type="checkbox" name="tos" className="termcheck" />
            <span>Terms of Service</span>
            </label>
            {touched.tos && errors.tos && <p className="error">{errors.tos}</p>}

            <Button type="submit" color="secondary">Submit</Button>
            
            {users.map(user => (
                <div className="user-display">
                    <h2>User Info</h2>
                    Name: {user.name}<br />
                    E-Mail: {user.email}<br />
                    Role: {user.role}
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
            tos: values.tos || '',
            role: values.role || '',
            otherrole: values.otherrole || ''
        }
    },

    validationSchema: yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email().required('Email is required'),
        password: yup.string().min(5, 'Password Must Contain At Least 5 Characters').required(`Password is required`),
        tos: yup.boolean().oneOf([true], 'You must accept Terms of Service').required('You Must Accept Terms of Service'),
        role: yup.string().required('You Must Select a Role')
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