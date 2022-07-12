import React from 'react';
import {useState} from 'react'
import {ScrollView, Button, View, StyleSheet, TextInput, Text } from 'react-native';
import { db } from '../server/conexion';
import { collection, addDoc } from "firebase/firestore";
import { TouchableOpacity } from 'react-native-web';

const SRread = () => {

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
      });


      const [elementos, setelement]=useState({
        nombre:'',
        talla:'',
        color:'',
        precio:'',
        existencia:'',
        categoria:''
      })

      const capturar =(atrib,valor) =>{
        setelement({...elementos,[atrib]:valor})
        console.log(elementos)
        }


      async function agregar(){
          if(elementos.nombre === '' | elementos.talla === ''
             | elementos.color === '' | elementos.precio === ''
             | elementos.existencia === '' | elementos.categoria === ''){
          alert('Para agregar una prenda llena todos los campos que estan vacios')
          }else{
          
            try {

              const precio = parseFloat(elementos.precio)
              const existencia= parseInt(elementos.existencia)

              await addDoc(collection(db, "nombres"), {
                Nombre:elementos.nombre,
                Talla:elementos.talla,
                Color:elementos.color,
                Precio:precio,
                Existencia:existencia,
                Categoria:elementos.categoria
              });
              alert('Se agrego correctamente la prenda')
            } catch (e) {
              alert("Error al agregar la prenda: ", e);
            }
            
          }
       
        }

    return (
        <ScrollView style={styles.sec}>
            <Text  style={styles.Titulo} > Ver Información</Text>
            <Button title='Leer' onPress={() => Leer()}>Ver Prendas</Button>
            {
                articulos.map(articulo=>{
                    return(
                        <TouchableOpacity
                        key={articulo.id}>
                        <View styles={styles.container} >
                            <Text style={styles.Titulo}>{articulo.Producto}</Text>
                            <Text style={styles.Subtitulo}>${articulo.Precio}</Text>
                        </View>
                        </TouchableOpacity>
                    );
                })
            }
        </ScrollView>
        )
}

export default SRread