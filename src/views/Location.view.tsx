import { Redirect, useParams } from 'react-router-dom';
import { LocationComponent } from '../components/Location.component';

interface LocationParams {
  id: string;
}

export const Location = () => {
  const { id } = useParams<LocationParams>();

  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <h1>Episode {id}</h1>
      <LocationComponent id={numericId} />
    </div>
  );
};
