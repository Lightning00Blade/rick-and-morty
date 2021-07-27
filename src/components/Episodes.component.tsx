import { CircularProgress, List, ListItem } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from 'urql';

const AllEpisodesQuery = gql`
  query ($page: Int!) {
    episodes(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

export interface PaginationInfo {
  count: number;
  pages: number;
  next: number;
  prev: number;
}

export interface EpisodesQuery {
  episodes: {
    info: PaginationInfo;
    results: Episode[];
  };
}

export const EpisodesComponent = () => {
  const [page, setPage] = useState(1);

  const [result, reexecuteQuery] = useQuery<EpisodesQuery>({
    query: AllEpisodesQuery,
    variables: { page },
  });
  const { data, fetching, error } = result;

  const handlePagination = (_event: any, value: number) => {
    setPage(value);
    reexecuteQuery();
  };

  if (fetching) {
    return <CircularProgress />;
  }
  if (error) {
    return <p>Oh no... {error.message}</p>;
  }

  return (
    <>
      <List>
        {data?.episodes.results.map((episode) => (
          <ListItem key={episode.id}>
            <Link to={`/episode/${episode.id}`}>
              {episode.episode} - {episode.name} - {episode.air_date}
            </Link>
          </ListItem>
        ))}
      </List>
      <Pagination count={data?.episodes.info.pages} page={page} onChange={handlePagination} />
    </>
  );
};
