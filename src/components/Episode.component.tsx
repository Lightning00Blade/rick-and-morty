import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { useQuery, gql } from 'urql';
import { CharacterTable } from './CharacterTable.component';

const SingleEpisodeQuery = gql`
  query ($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
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

interface Location {
  id: number;
  name: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  origin: Location;
  location: Location;
  gender: string;
  image: string;
}

export interface EpisodeQuery {
  episode: {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: Character[];
  };
}

interface EpisodeComponentProps {
  id: number;
}

export const EpisodeComponent = ({ id }: EpisodeComponentProps) => {
  const [result] = useQuery<EpisodeQuery>({
    query: SingleEpisodeQuery,
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
                Episode
              </TableCell>
              <TableCell scope='row'>{data?.episode.episode}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                Name
              </TableCell>
              <TableCell scope='row'>{data?.episode.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                Air Date
              </TableCell>
              <TableCell scope='row'>{data?.episode.air_date}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {data?.episode.characters && (
        <>
          <h1>Characters in this episode:</h1>
          <CharacterTable characters={data.episode.characters} />
        </>
      )}
    </>
  );
};
