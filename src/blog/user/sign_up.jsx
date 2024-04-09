
import React, { useState } from 'react';
import { createNewUser } from 'src/apis/api_user';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    phone: '',
    captcha: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.username) {
      newErrors.required = 'Please fill out all required fields.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.passwordMatch = 'Passwords do not match.';
    }
    if (!validateEmail(formData.email)) {
      newErrors.emailFormat = 'Please enter a valid email address.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Submit form logic here
      console.log('Form submitted:', formData);

      const res = createNewUser(formData);
      if (res) {
        console.log('User created successfully:', res);
      }
    }
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
        {errors.emailFormat && <p className="text-red-500 text-xs mt-1">{errors.emailFormat}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password<span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password<span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
        {errors.passwordMatch && <p className="text-red-500 text-xs mt-1">{errors.passwordMatch}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      {/* CAPTCHA service goes here */}
      <div className="mb-4">
        <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
          CAPTCHA
        </label>
        <input
          type="text"
          id="captcha"
          name="captcha"
          value={formData.captcha}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Submit
      </button>
      {errors.required && <p className="text-red-500 text-xs mt-2">{errors.required}</p>}
    </form>
  );
};


export default SignUp;