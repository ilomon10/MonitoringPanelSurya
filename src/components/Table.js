import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Table as RNTable, Row, Rows } from 'react-native-table-component';
import { normalize } from './utility';

export default Table = props => {
  return (
    <View style={styles.body}>
      <RNTable style={styles.tableHead} borderStyle={{ borderColor: 'transparent' }}>
        <Row data={props.heads} />
      </RNTable>
      <View style={styles.hr}></View>
      <ScrollView style={{ backgroundColor: '#EAEAEA' }}>
        <RNTable style={{ padding: 8 }} borderStyle={{ borderColor: 'transparent' }}>
          <Rows data={props.rows} />
        </RNTable>
        {!props.rows.length &&
          <Text style={{ fontSize: normalize(16), textAlign: 'center' }}>Belum ada Data</Text>
        }
      </ScrollView>
    </View>
  )
}

export const tableHeadCell = (a, b) => {
  let aColor;
  let aVal = a;
  let bColor;
  let bVal = b;
  if (Array.isArray(a)) { aColor = a[1]; aVal = a[0]; }
  if (Array.isArray(b)) { bColor = b[1]; bVal = b[0]; }
  return (
    <View style={styles.tableHeadCell}>
      <Text style={{ fontSize: normalize(16), color: aColor, textAlign: 'right' }}>{aVal}</Text>
      <Text style={{ fontSize: normalize(12), color: bColor, textAlign: 'right', fontStyle: 'italic' }}>{bVal}</Text>
    </View>
  )
}

export const tableBodyCell = (a) => (
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
    paddingTop: 16,
    paddingBottom: 16,
  },
  tableBodyCell: {
    paddingBottom: 16,
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