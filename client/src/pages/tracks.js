import React from 'react';
import { useQuery, gql } from "@apollo/client";
import { Layout } from '../components';
import TrackCard from "../containers/track-card";
import QueryResult from "../components/query-result";

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */

const TRACKS = gql`
  query ExampleQuery {
  tracksForHome {
    author {
      id,
      name,
      photo
    },
    id,
    thumbnail,
    title,
    length,
    modulesCount
  }
}
`;

const Tracks = () => {

  const { loading, error, data } = useQuery(TRACKS);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  return (
  <Layout grid> 
 
  <QueryResult error={error} loading={loading} data={data}>
  {data?.tracksForHome?.map((track) => (
    <TrackCard key={track.id} track={track} />
  ))}
</QueryResult>
  </Layout>
  );
};

export default Tracks;
