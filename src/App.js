import { Grid } from '@mui/material';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Header from './components/Header/Header';

function App() {
  return (
    <>
    <Header/>
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <Grid item>
        <RegistrationForm />
      </Grid>
    </Grid>
    </>
  );
}

export default App;
