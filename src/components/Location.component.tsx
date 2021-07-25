import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { useQuery, gql } from 'urql';
import { Character } from './Episode.component';
import { CharacterTable } from './CharacterTable.component';

const singleLocationQuery = gql`
  query ($id: ID!) {
    location(id: $id) {
      id
      name
      residents {
        id
        name
        status
        species
        origin {
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

export interface LocationQuery {
  location: {
    id: number;
    name: string;
    residents: Character[];
  };
}

interface LocationComponentProps {
  id: number;
}

export const LocationComponent = ({ id }: LocationComponentProps) => {
  const [result] = useQuery<LocationQuery>({
    query: singleLocationQuery,
    variables: { id },
  });
  const { data, fetching, error } = result;

  if (fetching) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Oh no... {error.message}</p>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component='th' scope='row'>
                Name
              </TableCell>
              <TableCell scope='row'>{data?.location.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                Name
              </TableCell>
              <TableCell scope='row'>{data?.location.name}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {data?.location.residents && (
        <>
          <h1>Characters in this episode:</h1>
          <CharacterTable characters={data.location.residents} />
        </>
      )}
    </>
  );
};
