import React, {useState} from 'react';
import {ScrollView, Button, Text, Image} from 'react-native';
import { firebaseApp } from './FirebaseConfig';
import { getStorage, ref, uploadString, listAll, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getFirestore, getDocs} from 'firebase/firestore';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Card } from '@rneui/base';


export default function Subir() {
    const [urls, setUrls] = useState({
        images: []
    });
    const {images} = urls;

    const subirImagen = async uri => {
        const response = await fetch(uri);
        const blob = await response;
        console.log(blob);

        const storage = getStorage();
        const rand = Math.random() * 5;
        const storageRef = ref(storage, `imagenes/imagen_${rand}.png`);
        uploadString(storageRef, blob.url, 'data_url').then(snapshot => {
            console.log(snapshot);
            console.log('La imagen se subio correctamente');
            getDownloadURL(storageRef).then(url =>{
                const db = getFirestore();
                const docRef = addDoc(collection(db, "img"), {
                    user: "user_",
                    url_image: url
                });
                console.log("Document written with id: ", docRef);
            }).catch(err => {
                console.log(err);
            })
        });
        
    }

    const seleccionarImagen = async () => {
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA);
        console.log(resultPermissions);
        const resultPermissionsCamera = resultPermissions.permissions.status;
        if(resultPermissionsCamera === 'denied') {
            alert('No tienes los permisos necesaruis');
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });
            console.log(result);
            subirImagen(result.uri);
        }
    }

    let datos = [];
    const probarDB = async () => {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "img"));  
        querySnapshot.forEach((doc) => {
            const prueba = doc;
            console.log(doc);
            console.log(prueba._document.data.value.mapValue.fields.url_image.stringValue);
            images.push(prueba._document.data.value.mapValue.fields.url_image);
            setUrls({ 
                ...urls,
                images
            });
        });
        console.log(JSON.stringify(datos));
        
        console.log(urls);
    }
    

    return(
        <ScrollView style={{ flex: 1, padding:24 }}>
            <br></br>
            <Text>Carga de Imagenes</Text>
            <br></br>
            <Button title="Subir Imagen" onPress={seleccionarImagen}></Button>
            <br></br>
            <Text>Listado</Text>
            <Button title='Listado' onPress={probarDB}></Button>
            {urls.images.map((item, i) => {
                return  <Card>
                    <Image
                        style={{ width: "100%", height: 100 }}
                        resizeMode="contain"
                        key={i}
                        source={{
                        uri: item.stringValue
                        }}
                    />
                    <Card.Divider/>
                    <Text>Usuario01</Text>
                    
                    
                </Card>
                
            })}
            
        </ScrollView>
    )
}