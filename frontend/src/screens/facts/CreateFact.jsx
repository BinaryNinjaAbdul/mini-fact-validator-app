import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';
import { useCreateFactMutation } from '../../slices/factApiSlice';

const CreateFact = () => {
  const [fact, setFact] = useState('');
  const navigate = useNavigate();
  const { category } = useParams();

  const [createFact, { isLoading }] = useCreateFactMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createFact({ fact, category });
      navigate('/');
      toast.success('Fact created Successfully');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <h1>Create Fact</h1>
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

export default CreateFact;
