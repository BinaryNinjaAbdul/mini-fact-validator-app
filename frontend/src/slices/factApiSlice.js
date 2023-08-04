import { apiSlice } from './apiSlice';

const FACT_URL = '/api/fact';

export const factApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacts: builder.query({
      query: () => ({
        url: FACT_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getFactByCategory: builder.query({
      query: (category) => ({
        url: `${FACT_URL}/${category}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getFactById: builder.query({
      query: (data) => ({
        url: `${FACT_URL}/${data.category}/${data.id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createFact: builder.mutation({
      query: (data) => ({
        url: FACT_URL,
        method: 'POST',
        body: data,
      }),
    }),
    updateFact: builder.mutation({
      query: (data) => ({
        url: `${FACT_URL}/${data.id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    toggleLikeFact: builder.mutation({
      query: (id) => ({
        url: `${FACT_URL}/${id}`,
        method: 'PATCH',
        body: {},
      }),
    }),
    toggleDisikeFact: builder.mutation({
      query: (id) => ({
        url: `${FACT_URL}/dislike/${id}`,
        method: 'PATCH',
        body: {},
      }),
    }),
    deleteFact: builder.mutation({
      query: (id) => ({
        url: `${FACT_URL}/${id}`,
        method: 'DELETE',
        body: {},
      }),
    }),
  }),
});

export const {
  useGetAllFactsQuery,
  useGetFactByCategoryQuery,
  useCreateFactMutation,
  useUpdateFactMutation,
  useToggleLikeFactMutation,
  useDeleteFactMutation,
  useGetFactByIdQuery,
  useToggleDisikeFactMutation,
} = factApiSlice;
