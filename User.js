import React from 'react';
import {Text, View } from 'react-native';
import { Card, Image } from "@rneui/themed";

export default function User (props) {

    //console.log(props);
    
    const usuario = props.route.params.usuario;


  return (
    
    <View style={{ flex: 1, padding: 24 }}>
        
        <Card>
        <Image
          style={{ width: "100%", height: 100 }}
          resizeMode="contain"
          source={{
            uri: "https://www.w3schools.com/howto/img_avatar.png",
          }}
        />
        <Text>{usuario.name}</Text>
        <Card.Divider />
        <Text>{usuario.username}</Text>
        <Text>{usuario.email}</Text>
        <Card.Divider />
        <Text>
          Address: {usuario.address.street} {usuario.address.suite}{" "}
          {usuario.address.city}
        </Text>
        <Text>ZipCode: {usuario.address.zipcode}</Text>
        <Text>Phone: {usuario.phone}</Text>
        <Text>Website: {usuario.website}</Text>
        <Card.Divider />
        <Text>{usuario.company.name}</Text>
        <Text>{usuario.company.catchPhrase}</Text>
        <Text>{usuario.company.bs}</Text>
      </Card>
         
    </View>
    

  );
};