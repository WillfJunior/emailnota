
import React, {useEffect, useState} from 'react';
import {
    View, 
    Text, 
    TouchableOpacity, 
    ActivityIndicator, 
    TextInput,
    StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import baseUri from '../../services/api';

export default function Home() {
    const [text, setText] = useState('');
    const [clientes, setClientes] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        GetAllClients();
    }, [selectedValue]);

    function handleEmail() {
        setIsLoading(true);


        let notas = {
            "clienteId": selectedValue,
            "valor": text,
        }

        setTimeout(() => {
            fetch(`${baseUri}notas`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(notas)
            })
            .then((response) => response.json())
            .then((json) => {
                
    
            })
            .catch((error) => {
                console.error(error);
            });
            setIsLoading(false);
            alert('Nota enviada com sucesso!');
            setText('');
            setSelectedValue('');
        }, 3000);
        
        
    }

    

    function GetAllClients (){

        fetch(`${baseUri}clientes`)
        .then((response) => response.json())
        .then((json) => {
            setClientes(json)

        })
        .catch((error) => {
            console.error(error);
        });
    }

  return (

    <View style={styles.container}>


        <Picker
        
            selectedValue={selectedValue}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

        >
            <Picker.Item label="Selecione o Cliente" value="" />
            {
                clientes.map((item, index) => {
                    return (<Picker.Item label={item.nome} value={item.id} key={item.id} />)
                })
            }
            
        </Picker>

      <TextInput 
        style={styles.input}
        onChangeText={text => setText(text)}
        value={text}
        placeholder="Valor da Nota"
        keyboardType="numeric"
      />

        <TouchableOpacity style={styles.button} onPress={handleEmail} >
            <View style={styles.buttonIcon}>
                            
                {
                    isLoading && <View style={styles.containerSend}>
                                    <Text style={styles.buttonTextSend}>Enviando</Text>
                                    <ActivityIndicator size="small" color="#cffafe" style={{marginLeft: 5}} /> 
                                </View>||
                    <Text style={styles.buttonText}>Enviar</Text>
                                
                }

            </View>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#131016',
        alignItems: 'center',
        justifyContent: 'center',
    },

    picker: {
        height: 50,
        width: 300,
        backgroundColor: '#3e3e3e',
        marginBottom: 20,
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
    },

    input: {
        height: 50,
        width: 300,
        backgroundColor: '#3e3e3e',
        marginBottom: 20,
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
    },

    button: {
        backgroundColor: '#00875F',
        height: 50,
        width: 300,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonTextSend:{
        color: '#cffafe',
        fontWeight: 'bold',
        fontSize: 16,
    },

    buttonIcon: {
        flexDirection: 'row',
    },
    containerSend: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});