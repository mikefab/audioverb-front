import React, {useEffect} from 'react';

import  Spinner  from '../../spinner/Spinner';
import {
  Link
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export default function Captions(props) {
  const {media, caps, cuts, status, language} = props

  useEffect(() => {

  }, [status]);

  function color_balls(num) {
    // User is admin so show what results have already been synced
    if (localStorage.getItem('user_code')) {
      return cuts[parseInt(num)] ? 'primary' : 'error'
    } else {
      // User is not admin, show what results they've seen already
      return localStorage.getItem(`/medias/${media}/${num}`) ? 'primary' : 'error'
    }
  }
  function Lines() {
    return (
      <Grid container spacing={1}>
      {caps.map((cap, i) => (
        <Grid item xs={12} key={ Math.random().toString(36).substr(2, 9) }>
          <Grid container>
            <Grid item xs={1}>
              <FiberManualRecordIcon color={color_balls(cap.num)} />
            </Grid>
            <Grid item xs={11}>
              <Link to={`/medias/${media}/${cap.num}?language=${language}`}>{cap.cap}</Link>
            </Grid>
          </Grid>
        </Grid>
        ))}
      </Grid>
    )
  }
  return (
    <Container>
      <p>
        <b>{media}</b>
      </p>
      {status.match('idle') ? <Lines/> : <Spinner />}
    </Container>
  );
}
