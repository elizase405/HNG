import { StatusBar } from 'expo-status-bar';
import { Webview } from 'react-native-webview ';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.p} >eliza</Text>
      <Image style={styles.img} source={require('./assets/file.png')}/>
      <Button onPress={() => {
            <Webview style={styles.a} source={uri: "https://github.com/elizase405/hng-frontend-stage-1"}/>
      }}>Open Github</Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%';
    margin: '0 auto';
    background: '#ed0f0fa6';
  },
  img: {
    height: '400px';
    width: '400px';
    padding: '20px 0';
  },
  p: {
    fontSize: '20px';
    lineHeight: '1.3em';
  },
  a: {
    marginTop: '30px';
    marginBottom: '30px';
  }
});
