import { Button, Container, Input } from '@material-ui/core';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { CharacterSearchComponent } from '../components/CharacterSearch.component';

const Content = (character?: string) => {
  if (!!character) {
    return <CharacterSearchComponent character={character} />;
  } else {
    return (
      <div>
        <h1>It seem you have yet to search! Use the Input Above to do so :P</h1>
      </div>
    );
  }
};

interface CharacterSearchParams {
  name: string | undefined;
}

export const CharacterSearch = () => {
  const history = useHistory();
  const { name } = useParams<CharacterSearchParams>();
  // Not sure if should the Use Only Characters here
  const [character, setCharacter] = useState(name ?? '');

  const handleSearch = () => {
    history.push(`/character/${character}`);
  };

  return (
    <Container>
      <h1>CharacterSearch</h1>
      <Input
        value={character}
        onChange={(e) => {
          setCharacter(e.target.value);
        }}
      />
      <Button variant='contained' color='primary' onClick={handleSearch}>
        Search
      </Button>
      {Content(name)}
    </Container>
  );
};
