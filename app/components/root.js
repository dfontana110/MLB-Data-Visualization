import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { fetchStats } from '../redux/cubs';
import { connect } from 'react-redux';
import LineGraph from './LineGraph';
import Home from './Home';

class Root extends React.Component {
  componentDidMount() {
    this.props.fetchStats();
  }
  render() {
    return (
      <Router>
        <React.Fragment>
          <header>
            <div className="title">
              <h1>MLB Data Visualization</h1>
            </div>
            <nav>
              <Link className="link" to="/">
                HOME
              </Link>
              <Link className="link" to="/cubs-true-outcomes-1920-2019">
                DATA
              </Link>
            </nav>
          </header>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/cubs-true-outcomes-1920-2019"
            component={LineGraph}
          />
        </React.Fragment>
      </Router>
      // </Router>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    fetchStats: () => dispatch(fetchStats()),
  };
};
export default connect(
  null,
  mapDispatch
)(Root);
