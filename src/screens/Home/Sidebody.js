import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { numberWithCommas, normalize } from '../../components/utility';

export default Sidebody = props => {
  const sidebodyVar = {
    textLength: (Dimensions.get('screen').height - Dimensions.get('screen').width) / 2,
    textHeight: 40
  }
  return (
    <View style={styles.sidebodyWrapper}>
      <View style={styles.sidebody}>
        <View style={{ width: sidebodyVar.textHeight, height: sidebodyVar.textLength }}>
          <Text style={{
            textAlign: 'right',
            color: 'white',
            transform: [
              { rotate: "-90deg" },
              { translateX: -(sidebodyVar.textLength / 2 - sidebodyVar.textHeight / 2) },
              { translateY: (sidebodyVar.textHeight / 2 - sidebodyVar.textLength / 2) }
            ], width: sidebodyVar.textLength, height: sidebodyVar.textHeight
          }}>
            <Text style={{ fontSize: normalize(30) }}>{numberWithCommas(props.totalPower)}</Text>
            <Text style={{ fontSize: normalize(20) }}>kWh</Text>
          </Text>
        </View>
      </View>
      <View style={styles.sidebody}>
        <View style={{ width: 20, height: 100 }}>
          <Text style={{
            textAlign: 'left',
            color: 'white',
            transform: [
              { rotate: "-90deg" },
              { translateX: -(100 / 2 - 20 / 2) },
              { translateY: (20 / 2 - 100 / 2) }
            ], width: 100, height: 20
          }} numberOfLines={1}>
            <Text style={{ fontSize: normalize(14) }}>Total Power</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sidebody: {
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'flex-end',
  },
  sidebodyWrapper: {
    flex: 2,
    justifyContent: 'space-between',
    backgroundColor: '#4A5B6E',
  },
})