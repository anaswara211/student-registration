import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Checkbox, FormControlLabel } from '@mui/material';
import './App.css';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobile: '',
    email: '',
    gender: { male: false, female: false },
    dob: '',
    course: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "gender") {
      setFormData(prevData => ({
        ...prevData,
        gender: {
          male: value === "male" ? checked : false,
          female: value === "female" ? checked : false,
        }
      }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const isFormValid = () => {
    const { name, address, mobile, email, gender, dob, course } = formData;
    const validationErrors = {};

    if (!name || !/^[a-zA-Z\s]+$/.test(name)) validationErrors.name = "Name should contain only letters and spaces.";
    if (!mobile || !/^[0-9]{10}$/.test(mobile)) validationErrors.mobile = "Mobile should be a 10-digit number.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) validationErrors.email = "Enter a valid email.";
    if (!address) validationErrors.address = "Address is required.";
    if (!(gender.male ^ gender.female)) validationErrors.gender = "Select only one gender.";
    if (!dob) validationErrors.dob = "Date of birth is required.";
    if (!course) validationErrors.course = "Select a course.";

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleRegister = () => {
    if (isFormValid()) {
      alert(`Data stored successfully:\n${JSON.stringify(formData, null, 2)}`);
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      address: '',
      mobile: '',
      email: '',
      gender: { male: false, female: false },
      dob: '',
      course: ''
    });
    setErrors({});
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh' }} className='d-flex justify-content-center align-items-center bg-dark'>
      <div style={{ width: '600px' }} className='bg-light rounded p-5'>
        <div className='bg-primary text-light text-center rounded mb-3 p-3'>
          <h1 className='fw-bolder'>Student Registration Form</h1>
        </div>
        <form className='mt-5'>
          <div className='mb-3'>
            <TextField
              name='name'
              label="Name"
              variant="outlined"
              className='w-100'
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </div>
          <div className='mb-3'>
            <TextField
              name='address'
              label="Address"
              variant="outlined"
              className='w-100'
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
            />
          </div>
          <div className='mb-3'>
            <TextField
              name='mobile'
              label="Mobile"
              variant="outlined"
              className='w-100'
              value={formData.mobile}
              onChange={handleChange}
              type="tel"
              error={!!errors.mobile}
              helperText={errors.mobile}
            />
          </div>
          <div className='mb-3'>
            <TextField
              name='email'
              label="Email address"
              variant="outlined"
              className='w-100'
              value={formData.email}
              onChange={handleChange}
              type="email"
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>
          <div className='mb-3'>
            <label className="fw-bold mb-2">Gender</label>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    name="gender"
                    value="male"
                    checked={formData.gender.male}
                    onChange={handleChange}
                  />
                }
                label="Male"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="gender"
                    value="female"
                    checked={formData.gender.female}
                    onChange={handleChange}
                  />
                }
                label="Female"
              />
            </div>
            {errors.gender && <p style={{ color: 'red', fontSize: '0.75rem' }}>{errors.gender}</p>}
          </div>
          <div className='mb-3'>
            <TextField
              name='dob'
              label="Date of Birth"
              variant="outlined"
              className='w-100'
              value={formData.dob}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.dob}
              helperText={errors.dob}
            />
          </div>
          <FormControl fullWidth variant="outlined" className='mb-5 mt-5' error={!!errors.course}>
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              name="course"
              label="Course"
              value={formData.course}
              onChange={handleChange}
            >
              <MenuItem value="biology">Biology</MenuItem>
              <MenuItem value="computer-science">Computer Science</MenuItem>
              <MenuItem value="commerce">Commerce</MenuItem>
              <MenuItem value="humanities">Humanities</MenuItem>
            </Select>
            {errors.course && <p style={{ color: 'red', fontSize: '0.75rem' }}>{errors.course}</p>}
          </FormControl>

          <Stack direction="row" spacing={2}>
            <Button onClick={handleRegister} variant="contained" style={{ width: '50%', height: '70px' }}>
              Register
            </Button>
            <Button onClick={handleCancel} variant="outlined" style={{ width: '50%', height: '70px' }}>
              Cancel
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}

export default App;
