import React from 'react';
import {useState} from 'react'
import {ScrollView, Button, View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { db } from '../Server/Conexion';
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";

const SRupdate = () => {

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
        Cajas:{
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
          boton:{
            margin: 10,
            minWidth: "80%",
            justifyContent:'center',
            alignItems:'center',

        },
      });


    const [elementos, setelementos]=useState([])
    const [nombres, setnombres]=useState({
        id: '',
        nombre:'',
        talla:'',
        color:'',
        precio:'',
        existencia:'',
        categoria:''
      })

    const capturar =(atrib,valor) =>{
        setnombres({...nombres,[atrib]:valor})
    }  


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

    async function recuperar(iden){
        const docRef = doc(db, "nombres", iden);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            const txtnombre = docSnap.data().Nombre;
            const txttalla = docSnap.data().Talla;
            const txtcolor = docSnap.data().Color;
            const txtprecio = docSnap.data().Precio;
            const txtexi = docSnap.data().Existencia;
            const txtcate = docSnap.data().Categoria;
    
        setnombres({...nombres,['id']:iden, ['nombre']:txtnombre, ['talla']:txttalla, ['color']:txtcolor, ['precio']:txtprecio, ['existencia']:txtexi, ['categoria']:txtcate})
        } else {
          alert('Error al ingresar la prenda')
        }
      }

      async function actualizar(){
        const prodRef = doc(db, "nombres", nombres.id);
        await updateDoc(prodRef, {
                Nombre:nombres.nombre,
                Talla:nombres.talla,
                Color:nombres.color,
                Precio:nombres.precio,
                Existencia:nombres.existencia,
                Categoria:nombres.categoria
          });
          
        alert('La prenda se ah actualizado correctamente');
        leer();
    }

    return (
        <ScrollView style={styles.Sec}>
        <Text  style={styles.Titulo} >Boutique Online</Text>

        <View style={styles.Cajas}>

        <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombres.nombre}
        onChangeText={(value)=>capturar('nombre',value)}
        />

        <TextInput
        style={styles.input}
        placeholder="Talla"
        value={nombres.talla}
        onChangeText={(value)=>capturar('talla',value)}
        />

        <TextInput
        style={styles.input}
        placeholder="Color"
        value={nombres.color}
        onChangeText={(value)=>capturar('color',value)}
        />

        <TextInput
        style={styles.input}
        placeholder="Precio"
        value={nombres.precio}
        onChangeText={(value)=>capturar('precio',value)}
        />

        <TextInput
        style={styles.input}
        placeholder="Existencia"
        value={nombres.existencia}
        onChangeText={(value)=>capturar('existencia',value)}
        />

        <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={nombres.categoria}
        onChangeText={(value)=>capturar('categoria',value)}
        />

        </View>

        <View style={styles.boton}>
        <Button color="#de0c09" title="Actualizar"  onPress={() =>actualizar()}>Actualizar Productos</Button>
        </View>

        <Button title="Catalogo"  onPress={() =>leer()}>Catalogo</Button>
        {
        elementos.map(elemento=>{
            return(
                <TouchableOpacity 
                key={elemento.Id}
                onPress={() => recuperar(elemento.Id)}
                >
                <View style={styles.Contenedor} >
                <Text style={styles.Titulo}>{elemento.Nombre}</Text>
                <Text style={styles.Subtitulo}>Talla:{elemento.Talla}</Text>
                <Text style={styles.Subtitulo}>Color:{elemento.Color}</Text>
                <Text style={styles.Subtitulo}>Precio:${elemento.Precio}</Text>
                <Text style={styles.Subtitulo}>Existencia:{elemento.Existencia} piezas</Text>
                <Text style={styles.Subtitulo}>Categoria:{elemento.Categoria}</Text>
                </View>
                
                </TouchableOpacity  >
            );
        })
        }
        </ScrollView>
    )
}

export default SRupdate