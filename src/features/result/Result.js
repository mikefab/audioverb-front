import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResult, selectResult } from '../result/resultSlice';
import { getAudio } from '../player/playerSlice';
import { Player } from '../player/Player';
import {
  Link,
  useParams,
} from "react-router-dom";
import Container from '@material-ui/core/Container'
import Translate from '@material-ui/icons/Translate';
import Grid from '@material-ui/core/Grid';

export function Result() {
  const dispatch = useDispatch();
  const result = useSelector(selectResult);
  const { tense, verb, conjugation, name, num } = useParams();

  useEffect(() => {
    dispatch(getResult(`${name}^${num}`))

  }, [dispatch, name, num]);

  function handleTranslate(cap) {
    console.log(cap)
    window.open(
      `https://translate.google.com/?sl=es&tl=en&text=${cap.cap}&op=translate`,
      '_blank'
    )
  }
  function handlePlay(cap) {
    dispatch(getAudio(cap))
  }
  return (
    <Container  style={{height: '600px', overflow: 'auto'}} >
      <Link to={`/tenses/`}>tenses</Link> / <Link to={`/tenses/${tense}`}>{tense}</Link> / <Link to={`/tenses/${tense}/${verb}`}>{verb}</Link> / <Link to={`/tenses/${tense}/${verb}/${conjugation}`}>{conjugation}</Link>
      <br/><br/>
      <Grid container>
        <Grid item xs={12}>
          <Player />
        </Grid>
        {result.map((cap, i3) => (
          <Grid container key={i3+1000}>
              <Grid item xs={1}>
                <Translate onClick = {() => handleTranslate(cap)} style={{cursor: 'pointer'}} />
              </Grid>
              <Grid item xs={11}>
                 <span onClick = {() => handlePlay(cap)} style={{cursor: 'pointer'}} >{cap.cap}</span>
              </Grid>
              </Grid>
          ))}

      </Grid>
    </Container>
  );
}