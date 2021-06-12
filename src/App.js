import React from 'react';
import  Nav  from './features/nav/Nav';
import { Tenses } from './features/tenses/Tenses';
import { Results } from './features/results/Results';
import { Verb } from './features/verb/Verb';
import Verbs from './features/verbs/Verbs';
import  {Result} from './features/result/Result';
import Container from '@material-ui/core/Container'

import {
  Switch,
  Route,

} from "react-router-dom";
import './App.css';

function App() {
  return (
      <Container maxWidth="sm" justify="center" >
      <Nav/>
        <Switch>
          <Route path={`/search/:name/:num`} component={Result}/>
          <Route path='/search' component = {Results} />}
          <Route exact path="/" component = {Tenses} />
          <Route path={`/tenses/:tense/:verb/:conjugation/:name/:num`} component={Result}/>
          <Route path={`/tenses/:tense/:verb/:conjugation`} component={Verb}/>
          <Route path={`/tenses/:tense/:verb`} component={Verb}/>
          <Route path={`/tenses/:tense`} component={Verbs}/>
          <Route path="/tenses" component={Tenses} />
        </Switch>
      </Container>
  );
}

export default App;
