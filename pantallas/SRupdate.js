import React from 'react';
import {useState} from 'react'
import {ScrollView, Button, View, StyleSheet, TouchableOpacity, } from 'react-native';
import { db } from '../server/conexion';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const SRupdate = () => {

    const styles = StyleSheet.create({
        Contenedor:{
            margin: 10,
            backgroundColor: '#8c0401',
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 20,
            color: '#000000',
            backgroundColor: '#69d4db'
        },
        Button: {
            margin: 10,
            minWidth: "40%",
            textAlign: "center",
            color: '#fff'
        },
        sec: {
            textAlign: 'center',
            fontWeight: 'bold',
        },
        Titulo: {
            fontWeight: 'bold',
            fontSize: 30,
        },
        Subtitulo: {
            fontSize: 25,
        },
    });


    const [elementos, setelementos]=useState([])

    async function leer(){
        const querySnapshot = await getDocs(collection(db, "nombres"));
        const articulos=[];
            querySnapshot.forEach((doc) => {
        const {nombre, talla, color, precio, existencia, categoria}=doc.data()

        articulos.push({
            Id:doc.id,
            nombre, 
            talla, 
            color, 
            precio, 
            existencia, 
            categoria
        })
    })
        setelementos(articulos)

    }


    return (
        <ScrollView style={styles.sec}>
            <Text  style={styles.Titulo} > Ver Información</Text>
            <Button title="Leer" onPress={() =>leer()}>Ver Prendas</Button>
            {
                elementos.map(elemento=>{
                    return(
                        <TouchableOpacity key={elemento.Id}>
                            <View style={styles.Contenedor} >
                            <Text style={styles.Titulo}>nombre:{elemento.nombre}</Text>
                            <Text style={styles.Subtitulo}>talla:{elemento.talla}</Text>
                            <Text style={styles.Subtitulo}>color:{elemento.color}</Text>
                            <Text style={styles.Subtitulo}>precio:${elemento.precio}</Text>
                            <Text style={styles.Subtitulo}>existencia:{elemento.existencia}</Text>
                            <Text style={styles.Subtitulo}>categoria:{elemento.categoria}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })
            }
        </ScrollView>
        )
}

export default SRupdate