import axios from 'axios';

const SET_STATS = 'SET_STATS';

export const setStats = stats => ({
  type: SET_STATS,
  stats,
});

export const fetchStats = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/cubs');
    dispatch(setStats(data));
  } catch (err) {
    console.log(err);
  }
};

const initialState = [];

const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATS:
      return action.stats;
    default:
      return state;
  }
};

export default statsReducer;
