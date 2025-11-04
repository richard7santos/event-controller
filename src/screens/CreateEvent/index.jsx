import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Client, Databases, ID, Storage } from "appwrite";
import { useNavigation } from "@react-navigation/native";

// Configuração do Appwrite
const client = new Client()
  .setEndpoint("https://appwrite.cintespbr.org/v1") 
  .setProject("68f6d14f003a3e2ceea0"); 

const databases = new Databases(client);
const storage = new Storage(client);

const DATABASE_ID = "68fe300d00286f2ad20a";
const EVENTOS_COLLECTION_ID = "eventos";

export default function CreateEvent() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [local, setLocal] = useState("");
  const [endereco, setEndereco] = useState("");
  const [lotacaoMaxima, setLotacaoMaxima] = useState("");
  const [informacoesGerais, setInformacoesGerais] = useState("");
  const [imagem, setImagem] = useState(null);

  
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImagem(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao selecionar imagem");
    }
  };
navigation.navigate('EventList', { updated: true });

  
  const handleSaveEvent = async () => {
    if (!nome || !dataHora || !local || !endereco || !lotacaoMaxima) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      //  Conversão de data 'string'
      const dataFormatada = new Date(dataHora).toISOString();

      //  Conversao lotação maxima 'string'
      const lotacaoInt = parseInt(lotacaoMaxima, 10);

     
      const novoEvento = await databases.createDocument(
        DATABASE_ID,
        EVENTOS_COLLECTION_ID,
        ID.unique(),
        {
          nome,
          dataHora: dataFormatada,
          local,
          endereco,
          lotacaoMaxima: lotacaoInt,
          informacoesGerais,
          imagem,
          participantes: [],
        }
      );

      Alert.alert("Sucesso", "Evento salvo com sucesso!");

      
      navigation.navigate("DetalEvent", { evento: novoEvento });
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      Alert.alert("Erro", error.message || "Erro ao salvar evento.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>Criar Novo Evento</Text>

      <Text>Nome do Evento</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome do evento"
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }}
      />

      <Text>Data e Hora (ex: 2025-12-25T20:00)</Text>
      <TextInput
        value={dataHora}
        onChangeText={setDataHora}
        placeholder="AAAA-MM-DDTHH:mm"
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }}
      />

      <Text>Local</Text>
      <TextInput
        value={local}
        onChangeText={setLocal}
        placeholder="Digite o local do evento"
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }}
      />

      <Text>Endereço</Text>
      <TextInput
        value={endereco}
        onChangeText={setEndereco}
        placeholder="Digite o endereço"
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }}
      />

      <Text>Lotação Máxima</Text>
      <TextInput
        value={lotacaoMaxima}
        onChangeText={setLotacaoMaxima}
        placeholder="Digite o número máximo de participantes"
        keyboardType="numeric"
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }}
      />

      <Text>Informações Gerais</Text>
      <TextInput
        value={informacoesGerais}
        onChangeText={setInformacoesGerais}
        placeholder="Descreva detalhes do evento"
        multiline
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, height: 80, marginBottom: 10 }}
      />

      {imagem && (
        <Image
          source={{ uri: imagem }}
          style={{ width: "100%", height: 200, marginBottom: 10, borderRadius: 10 }}
        />
      )}

      <TouchableOpacity onPress={pickImage} style={{ backgroundColor: "#007bff", padding: 12, borderRadius: 8, marginBottom: 20 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Selecionar Imagem</Text>
      </TouchableOpacity>

      <Button title="Salvar Evento" onPress={handleSaveEvent} color="#28a745" />
    </ScrollView>
  );
}
