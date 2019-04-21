import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Path } from 'react-native-svg';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import firebase from 'react-native-firebase';
import moment from 'moment';

import Table, { tableHeadCell, tableBodyCell } from '../components/Table';
import { normalize } from '../components/utility';

export default class Home extends React.Component {
  static navigationOptions = {
    header: null,
  }
  state = {
    list: [],
    totalPower: 0,
  }
  componentDidMount() {
    this.readCurrentData();
  }
  render() {
    const linePower = this.state.list.map((v) => v.power);
    const Line = ({ line, color }) => (
      <Path
        key={'line'}
        d={line}
        strokeWidth={2}
        stroke={color}
        fill={'none'} />
    )
    const rows = this.state.list.map((v) => {
      let { power } = v;
      if (typeof power === 'number') power = v.power.toFixed(5);

      return [
        tableBodyCell(moment.unix(v.timestamp).format('DD-MM-YYYY')),
        tableBodyCell(power),
      ];
    })
    return (
      <View style={styles.wrapper}>
        <View style={styles.monitor}>
          <View style={{ flex: 1 }}>
            <AreaChart style={{ flex: 1 }}
              curve={shape.curveNatural}
              data={linePower}
              contentInset={{ top: 20, bottom: 30 }}
            >
              <Grid svg={{
                strokeOpacity: 0.1,
              }} />
              <Line color='#5B8930' />
            </AreaChart>
          </View>
        </View>
        <View style={styles.main}>
          <Table rows={rows} heads={[
            tableHeadCell('Time', 'Day-Month-Year'),
            tableHeadCell('Power', ['Watt', '#5B8930']),
          ]} />
          <View style={styles.tabTitleWrapper}>
            <Text style={styles.tabTitle}>Daily</Text>
          </View>
        </View>
      </View>
    )
  }

  readCurrentData() {
    const db = firebase.database();
    const vm = this;
    db.ref(`/daily/`).on('child_added', function (snap) {
      const snapVal = snap.val();
      vm.setState(p => {
        return ({
          list: [
            ...p.list,
            { power: snapVal.power, timestamp: snap.key }
          ]
        })
      })
    })
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  tabTitleWrapper: {
    opacity: 0.15,
    position: 'absolute',
    left: 16,
    bottom: 16,
  },
  tabTitle: {
    fontSize: normalize(48),
    fontWeight: 'bold'
  },
  powerTitle: {
    position: 'absolute',
    bottom: 0,
    right: 16
  },
  monitor: {
    flex: 0.3,
    padding: 16,
    backgroundColor: 'white',
    // elevation: 6,
  },
  main: {
    flex: 0.7,
    flexDirection: 'row'
  }
})