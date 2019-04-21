import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import firebase from 'react-native-firebase';

import Button from '../components/Button';

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    this.setState({ submit: true });
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ errorMessage: 'Please input your information.' });
      return;
    }
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: 'bold' }}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={((!this.state.email && this.state.submit) || this.state.errorMessage) ? { ...styles.textInput, ...styles.textInputEmpty } : styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={((!this.state.password && this.state.submit) || this.state.errorMessage) ? { ...styles.textInput, ...styles.textInputEmpty } : styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style={{marginTop: 16, width: '90%'}}>
          <Button title="Login" onPress={this.handleLogin} />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAEAEA',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    backgroundColor: 'white',
    height: 48,
    borderRadius: 4,
    width: '90%',
    marginTop: 16
  },
  textInputEmpty: {
    borderWidth: 1,
    borderColor: '#FF5722'
  },
  button: {
    width: '90%',
    height: 48,
    marginTop: 16
  }
})