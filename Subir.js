import React from 'react';
import {View, Button, Text} from 'react-native';
import { firebaseApp} from './FirebaseConfig';
import { getStorage, ref, uploadString } from 'firebase/storage';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default function Subir() {
    const subirImagen = async uri => {
        const response = await fetch(uri);
        const blob = await response;
        console.log(blob);

        const storage = getStorage();
        const storageRef = ref(storage, 'imagenes/imagen1.png');
        uploadString(storageRef, blob.url, 'data_url').then(snapshot => {
            console.log(snapshot);
            console.log('La imagen se subio correctamente');
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

    return(
        <View>
            <Button title="Subir Imagen" onPress={seleccionarImagen}></Button>
        </View>
    )
}