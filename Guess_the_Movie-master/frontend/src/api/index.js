import axios from "axios";
const baseURL = "https://guessthemovie.onrender.com/";
// const baseURL = "https://guessthemovie.onrender.com/";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (e) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/getUsers`);
    return res.data;
  } catch (e) {
    return null;
  }
};
export const getAllDummyMovies = async () => {
  try {
    const res = await axios.get(`${baseURL}api/movie/getAll`);
    return res.data;
  } catch (e) {
    return null;
  }
};
export const getAllMoviesDetails = async () => {
  try {
    const res = await axios.get(`${baseURL}api/moviename/getAll`);
    console.log(res);
    return res.data;
  } catch (e) {
    return null;
  }
};

export const removeUser = async (userId) => {
  try {
    const res = axios.delete(`${baseURL}api/users/deleteUser/${userId}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const deleteMovieDetailsById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/moviename/deleteMovie/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const deleteMoviesById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/movie/deleteMovie/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};
