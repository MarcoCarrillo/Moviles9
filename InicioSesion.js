import React, { useState } from "react";
import { Text, View, Button } from 'react-native';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";
import Login from './Login';


export default function InicioSesion(){
    const [usuario, setusuario] = useState("");
    const [password, setpassword] = useState("");
    const [er, setEr] = useState(false);
    const [exito, setExito] = useState(false);
    const auth = getAuth();
    const navigation = useNavigation();

    const registrar = function () {
        console.log(password);
        console.log(usuario);
        console.log("Registar");
        createUserWithEmailAndPassword(auth, usuario, password)
        .then(userCredential => {
            console.log(userCredential);
            const user = userCredential.user;
            if(user){
                console.log('Usuario creado');
                setExito(true);
                navigation.navigate('Login')
            }
        }).catch ( e => {
            console.log(e);
            setEr(true);
        })
        ;
    }
    return (
        <View style={{ flex: 1, padding:24 }}>
            {exito ? <Text>Usuario creado correctamente</Text> : <Text>Email</Text>}
            {exito ? <Text></Text> : <input  onChange={(e) => setusuario(e.nativeEvent.target.value)}  type={Text}></input> }
            <br></br>
            {exito ? <Text></Text> : <Text>Password</Text>}
            {exito ? <Text></Text> : <input onChange={(e) => setpassword(e.nativeEvent.target.value)} type={Text}></input>}
            
            <br></br>
            
            {exito ? null : <Button title="Crear Usuario" onPress={() => registrar()}></Button>}
            
            {er ? <Text>Hubo un error!</Text> : <Text></Text>}
        </View>
    )
}