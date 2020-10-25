import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  meetings: Array<Array<MeetingType>>;
};

export type MeetingType = {
  id: Scalars['Int'];
  hour: Scalars['Int'];
  title: Scalars['String'];
};

export type Mutation = {
  saveMeeting: Scalars['Boolean'];
  deleteMeeting: Scalars['Boolean'];
};


export type MutationSaveMeetingArgs = {
  id?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  day: Scalars['Int'];
  hour: Scalars['Int'];
};


export type MutationDeleteMeetingArgs = {
  id: Scalars['Int'];
};

export type DeleteMeetingMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMeetingMutation = Pick<Mutation, 'deleteMeeting'>;

export type SaveMeetingMutationVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  day: Scalars['Int'];
  hour: Scalars['Int'];
}>;


export type SaveMeetingMutation = Pick<Mutation, 'saveMeeting'>;

export type MeetingsQueryVariables = Exact<{ [key: string]: never; }>;


export type MeetingsQuery = { meetings: Array<Array<Pick<MeetingType, 'id' | 'hour' | 'title'>>> };


export const DeleteMeetingDocument = gql`
    mutation DeleteMeeting($id: Int!) {
  deleteMeeting(id: $id)
}
    `;
export type DeleteMeetingMutationFn = Apollo.MutationFunction<DeleteMeetingMutation, DeleteMeetingMutationVariables>;

/**
 * __useDeleteMeetingMutation__
 *
 * To run a mutation, you first call `useDeleteMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMeetingMutation, { data, loading, error }] = useDeleteMeetingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMeetingMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMeetingMutation, DeleteMeetingMutationVariables>) {
        return Apollo.useMutation<DeleteMeetingMutation, DeleteMeetingMutationVariables>(DeleteMeetingDocument, baseOptions);
      }
export type DeleteMeetingMutationHookResult = ReturnType<typeof useDeleteMeetingMutation>;
export type DeleteMeetingMutationResult = Apollo.MutationResult<DeleteMeetingMutation>;
export type DeleteMeetingMutationOptions = Apollo.BaseMutationOptions<DeleteMeetingMutation, DeleteMeetingMutationVariables>;
export const SaveMeetingDocument = gql`
    mutation SaveMeeting($id: Int, $title: String!, $day: Int!, $hour: Int!) {
  saveMeeting(id: $id, title: $title, day: $day, hour: $hour)
}
    `;
export type SaveMeetingMutationFn = Apollo.MutationFunction<SaveMeetingMutation, SaveMeetingMutationVariables>;

/**
 * __useSaveMeetingMutation__
 *
 * To run a mutation, you first call `useSaveMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveMeetingMutation, { data, loading, error }] = useSaveMeetingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      day: // value for 'day'
 *      hour: // value for 'hour'
 *   },
 * });
 */
export function useSaveMeetingMutation(baseOptions?: Apollo.MutationHookOptions<SaveMeetingMutation, SaveMeetingMutationVariables>) {
        return Apollo.useMutation<SaveMeetingMutation, SaveMeetingMutationVariables>(SaveMeetingDocument, baseOptions);
      }
export type SaveMeetingMutationHookResult = ReturnType<typeof useSaveMeetingMutation>;
export type SaveMeetingMutationResult = Apollo.MutationResult<SaveMeetingMutation>;
export type SaveMeetingMutationOptions = Apollo.BaseMutationOptions<SaveMeetingMutation, SaveMeetingMutationVariables>;
export const MeetingsDocument = gql`
    query Meetings {
  meetings {
    id
    hour
    title
  }
}
    `;

/**
 * __useMeetingsQuery__
 *
 * To run a query within a React component, call `useMeetingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeetingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeetingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeetingsQuery(baseOptions?: Apollo.QueryHookOptions<MeetingsQuery, MeetingsQueryVariables>) {
        return Apollo.useQuery<MeetingsQuery, MeetingsQueryVariables>(MeetingsDocument, baseOptions);
      }
export function useMeetingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeetingsQuery, MeetingsQueryVariables>) {
          return Apollo.useLazyQuery<MeetingsQuery, MeetingsQueryVariables>(MeetingsDocument, baseOptions);
        }
export type MeetingsQueryHookResult = ReturnType<typeof useMeetingsQuery>;
export type MeetingsLazyQueryHookResult = ReturnType<typeof useMeetingsLazyQuery>;
export type MeetingsQueryResult = Apollo.QueryResult<MeetingsQuery, MeetingsQueryVariables>;