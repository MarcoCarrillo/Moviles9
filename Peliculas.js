import React, {Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native';
import { ListItem, Avatar, Icon } from '@rneui/themed'

export default function Peliculas() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
     try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);


  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        // <FlatList
        //   data={data}
        //   keyExtractor={({ id }, index) => id}
        //   renderItem={({ item }) => (
        //       <Fragment>
        //           <Text>#: {item.id} {item.username}</Text>
        //           <Button onPress={() => console.log({item})}>{item.name}</Button>
        //       </Fragment>
            
        //   )}
        // />
        data.map((l, i) => (
          <ListItem key={i} bottomDivider>
           {l.avatar_url ? <Avatar source={{uri: l.avatar_url}} /> : <Icon reverse name='accesibility' />} 
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      )}
    </View>
  );
};
