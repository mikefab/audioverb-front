import axios from 'axios';
import env from "react-dotenv";

const base = env.REACT_APP_HOST

export function fetchVerbsByMedia(media) {
  return new Promise((resolve, reject) => {
    axios.get(base + 'verbs_for_name/' + media)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}

export function fetchCapsByMedia(media) {
  return new Promise((resolve, reject) => {
    axios.get(base + 'nam/' + media)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}