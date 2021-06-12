import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResults, selectResults, setSelectedResult } from './resultsSlice';

import { getAudio } from '../player/playerSlice';

import { makeStyles } from '@material-ui/core/styles';
import {
  Link,
  useParams,
  useLocation
} from "react-router-dom";
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    fontSize: 14,
  },

  title: {
    fontSize: 14,
  },

});


export function Results(props) {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  const phrase = query.get('phrase')
  const dispatch = useDispatch();
  const {conjugation} = props
  let results = useSelector(selectResults);
  if (!conjugation && !phrase) {
    results = []
  }

  const classes = useStyles();
  const { tense, verb } = useParams();

  useEffect(() => {
    dispatch(getResults(conjugation || phrase))

  }, [conjugation, dispatch, phrase]);

  function handlePlay(cap) {
    dispatch(getAudio(cap))
    dispatch(setSelectedResult(cap))
  }

  function parseLink(cap, tense, verb, conjugation) {
    if (phrase) {
      return `/search/${cap.name.name.replace(/\s+/g, '_')}/${cap.num}`
    }
    return `/tenses/${tense}/${verb}/${conjugation}/${cap.name.name.replace(/\s+/g, '_')}/${cap.num}`
  }

  return (
    <Container  style={{height: '600px', overflow: 'auto'}} >

        {results.map((result, i) => (
          <div key={i} className={classes.root} >

                  <Typography variant="h5" component="h2">
                    {result.name}
                  </Typography>

                  {result.children.map((cap, i2) => (
                    <div key={i2+1000} >
                        <Grid container>
                          <Grid item xs={1} onClick={() => handlePlay(cap)}>
                            *
                          </Grid>
                          <Grid item xs={11}>
                            <Link style={{textDecoration: 'none'}} to={parseLink(cap, tense, verb, conjugation)} >{cap.cap}</Link>
                          </Grid>
                        </Grid>
                        </div>
                    ))}


              </div>
          ))}
    </Container>
  );
}
