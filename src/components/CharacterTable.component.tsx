import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Character } from './Episode.component';

interface CharacterTableProps {
  characters: Character[];
}

interface CharacterRowProps {
  character: Character;
}

export const CharacterRow = ({ character }: CharacterRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <img src={character.image} width={100} alt={character.name} />
      </TableCell>
      <TableCell>{character.name}</TableCell>
      <TableCell>{character.status}</TableCell>
      <TableCell>{character.species}</TableCell>
      <TableCell>
        <Link to={`/location/${character.origin.id}`}>{character.origin.name}</Link>
      </TableCell>
      <TableCell>
        <Link to={`/location/${character.location.id}`}>{character.location.name}</Link>
      </TableCell>
      <TableCell>{character.gender}</TableCell>
    </TableRow>
  );
};

export const CharacterTable = ({ characters }: CharacterTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Species</TableCell>
            <TableCell>Origin</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {characters.map((character) => {
            return <CharacterRow key={character.id} character={character} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
