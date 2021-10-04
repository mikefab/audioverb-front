import axios from 'axios';
import env from "react-dotenv";

const base = env.REACT_APP_HOST

export function fetchIdioms(lng) {
  return new Promise((resolve, reject) => {
    axios.get(base + `idioms/${lng}`)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}

export function fetchIdiomsByMedia(kind, media) {
  return new Promise((resolve, reject) => {
    axios.get(base + `idioms/media/` + media)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}
