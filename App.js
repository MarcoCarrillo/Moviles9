
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Peliculas from './Peliculas'

export default function App() {
  return (
    <SafeAreaProvider>
      <Peliculas/>
      {/* <View style={styles.container}>
        <Card>
        <Image
              style={{width:"100%",height:100}}
              resizeMode="contain"
              source={{ uri: "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4" }}
        />
        <Card.Title>Marco Antonio Carrillo Osuna</Card.Title>
        <Card.Divider/>
        <Text>Edad: 20</Text>
         </Card>
      </View> */}
      
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
