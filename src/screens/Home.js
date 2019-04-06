import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Path } from 'react-native-svg';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import firebase from 'react-native-firebase';

import Sidebody from './Home/Sidebody';
import Table from './Home/Table';

firebase.auth()
  .signInAnonymously()
  .then(credential => {
    if (credential) {
      console.log('default app user ->', credential.user.toJSON());
    }
  });

export default class Home extends React.Component {
  state = {
    currents: [],
    totalPower: 1250,
  }
  componentDidMount() {
    this.readCurrentData();
  }
  render() {
    const lineCurrents = this.state.currents.map((v) => (parseInt(v.current)));
    const Line = ({ line }) => (
      <Path
        key={'line'}
        d={line}
        strokeWidth={4}
        stroke={'#4A5B6E'}
        fill={'none'} />
    )
    return (
      <View style={styles.wrapper}>
        <View style={styles.monitor}>
          <AreaChart style={{ flex: 1 }}
            curve={shape.curveNatural}
            data={lineCurrents}
            svg={{ fill: '#4A5B6E55' }}
            contentInset={{ top: 8 }}
          >
            <Grid svg={{
              strokeOpacity: 0.25,
            }} />
            <Line />
          </AreaChart>
        </View>
        <View style={styles.main}>
          <Sidebody totalPower={this.state.totalPower} />
          <Table currents={this.state.currents} />
        </View>
      </View>
    )
  }

  readCurrentData() {
    const db = firebase.database();
    const vm = this;
    db.ref('/arus').on('child_added', function (snap) {
      const snapList = snap.val();
      let ret = snapList;
      Object.keys(snapList).forEach(v => { ret[v] = parseInt(snapList[v]) });
      vm.setState(p => {
        return ({
          currents: [
            ...p.currents,
            ret
          ],
          totalPower: p.currents.reduce((p, c) => p += c.current, 0) + ret.current
        })
      })
    })
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