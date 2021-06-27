import React, {useEffect, useState} from 'react';
import { } from 'react-redux';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import {
  Link,
  useHistory
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

export function SeachHistory() {
  const [storageObserver, setObserver] = useState(0);
  const history = useHistory()
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    history.push('/history')
  }, [ history, localStorage]);

  function handleDelete(key) {
    localStorage.removeItem(key)
    setObserver(key)
  }
  useEffect(() => {
  }, [storageObserver])

  return (
    <Container>
    <p>
      Search history
    </p>
      <Grid container spacing={1}>
      {Object.keys(localStorage).filter(e => {
        return e.match(/search-\d{13}/)
      }).sort().reverse().map((key, i) => (

        <Grid container  key={ Math.random().toString(36).substr(2, 9) }>
          <Grid item xs={1} >
            <DeleteOutline onClick = {() => { handleDelete(key); }}/>
          </Grid>
          <Grid item xs={11}>
            <Link to={`/search?phrase=${localStorage.getItem(key)}`} >{localStorage.getItem(key)}</Link>
          </Grid>
        </Grid>
        ))}
      </Grid>
    </Container>
  );
}
