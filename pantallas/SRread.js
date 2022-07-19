import React from 'react';
import {useState} from 'react'
import {ScrollView, Button, View, StyleSheet, Text } from 'react-native';
import { db } from '../Server/Conexion';
import { collection, getDocs } from "firebase/firestore";

const SRread = () => {

    const styles = StyleSheet.create({
        Contenedor:{
            margin: 10,
            backgroundColor: '#0e0e12',
        },
        Sec:{
            textAlign: 'center',
            fontWeight: 'bold',
        },
        Titulo: {
            fontWeight: 'bold',
            fontSize: 30,
            color: '#f51818'
            
        },
        Subtitulo:{
            fontSize: 25,
            color: '#ffffff'
        },
      });


    const [elementos, setelementos]=useState([])

    async function leer(){
        const querySnapshot = await getDocs(collection(db, "nombres"));
        const articulos=[];
            querySnapshot.forEach((doc) => {
            const {Nombre, Talla, Color, Precio, Existencia, Categoria}=doc.data()
    
            articulos.push({
                Id:doc.id,
                Nombre,
                Talla,
                Color,
                Precio,
                Existencia,
                Categoria
            })
    })
        setelementos(articulos)
    }



    return (
        <ScrollView style={styles.Sec}>
        <Text  style={styles.Titulo} >Boutique Online</Text>
        <Button title="Catalogo"  onPress={() =>leer()}>Catalogo</Button>
        {
        elementos.map(elemento=>{
            return(
                <View style={styles.Contenedor} key={elemento.Id}>
                <Text style={styles.Titulo}>{elemento.Nombre}</Text>
                <Text style={styles.Subtitulo}>Talla:{elemento.Talla}</Text>
                <Text style={styles.Subtitulo}>Color:{elemento.Color}</Text>
                <Text style={styles.Subtitulo}>Precio:${elemento.Precio}</Text>
                <Text style={styles.Subtitulo}>Existencia:{elemento.Existencia} piezas</Text>
                <Text style={styles.Subtitulo}>Categoria:{elemento.Categoria}</Text>
                </View>
            );
        })
        }
        </ScrollView>
    )
}

export default SRread