import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Button,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaskedTextInput } from "react-native-mask-text";
import { ID } from "appwrite";
import {
  databases,
  storage,
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT,
} from "../../services/appWriteConfig";
import { useNavigation } from "@react-navigation/native";

const DATABASE_ID = "68fe300d00286f2ad20a";
const EVENTOS_COLLECTION_ID = "eventos";
const BUCKET_ID = "eventos";

export default function CreateEvent() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [local, setLocal] = useState("");
  const [endereco, setEndereco] = useState("");
  const [lotacaoMaxima, setLotacaoMaxima] = useState("");
  const [informacoesGerais, setInformacoesGerais] = useState("");
  const [participantes] = useState([]);
  const [imagem, setImagem] = useState(null);

  const [data, setData] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");

  // Função para selecionar e enviar a imagem
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) return;

      const selected = result.assets[0];
      const fileName = `evento_${Date.now()}.jpg`;

      let fileToUpload;

      if (Platform.OS === "web") {
        // --- WEB ---
        const response = await fetch(selected.uri);
        const blob = await response.blob();

        fileToUpload = new File([blob], fileName, { type: blob.type });
      } else {
        // --- MOBILE (Expo) ---
        fileToUpload = {
          uri: selected.uri,
          type: "image/jpeg",
          name: fileName,
        };
      }

      // Faz o upload no Appwrite Storage
      const uploadedFile = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        fileToUpload
      );

      // Gera a URL pública da imagem
      const imageUrl = `${APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${APPWRITE_PROJECT}`;

      setImagem(imageUrl);

      Alert.alert("Sucesso", "Imagem enviada com sucesso!");
    } catch (error) {
      console.error("Erro no upload:", error);
      Alert.alert("Erro", "Falha ao selecionar ou enviar imagem.");
    }
  };

  // Função para salvar o evento
  const handleSaveEvent = async () => {
    if (!nome || !local || !endereco || !lotacaoMaxima || !data || !horaInicio) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const lotacaoInt = parseInt(lotacaoMaxima, 10);
      if (isNaN(lotacaoInt) || lotacaoInt <= 0) {
        Alert.alert("Erro", "Lotação deve ser número inteiro positivo.");
        return;
      }

      await databases.createDocument(
        DATABASE_ID,
        EVENTOS_COLLECTION_ID,
        ID.unique(),
        {
          nome,
          local,
          endereco,
          lotacaoMaxima: lotacaoInt,
          informacoesGerais,
          imagem,
          participantes,
          data,
          horaInicio,
          horaFim,
        }
      );

      Alert.alert("Sucesso", "Evento criado com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao salvar evento.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Criar Novo Evento
      </Text>

      <Text>Nome *</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome do evento"
        style={styles.input}
      />

      <Text>Local *</Text>
      <TextInput
        value={local}
        onChangeText={setLocal}
        placeholder="Local do evento"
        style={styles.input}
      />

      <Text>Endereço *</Text>
      <TextInput
        value={endereco}
        onChangeText={setEndereco}
        placeholder="Endereço completo"
        style={styles.input}
      />

      <Text>Data *</Text>
      <MaskedTextInput
        mask="99/99/9999"
        keyboardType="numeric"
        value={data}
        onChangeText={setData}
        placeholder="DD/MM/AAAA"
        style={styles.input}
      />

      <Text>Hora de Início *</Text>
      <MaskedTextInput
        mask="99:99"
        keyboardType="numeric"
        value={horaInicio}
        onChangeText={setHoraInicio}
        placeholder="HH:MM"
        style={styles.input}
      />

      <Text>Hora de Fim</Text>
      <MaskedTextInput
        mask="99:99"
        keyboardType="numeric"
        value={horaFim}
        onChangeText={setHoraFim}
        placeholder="HH:MM"
        style={styles.input}
      />

      <Text>Lotação Máxima *</Text>
      <TextInput
        value={lotacaoMaxima}
        onChangeText={(t) => setLotacaoMaxima(t.replace(/[^0-9]/g, ""))}
        placeholder="Número máximo de pessoas"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Informações Gerais</Text>
      <TextInput
        value={informacoesGerais}
        onChangeText={setInformacoesGerais}
        placeholder="Descreva detalhes do evento"
        multiline
        style={[styles.input, { height: 80 }]}
      />

      {imagem && (
        <Image
          source={{ uri: imagem }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 10,
            marginBottom: 10,
          }}
        />
      )}

      <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Selecionar Imagem
        </Text>
      </TouchableOpacity>

      <Button title="Salvar Evento" onPress={handleSaveEvent} color="#28a745" />
    </ScrollView>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  imageButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
};
