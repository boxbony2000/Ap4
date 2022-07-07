import React from 'react';
import {useState} from 'react'
import {ScrollView, Button, View, StyleSheet, TextInput, Text } from 'react-native';

const SRadd = () => {

    const styles = StyleSheet.create({
        Contenedor:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    const [elementos, setelement]=useState({
        producto:'',
        precio:'',
        existencia:'',
        categoria:''
    })

    const capturar =(atrib,valor)=>{
        setelement({...elemtentos,[atrib]:valor})
    }

    return (
        <ScrollView style={styles.Contenedor}>
            
            <Text>
            Nombre:
            </Text>
            <input></input>
            
            <Text>
            Correo:
            </Text>
            <input></input>
            
            
            <Text>
            Telefono:
            </Text>
            <input></input>
        
        <Button
        title="Gardar Informacion"
        color="#6e0307"
        />
            
            
        
        </ScrollView>
    )
}

export default SRadd