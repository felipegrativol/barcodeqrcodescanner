import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Vibration,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';

class BarcodeScannerApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barcode: '',
      cameraType: 'back',
      text: 'Escaneie o código de barras',
      torchMode: 'off',
      type: '',
    };
  }

  setOn = () => {
    this.setState({ torchMode: 'on'});
  }
  setOff = () => {
    this.setState({ torchMode: 'off'});  
  }
  setClear = () => {
    this.setState({ text: 'Escaneie o código de barras'});  
  }


  barcodeReceived(e) {
    if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();
    
    this.setState({
      barcode: e.data,
      text: `${e.data} (${e.type})`,
      type: e.type,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <BarcodeScanner
          onBarCodeRead={this.barcodeReceived.bind(this)}
          style={{ flex: 1 }}
          torchMode={this.state.torchMode}
          cameraType={this.state.cameraType}
        />
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>{this.state.text}</Text>
          
           <View style={styles.boxButtons}>
           <Text> Flash: </Text>
            <TouchableOpacity> 
               <Text style={styles.textOn} onPress={this.setOn}> ON </Text> 
             </TouchableOpacity>
             <TouchableOpacity> 
               <Text style={styles.textOff} onPress={this.setOff}> OFF </Text> 
             </TouchableOpacity>
          
           </View>
           
           <TouchableOpacity> 
               <Text style={styles.textOff} onPress={this.setClear}> Clear </Text> 
             </TouchableOpacity>


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarText: {
    fontSize: 20,
  },
  boxButtons: {
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  textOn:{
   fontSize: 25
  },

  textOff:{
    fontSize: 25
  }
});

AppRegistry.registerComponent('BarcodeScannerApp', () => BarcodeScannerApp);