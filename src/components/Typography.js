import React from 'react';
import PropTypes from 'prop-types';

import { Text, View } from 'react-native';

export default class Typography extends React.Component {
  render() {
    <Text style={{
      ...this.props.style,
      fontSize: ()=>{
        
      }
    }}>{this.props.children}</Text>
  }

  fontSize(variant) {
    return 
  }
}

Typography.propTypes = {
  variant: PropTypes.oneOf([
    'headline',
    'title',
    'subheader',
    'quote',
    'large-body',
    'body',
    'secondary-body',
    'placeholder',
    'button'
  ]),
}