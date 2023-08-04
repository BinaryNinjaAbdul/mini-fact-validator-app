import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import {
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} from '../../slices/categoryApiSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';

const EditCategory = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const {
    data: category,
    isLoading: categoryLoading,
    refetch,
  } = useGetCategoryQuery(id);

  useEffect(() => {
    if (category) {
      setName(category?.name);
    } else {
      refetch();
    }
  }, [category, refetch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateCategory({ name, id }).unwrap();
      navigate('/');
      toast.success('Category Updated Successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Edit Category</h1>
      {categoryLoading && <Loader />}
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
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default EditCategory;
