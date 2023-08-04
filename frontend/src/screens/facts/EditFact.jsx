import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';
import {
  useGetFactByIdQuery,
  useUpdateFactMutation,
} from '../../slices/factApiSlice';

const EditFact = () => {
  const [fact, setFact] = useState('');
  const navigate = useNavigate();
  const { category, id } = useParams();

  const {
    data,
    refetch,
    isLoading: factLoading,
  } = useGetFactByIdQuery({ category, id });

  useEffect(() => {
    if (data) {
      setFact(data.fact);
    } else {
      refetch();
    }
  }, [data]);

  const [updateFact, { refetch: updateRefetch, isLoading }] =
    useUpdateFactMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateFact({ id, fact });
      navigate('/');
      updateRefetch();
      toast.success('Fact Updated Successfully');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <h1>Edit Fact</h1>
      {factLoading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Fact: </Form.Label>
          <Form.Control
            type="text"
            value={fact}
            onChange={(e) => setFact(e.target.value)}
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

export default EditFact;
