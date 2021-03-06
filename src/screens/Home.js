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
    console.log(firebase.auth().currentUser);
    this.readCurrentData();
  }
  render() {
    const lineCurrents = this.state.list.map((v) => v.current);
    const lineVoltage = this.state.list.map((v) => v.voltage);
    const Line = ({ line, color }) => (
      <Path
        key={'line'}
        d={line}
        strokeWidth={2}
        stroke={color}
        fill={'none'} />
    )
    const rows = this.state.list.map((v) => {
      let { voltage, current, temperature } = v;

      if (typeof voltage === 'number') voltage = v.voltage.toFixed(2);
      if (typeof current === 'number') current = v.current.toFixed(2);
      if (typeof temperature === 'number') temperature = v.temperature.toFixed(2);

      return [
        tableBodyCell(moment.unix(v.timestamp).format('HH:mm')),
        tableBodyCell(voltage),
        tableBodyCell(current),
        tableBodyCell(temperature),
      ];
    })
    return (
      <View style={styles.wrapper}>
        <View style={styles.monitor}>
          <View style={{ flex: 1 }}>
            <AreaChart style={{ flex: 1 }}
              curve={shape.curveNatural}
              data={lineCurrents}
              contentInset={{ top: 20, bottom: 30 }}
            >
              <Grid svg={{
                strokeOpacity: 0.1,
              }} />
              <Line color='#22A7F0' />
            </AreaChart>
            <AreaChart style={StyleSheet.absoluteFill}
              curve={shape.curveNatural}
              data={lineVoltage}
              contentInset={{ top: 30, bottom: 30 }}>
              <Line color='#F9690E' />
            </AreaChart>
          </View>
          <View style={styles.powerTitle}>
            <Text>
              <Text style={{ fontSize: normalize(12) }}>Power </Text>
              <Text style={{ fontSize: normalize(12), fontWeight: 'bold', color: '#5B8930' }}>{this.state.totalPower}</Text>
              <Text style={{ fontSize: normalize(12) }}> Watt</Text>
            </Text>
          </View>
        </View>
        <View style={styles.main}>
          <Table rows={rows} heads={[
            tableHeadCell('Time', 'hh:mm'),
            tableHeadCell('Voltage', ['Volt', '#F9690E']),
            tableHeadCell('Current', ['Ampere', '#22A7F0']),
            tableHeadCell('Temp', 'Celcius'),
          ]} />
          <View style={styles.tabTitleWrapper}>
            <Text style={styles.tabTitle}>Today</Text>
          </View>
        </View>
      </View>
    )
  }

  readCurrentData() {
    const db = firebase.database();
    const vm = this;
    const nowUTC = moment.utc();
    const docs = nowUTC.startOf('date').unix();
    db.ref(`/daily/${docs}/data`).orderByChild('timestamp', 'desc').on('child_added', function (snap) {
      const snapList = snap.val();
      vm.setState(p => {
        return ({
          list: [
            ...p.list,
            snapList
          ]
        })
      })
    })
    db.ref(`/daily/${docs}/power`).on('value', (snap) => {
      let totalPower = snap.val();
      if(typeof totalPower === 'number') totalPower = totalPower.toFixed(2);
      this.setState({
        totalPower
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