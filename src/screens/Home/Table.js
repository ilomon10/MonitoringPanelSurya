import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Table as RNTable, Row, Rows } from 'react-native-table-component';
import { normalize } from '../../components/utility';

export default Table = props => {
  const rows = props.currents.map((v) => {
    return [...v.map(a => tableBodyCell(a))];
  })
  return (
    <View style={styles.body}>
      <RNTable style={styles.tableHead} borderStyle={{ borderColor: 'transparent' }}>
        <Row data={[
          tableHeadCell('Time', 'hh:mm'),
          tableHeadCell('Power', 'watt'),
          tableHeadCell('Temp', 'celcius')]} />
      </RNTable>
      <View style={styles.hr}></View>
      <ScrollView>
        <RNTable style={{ padding: 8 }} borderStyle={{ borderColor: 'transparent' }}>
          <Rows data={rows} />
        </RNTable>
      </ScrollView>
    </View>
  )
}

const tableHeadCell = (a, b) => (
  <View style={styles.tableHeadCell}>
    <Text style={{ fontSize: normalize(16), textAlign: 'right' }}>{a}</Text>
    <Text style={{ fontSize: normalize(12), textAlign: 'right', fontStyle: 'italic' }}>{b}</Text>
  </View>
)

const tableBodyCell = (a) => (
  <Text style={styles.tableBodyCell}>{a}</Text>
)

const styles = StyleSheet.create({
  body: {
    flex: 8
  },
  hr: {
    height: 2,
    backgroundColor: '#EAEAEA'
  },
  tableHead: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 22,
    paddingBottom: 22,
  },
  tableBodyCell: {
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: normalize(16),
    textAlign: 'right',
  },
  tableHeadCell: {
    paddingLeft: 8,
    paddingRight: 8,
  }
})