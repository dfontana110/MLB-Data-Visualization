import React, { Component } from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';

// helper function to get a specific value for all years
const getData = (data, key) => {
  return data.map(elem => {
    return elem[key];
  });
};

class LineGraph extends Component {
  constructor() {
    super();
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.buildChart();
  }

  buildChart = () => {
    const chartRef = this.chartRef.current.getContext('2d');
    const stats = this.props.stats;
    const threeTrueOutcomes = stats.map(season => {
      let outcome = ((season.BB + season.SO + season.HR) / season.PA) * 100;
      outcome = String(outcome).slice(0, 5);
      return outcome;
    });
    const years = getData(stats, 'year');
    // const walks = getData(stats, 'BB');
    // const walkMedianLine = [walks[0], walks[walks.length - 1]];
    // const hits = getData(stats, 'H');
    // const homeRuns = getData(stats, 'HR');
    // const plateAppearances = getData(stats, 'PA');
    // const strikeouts = getData(stats, 'SO');

    const LineChart = new Chart(chartRef, {
      type: 'bar',
      data: {
        labels: years,
        borderColor: '#333333',
        backGroundColor: 'blue',

        datasets: [
          {
            label: 'Three True Outcomes',
            data: threeTrueOutcomes,
            borderColor: '#333333',
            backgroundColor: '#CC3433',
          },
        ],
      },
      options: {},
    });
  };

  render() {
    return (
      <div className="graph-container">
        <h2 className="graph-header">
          Percentage of Chicago Cubs Plate Appearances Resulting in Three True
          Outcomes (walk, strikeout or home run) from 1920-2019
        </h2>
        <canvas id="chart" ref={this.chartRef} />
      </div>
    );
  }
}
const mapState = state => ({
  stats: state.stats,
});
export default connect(mapState)(LineGraph);
