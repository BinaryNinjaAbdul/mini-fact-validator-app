import { Card, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from '../slices/categoryApiSlice';
import Loader from '../components/Loader';

const HomeScreen = () => {
  const {
    data: categories,
    isLoading,
    refetch,
    isError,
  } = useGetCategoriesQuery();

  const [deleteCategory, { isLoading: loadingDelete }] =
    useDeleteCategoryMutation();

  useEffect(() => {
    refetch();
  }, [categories, refetch]);

  const deleteHandler = async (id) => {
    try {
      await deleteCategory(id);
      refetch();
      toast.success('Category Delete Successfully');
    } catch (e) {
      toast.error(e?.data?.message || e.error);
    }
  };

  const { userInfo } = useSelector((state) => state.auth);
  return isLoading ? (
    <Loader />
  ) : isError ? (
    <h2>{isError?.data?.message || isError.error}</h2>
  ) : (
    <>
      {userInfo?.admin && (
        <Link to="/category/create">
          <Button variant="success">Create</Button>
        </Link>
      )}
      <Container className="d-flex justify-content-center align-item-center flex-wrap ">
        <Card
          bg={'daqrk'}
          text={'light'}
          style={{ width: '20rem', textAlign: 'center' }}
          className="m-2"
          key={'all'}
        >
          <Link to={`/facts/all`}>
            <Card.Body>
              <Card.Title style={{ color: 'black', textDecoration: 'none' }}>
                All
              </Card.Title>
            </Card.Body>
          </Link>
        </Card>
        {categories.map((item) => (
          <>
            <Card
              bg={'daqrk'}
              text={'light'}
              style={{ width: '20rem', textAlign: 'center' }}
              className="m-2"
              key={item._id}
            >
              <Link to={`/facts/${item.name}`}>
                <Card.Body>
                  <Card.Title
                    style={{ color: 'black', textDecoration: 'none' }}
                  >
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </Card.Title>
                </Card.Body>
              </Link>
              {userInfo?.admin && (
                <>
                  <LinkContainer
                    className="mb-2"
                    to={`/category/edit/${item._id}`}
                  >
                    <Button>Edit</Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    onClick={() => deleteHandler(item._id)}
                  >
                    Delete
                  </Button>
                  {loadingDelete && <Loader />}
                </>
              )}
            </Card>
          </>
        ))}
      </Container>
    </>
  );
};

export default HomeScreen;
