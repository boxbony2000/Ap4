import React from 'react';
import {useState} from 'react'
import { Button, View, StyleSheet, Text, TextInput,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import SRadd from './pantallas/SRadd';
import SRread from './pantallas/SRread';
import SRupdate from './pantallas/SRupdate';
import SRdelete from './pantallas/SRdelete';


const styles = StyleSheet.create({
  Boton: {
    margin: 10,
    minWidth: "80%",
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  Boton: {
    margin: 10,
    minWidth: "40%",
    textAlign: "center",
  },
  Titulo: {
    fontWeight: 'bold',
    margin: 50,
    fontSize: 30,
    color: '#f51818'
  },
});

function LoginScreen({ navigation }) {

  const [Usuario, setusuario]=useState({
    usuario:'',
    pass:'',
  })

  const capturar =(atrib,valor) =>{
    setusuario({...Usuario,[atrib]:valor})
    }

  function verificar(){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, Usuario.usuario, Usuario.pass)
    .then((userCredential) => {
      navigation.navigate('Home')
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    });
  }


  return (
    
    <View style={styles.container}>
    <Text  style={styles.Titulo} >Boutique Online</Text>
    <TextInput
        style={styles.input}
        placeholder="Correo"
        onChangeText={(value)=>capturar('usuario',value)}
      />
    <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        onChangeText={(value)=>capturar('pass',value)}
      />

   
    
    <View  style={styles.Boton}>
      <Button
        title="ingresar"
        color="#000000"
        onPress={() =>verificar() }
      />
    </View>

    
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View
    style={styles.container} >

      <View  style={styles.Boton}>
      <Button
        title="AGREGAR PRENDAS"
        color="#2f074a"
        onPress={() => navigation.navigate('Agregar')}
      />
      </View>

      <View  style={styles.Boton}>
      <Button
        title="VER PRENDAS"
        color="#2f074a"
        onPress={() => navigation.navigate('Ver')}
      />
      </View>
      <View  style={styles.Boton}>
      <Button
        title="ACTUALIZAR PRENDAS"
        color="#2f074a"
        onPress={() => navigation.navigate('Actualizar')}
      />
      </View>
      <View  style={styles.Boton}>
      <Button
        title="ELIMINAR PRENDAS"
        color="#2f074a"
        onPress={() => navigation.navigate('Eliminar')}
      />
      </View>


    </View>
  );
}


function AddScreen({ navigation }) {
  return (
    <SRadd/>
  );
}
function ReadScreen({ navigation }) {
  return (
    <SRread/>
  );
}
function UpdateScreen({ navigation }) {
  return (
    <SRupdate/>
  );
}
function DeleteScreen({ navigation }) {
  return (
    <SRdelete/>
  );
}





const Stack = createNativeStackNavigator();

function SRMain() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Entrada">
        <Stack.Screen name="Inicio de Sesión" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Agregar" component={AddScreen} />
        <Stack.Screen name="Ver" component={ReadScreen} />
        <Stack.Screen name="Actualizar" component={UpdateScreen} />
        <Stack.Screen name="Eliminar" component={DeleteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default SRMain;