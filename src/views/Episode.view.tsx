import { Redirect, useParams } from 'react-router-dom';
import { EpisodeComponent } from '../components/Episode.component';

interface EpisodeParams {
  id: string;
}

export const Episode = () => {
  const { id } = useParams<EpisodeParams>();

  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <h1>Episode {id}</h1>
      <EpisodeComponent id={numericId} />
    </div>
  );
};
