import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getConjugations, selectConjugations} from '../verb/verbSlice';


import { Results } from '../results/Results';
// import {
//   getResults
// } from '../results/resultsSlice';

import {
  Link,
  useParams,
  useHistory
} from "react-router-dom";

import Container from '@material-ui/core/Container'
import env from "react-dotenv";
const wait_time = env.REACT_APP_WAIT_TIME
export function Verb() {
  let history = useHistory();

  let { tense, verb, conjugation } = useParams();

  const dispatch = useDispatch();

  // dispatch(getResults(conjugation))

  const conjugations = useSelector(selectConjugations);
  if (!conjugation) {
    if (conjugations.length > 0) {
      setTimeout(() => {
        history.push(`/tenses/${tense}/${verb}/${conjugations[0]}`)
      }, wait_time)
    }
  }


  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatch(getConjugations([tense, verb]))


  }, [dispatch, tense, verb]);

  function add_comma(i) {
    if (conjugations.length -1 === i) {
      return ''
    }
    return ','
  }

  function handleClick(instance) {
    history.push(`/tenses/${tense}/${verb}/${instance}`)
  }

  return (
    <Container >
      <Link to={`/tenses/`}>tenses</Link> / <Link to={`/tenses/${tense}`}>{tense}</Link> / <b>{verb}</b>/ <b>{conjugation}</b>
      <br />
      <br />
      {conjugations.map((instance, i) => (
          <span
            key = {i}
            style={{ fontSize: '14px', cursor: 'pointer', paddingLeft: '5px'}}
          >
            <span onClick={() => handleClick(instance)}>
              <i>{instance}</i>
            </span>
            {add_comma(i)}
          </span>
      ))}
      <br />

      <Results conjugation={conjugation} />
    </Container>
  );
}