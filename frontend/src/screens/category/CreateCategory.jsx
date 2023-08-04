import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { useCreateCategoryMutation } from '../../slices/categoryApiSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const CreateCategory = () => {
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createCategory({ name }).unwrap();
      navigate('/');
      toast.success('Category Created Successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Create Category</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Create
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateCategory;
