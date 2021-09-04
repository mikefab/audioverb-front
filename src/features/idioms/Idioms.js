import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIdioms,
  getIdioms,
  getIdiomsByMedia
} from './idiomsSlice';
import {selectLanguage} from '../language/languageSlice';

import {
  Link,
  useParams
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

export default function Idioms() {
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();
  // const { media } = useParams();
  const idioms = useSelector(selectIdioms);
  useEffect(() => {
    // dispatch(getCapsByMedia(media))
    dispatch(getIdioms(language))
  }, [dispatch, language]);

  return (
    <Container>
      <Grid container spacing={1}>
      {idioms.map((idiom, i) => (
        <Grid item xs={3} key={ Math.random().toString(36).substr(2, 9) }>
          <Link to={`/search?is_idiom=true&phrase=${idiom}`}>{idiom}</Link>
        </Grid>
        ))}
      </Grid>
    </Container>
  );
}