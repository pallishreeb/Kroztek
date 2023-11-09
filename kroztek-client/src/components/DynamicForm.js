import React, {useState} from 'react';
import {useNavigate} from "react-router-dom"
import formFields from '../formFields';
import {API_URL} from "../config"

const AlertBox = ({ message, isSuccess, onClose }) => {
  const alertBgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md ${alertBgColor} text-white z-50`}>
      <p>{message}</p>
      <button onClick={onClose} className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-md focus:outline-none">OK</button>
    </div>
  );
};
const DynamicForm = ({ formType }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const filteredFields = formFields.filter((field) => field.formType === formType);
  const isOddLength = filteredFields.length % 2 !== 0;
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState({});
  const handleAlertClose = () => {
    setShowAlert(false);
    // Redirect to home page on success
    if (isSuccess) {
      navigate('/');
    }
  };
  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const handleUserInputChange = (fieldName, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/client/requirement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType,
          formData,
          userData
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setShowAlert(true);
        // Handle success, e.g., show a success message to the user
        console.log("Form submitted successfully!", formData, userData);
      } else {
        setIsSuccess(false);
        setShowAlert(true);
        // Handle error, e.g., show an error message to the user
        console.error("Form submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  return (
    <>
    <form className="my-4 mx-auto max-w-md lg:max-w-lg xl:max-w-xl" onSubmit={handleSubmit}>
      {/* Constant fields */}
      <div className="grid grid-cols-1  md:grid-cols-2 gap-4 mb-4 ">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input type="text" 
          className="mt-1 p-2 border rounded-md w-full" 
          placeholder="First Name" 
          onChange={(e) => handleUserInputChange("firstName", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input type="text" 
          className="mt-1 p-2 border rounded-md w-full" 
          placeholder="last Name" 
          onChange={(e) => handleUserInputChange("lastName", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
          type="text" 
          className="mt-1 p-2 border rounded-md w-full" 
          placeholder="Your Email" 
          onChange={(e) => handleUserInputChange("email", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Your Phone Number"
            onChange={(e) => handleUserInputChange("phoneNumber", e.target.value)}
          />
        </div>
      </div>

      {/* Dynamic fields */}
      <div className={`grid grid-cols-1 gap-4 lg:grid-cols-2`}>
        {filteredFields.map((field, index) => (
          <div key={field.name} className={`mb-4 ${index === filteredFields.length - 1 && isOddLength ? 'lg:col-span-2' : 'lg:col-span-1'}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.name}</label>
            {field.type === 'input' && (
              <input
                type="text"
                className="mt-1 p-2 border rounded-md w-full"
                placeholder={field.placeholder}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            )}
            {field.type === 'dropdown' && (
              <select className="mt-1 p-2 border rounded-md w-full" onChange={(e) => handleInputChange(field.name, e.target.value)}>
                  <option>
                    Choose From List
                  </option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {/* Add other field types as needed */}
          </div>
        ))}
      </div>

      <button type="submit"  className="bg-blue-600 text-white py-2 px-4 rounded-md mx-auto block">
        SUBMIT REQUIREMENTS
      </button>
    </form>

     {/* Alert Box */}
     {showAlert && (
        <AlertBox
          message={isSuccess ? 'Form submitted successfully!' : 'Form submission failed.'}
          isSuccess={isSuccess}
          onClose={handleAlertClose}
        />
      )}
    </>
  );
};

export default DynamicForm;
