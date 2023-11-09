
import React from 'react';
import { useParams } from 'react-router-dom';
import DynamicForm from '../components/DynamicForm';

const Contact = () => {
  const { formType } = useParams();

  return (
    <div>
      <h1 className='text-xl mt-2 text-center'>Post Your Requirements</h1>
      <DynamicForm formType={formType} />
    </div>
  );
};

export default Contact;