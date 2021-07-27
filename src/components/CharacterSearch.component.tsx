import { CircularProgress } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useState } from 'react';
import { useQuery, gql } from 'urql';
import { CharacterTable } from './CharacterTable.component';
import { Character } from './Episode.component';
import { PaginationInfo } from './Episodes.component';

const characterSearchQuery = gql`
  query ($name: String!) {
    characters(page: 0, filter: { name: $name }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        origin {
          id
          name
        }
        location {
          id
          name
        }
        gender
        image
      }
    }
  }
`;

interface CharacterSearchQuery {
  characters: {
    info: PaginationInfo;
    results: Character[];
  };
}

export interface CharacterSearchComponentProps {
  character: string;
}

export const CharacterSearchComponent = ({ character }: CharacterSearchComponentProps) => {
  const [page, setPage] = useState(1);

  const [result, reexecuteQuery] = useQuery<CharacterSearchQuery>({
    query: characterSearchQuery,
    variables: { name: character },
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
      <h1>Characters with the name {character}:</h1>
      <CharacterTable characters={data?.characters.results ?? []} />
      <Pagination count={data?.characters.info.pages} page={page} onChange={handlePagination} />
    </>
  );
};
