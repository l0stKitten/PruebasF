import axios from "axios";

export const programarRequest = (formData) =>
  axios.post("http://localhost:8000/api/programar", formData);