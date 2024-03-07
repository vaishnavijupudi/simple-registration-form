import React, {useState} from 'react'
import { TextField, Button, Alert,useMediaQuery, Box, Grid } from '@mui/material';
import axios from 'axios';
import './RegistrationForm.css'; 

const RegistrationForm = () => {
    const [formValues, setFormValues] = useState({
        full_name: '',
        contact_number: '',
        day: '',
        month: '',
        year: '',
        email: '',
        password: '',
        confirm_password: '',
        
      });
    const [formErrors, setFormErrors] = useState({});
    const [apiMessage, setApiMessage] = useState(null);
    const isMobile = useMediaQuery('(max-width:600px)');
    const isDesktop = useMediaQuery('(min-width:601px)');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const errorMessage = {
            full_name: validateFullName(),
            contact_number: validateContactNumber(),
            dateOfBirth: validateDateOfBirth(),
            email: validateEmail(),
            password: validatePassword(),
            confirm_password: validateConfirmPassword(),
        };
        setFormErrors(errorMessage);
        if (Object.values(errorMessage).every(error => error === '')){
    
            try{
                const response = await axios.post('https://fullstack-test-navy.vercel.app/api/users/create', formValues); 
                setApiMessage({ type: 'success', message: response.data.description });
                resetFormValues();
            } catch(e){
                console.error('Error submitting form:', e);
                setApiMessage({ type: 'error', message: e.response.data.description });
            }
        }
    }

    const handleFormFieldsChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]:value})    
    }

    const handleCancel = () => {
        resetFormValues();
    }

    const resetFormValues = () => {
        setFormValues({
            full_name: '',
            contact_number: '',
            day: '',
            month: '',
            year: '',
            email: '',
            password: '',
            confirm_password: '',
        });
    }

    const validateFullName = () => {
        const fullNameRegex = /^[a-zA-Z\s]+$/;
        if (!formValues.full_name.trim()) {
            return 'Full name is required';
        }
        if (!fullNameRegex.test(formValues.full_name)) {
            return 'Full name should not contain special symbols';
        }
        return '';
    }
    const validateContactNumber = () => {
        const contactNumberRegex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
        if (!formValues.contact_number.trim()) {
            return 'Contact number is required';
          }
          if (!contactNumberRegex.test(formValues.contact_number)) {
            return 'Invalid Contact Number Format';
          }
          return '';

    }
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formValues.email.trim()) {
            return 'Email is required';
        }
        if (!emailRegex.test(formValues.email)) {
            return 'Invalid email format';
        }
        return '';

    }
    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!formValues.password) {
            return 'Password is required';
        }
        if (!passwordRegex.test(formValues.password)) {
            return 'Password must contain atleast 8 chatracters including uppercase, lowercase and numbers';
        }
        return '';
    }
    const validateConfirmPassword = () => {
        if (!formValues.confirm_password) {
            return 'Confirm Password is required';
        }
        if (formValues.password !== formValues.confirm_password) {
            return 'Passwords do not match';
        }
        return '';
    }
    const validateDateOfBirth = () => {

        if (!formValues.day.trim() || !formValues.month.trim() || !formValues.year.trim()) {
           return 'Please select day, month, and year';
        }

        return '';
    }

    
    return (
        <Box mt={3} className='form-container'> 
            <h2>Create User Account</h2>
            <form >
            <div className='form-box'> 
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={12}>
                        <p>
                            <label>Full Name</label>
                        </p>
                        <TextField
                            name='full_name'
                            required
                            label='Full Name'
                            defaultValue='Full Name'
                            value={formValues.full_name}
                            onChange={handleFormFieldsChange}
                            error={!!(formErrors.full_name)}
                            helperText={formErrors.full_name}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={12}>
                        <p>
                            <label>Contact Number</label>
                        </p>
                        <TextField
                            name='contact_number'
                            label='Contact Number'
                            required
                            defaultValue='0123456789'
                            value={formValues.contact_number}
                            onChange={handleFormFieldsChange}
                            error={!!(formErrors.contact_number)}
                            helperText={formErrors.contact_number}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <p>
                            <label>BirthDate</label>
                        </p>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    select
                                    name='day'
                                    label='Day'
                                    value={formValues.day}
                                    onChange={handleFormFieldsChange}
                                    SelectProps={{ native: true }}
                                    fullWidth
                                    required
                                    error={!!(formErrors.dateOfBirth)}
                                    helperText={formErrors.dateOfBirth}
                                >
                                    <option value="">Day</option>
                                    {[...Array(31).keys()].map((day) => (
                                        <option key={day + 1} value={day + 1}>
                                            {day + 1}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    select
                                    name='month'
                                    label='Month'
                                    value={formValues.month}
                                    onChange={handleFormFieldsChange}
                                    SelectProps={{ native: true }}
                                    fullWidth
                                    required
                                    error={!!(formErrors.dateOfBirth)}
                                    helperText={formErrors.dateOfBirth}
                                >
                                    <option value="">Month</option>
                                    {[...Array(12).keys()].map((month) => (
                                        <option key={month + 1} value={month + 1}>
                                            {month + 1}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    select
                                    name='year'
                                    label='Year'
                                    value={formValues.year}
                                    onChange={handleFormFieldsChange}
                                    SelectProps={{ native: true }}
                                    fullWidth
                                    required
                                    error={!!(formErrors.dateOfBirth)}
                                    helperText={formErrors.dateOfBirth}
                                >
                                    <option value="">Year</option>
                                    {[...Array(100).keys()].map((year) => (
                                        <option key={2022 - year} value={2022 - year}>
                                            {2022 - year}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} md={12}>
                        <p>
                            <label>Email Address</label>
                        </p>
                        <TextField
                            name='email'
                            label='Email Address'
                            required
                            placeholder='youremail@example.com'
                            value={formValues.email}
                            onChange={handleFormFieldsChange}
                            error={!!(formErrors.email)}
                            helperText={formErrors.email}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={12}>
                        <p>
                            <label>Password</label>
                        </p>
                        <TextField
                            name='password'
                            type='password'
                            label='Create Password'
                            value={formValues.password}
                            onChange={handleFormFieldsChange}
                            error={!!(formErrors.password)}
                            helperText={formErrors.password}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={12}>
                        <p>
                            <label>Confirm Password</label>
                        </p>
                        <TextField
                            name='confirm_password'
                            type='password'
                            label='Confirm Password'
                            value={formValues.confirm_password}
                            onChange={handleFormFieldsChange}
                            error={!!(formErrors.confirm_password)}
                            helperText={formErrors.confirm_password}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
            </div>
            {isMobile && (
                <>
                {apiMessage && (
                    <Alert severity={apiMessage.type} onClose={() => setApiMessage(null)} >
                        {apiMessage.message}
                    </Alert>
                )}
                <div className='button-container'>
                    <Button variant='outlined' onClick={handleCancel} style={{ borderColor: '#127c95', color: '#127c95' }}>
                        Cancel
                    </Button>
                    <Button variant='contained' onClick={handleSubmit} style={{ backgroundColor: '#127c95', color: '#fff' }}>
                        Submit
                    </Button>
                </div>
                </>
                
            )}
            {isDesktop && (
                <div className='alert-container'>
                    {apiMessage && (
                        <Alert severity={apiMessage.type} onClose={() => setApiMessage(null)} sx={{ position: 'fixed', top: 20, right: '20%' }}>
                            {apiMessage.message}
                        </Alert>
                    )}
                    <div className='button-container'>
                        <Button variant='outlined' onClick={handleCancel} style={{ borderColor: '#127c95', color: '#127c95' }}>
                            Cancel
                        </Button>
                        <Button variant='contained'  onClick={handleSubmit} style={{ backgroundColor: '#127c95', color: '#fff' }}>
                            Submit
                        </Button>
                    </div>
                </div>
            )}

            </form>
            
        </Box>
    );
}

export default RegistrationForm
