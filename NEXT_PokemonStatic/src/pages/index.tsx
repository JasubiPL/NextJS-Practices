import { Layout } from '../components/layouts/Layout';
import { NextPage } from 'next';
import { Button } from '@nextui-org/react';

const HomePage: NextPage = () => {
  return (
   <Layout title= 'Listado de pokemons' pokemonName='Mi pokemon' >
    <Button color={'gradient'}>Holis</Button>
   </Layout>
  )
}

export default HomePage;