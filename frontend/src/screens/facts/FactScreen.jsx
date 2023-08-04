// import React from 'react';
import { toast } from 'react-toastify';
import { Alert, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  useGetAllFactsQuery,
  useGetFactByCategoryQuery,
  useToggleLikeFactMutation,
  useDeleteFactMutation,
  useToggleDisikeFactMutation,
} from '../../slices/factApiSlice';
import { useEffect } from 'react';

const FactScreen = () => {
  const { category } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  let facts, loading, error, refetchD;

  if (category === 'all') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, isLoading, refetch, isError } = useGetAllFactsQuery();
    facts = data;
    loading = isLoading;
    error = isError;
    refetchD = refetch;
  } else {
    const { data, isLoading, refetch, isError } =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useGetFactByCategoryQuery(category);
    facts = data;
    loading = isLoading;
    error = isError;
    refetchD = refetch;
  }

  useEffect(() => {
    refetchD();
  }, []);

  const [toggleLike] = useToggleLikeFactMutation();
  const toggleLikeHandler = async (id) => {
    if (!userInfo) {
      toast.error('You must login to vote');
    }
    try {
      await toggleLike(id);
      refetchD();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const [toggleDislike] = useToggleDisikeFactMutation();
  const toggleDisikeHandler = async (id) => {
    if (!userInfo) {
      toast.error('You must login to vote');
    }
    try {
      await toggleDislike(id);
      refetchD();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const [deleteFact, { isLoading: loadingDelete }] = useDeleteFactMutation();
  const deleteHandler = async (id) => {
    try {
      await deleteFact(id);
      refetchD();
      toast.success('Fact deleted successfully');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const navigate = useNavigate();
  const editHandler = (id) => {
    navigate(`/fact/${category}/${id}`);
  };

  return (
    <>
      {category !== 'all' && userInfo ? (
        <Link to={`/fact/${category}`}>
          <Button variant="success" className="mb-3">
            {' '}
            Create Fact
          </Button>
        </Link>
      ) : (
        <></>
      )}
      {loadingDelete && <Loader />}
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>{error?.data?.message || error.error}</h1>
      ) : (
        <>
          {facts.map((fact) => (
            <>
              <Alert key={fact._id} show={true} variant="dark">
                <Alert.Heading>{fact.fact}</Alert.Heading>
                <hr />
                <div className="d-flex justify-content-end">
                  {userInfo?._id === fact.user ? (
                    <>
                      <Button
                        onClick={() => editHandler(fact._id)}
                        variant="outline-success"
                        className="m-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => deleteHandler(fact._id)}
                        className="m-2"
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}

                  <Button
                    variant="outline-primary"
                    className="m-2"
                    onClick={() => toggleLikeHandler(fact._id)}
                  >
                    <i className="bi bi-hand-thumbs-up"></i> {fact.likes.length}
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="m-2"
                    onClick={() => toggleDisikeHandler(fact._id)}
                  >
                    <i className="bi bi-hand-thumbs-down"></i>{' '}
                    {fact.dislikes.length}
                  </Button>
                </div>
              </Alert>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default FactScreen;
