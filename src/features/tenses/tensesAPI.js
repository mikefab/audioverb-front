import axios from 'axios';
import env from "react-dotenv";

const base = env.REACT_APP_HOST

export function fetchTenses(language) {
  return new Promise((resolve, reject) => {
    axios.get(base + `tenses/${language}`)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}
