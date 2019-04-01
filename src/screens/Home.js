import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LineChart } from "react-native-charts-wrapper";
import Sidebody from './Home/Sidebody';
import Table from './Home/Table';

export default class Home extends React.Component {
  state = {
    currents: [
      [123, 23, 40],
      [35, 23, 40],
      [23, 23, 40],
      [56, 23, 40],
      [35, 23, 40],
      [23, 23, 40],
      [56, 23, 40],
      [34, 23, 40],
      [123, 23, 40],
      [35, 23, 40],
      [23, 23, 40],
      [56, 23, 40],
      [35, 23, 40],
      [23, 23, 40],
      [56, 23, 40],
      [34, 23, 40],
      [23, 23, 40],
      [56, 23, 40],
      [34, 23, 40],
      [34, 23, 40],
      [3, 23, 40],
    ],
    totalPower: 1250,
  }

  render() {
    const lineCurrents = this.state.currents.map((v) => ({ y: v[0] }));
    return (
      <View style={styles.wrapper}>
        <View style={styles.monitor}>
          <LineChart style={{ flex: 1 }}
            doubleTapToZoomEnabled={false}
            drawGridBackground={false}
            chartDescription={{ text: '' }}
            data={{ dataSets: [{ label: 'arus', values: lineCurrents }] }} />
        </View>
        <View style={styles.main}>
          <Sidebody totalPower={this.state.totalPower} />
          <Table currents={this.state.currents} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  monitor: {
    flex: 0.4,
    padding: 16,
    backgroundColor: 'white',
    elevation: 6,
  },
  main: {
    flex: 0.6,
    flexDirection: 'row'
  }
})