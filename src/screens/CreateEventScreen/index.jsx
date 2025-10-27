import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './CreateEventStyle';

const CreateEventScreen = () => {
  const [form, setForm] = useState({
    titulo: '',
    subtitulo: '',
    data: '',
    horario: '',
    lotacao: '',
    local: '',
    endereco: '',
    detalhes: '',
    imagem: null,
  });

  const [isAdmin] = useState(true); 
  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setForm({ ...form, imagem: result.assets[0].uri });
    }
  };

  const handleSave = () => {
    console.log('Novo evento salvo:', form);
    alert('Evento criado com sucesso!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Novo Evento</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={form.titulo}
        onChangeText={(value) => handleChange('titulo', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Subtítulo"
        value={form.subtitulo}
        onChangeText={(value) => handleChange('subtitulo', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Data"
        value={form.data}
        onChangeText={(value) => handleChange('data', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Horário"
        value={form.horario}
        onChangeText={(value) => handleChange('horario', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Lotação"
        value={form.lotacao}
        onChangeText={(value) => handleChange('lotacao', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Local"
        value={form.local}
        onChangeText={(value) => handleChange('local', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={form.endereco}
        onChangeText={(value) => handleChange('endereco', value)}
      />

      <TextInput
        style={[styles.input, { height: 90 }]}
        multiline
        placeholder="Detalhes"
        value={form.detalhes}
        onChangeText={(value) => handleChange('detalhes', value)}
      />

      {}
      {isAdmin && (
        <View style={styles.imageContainer}>
          {form.imagem ? (
            <Image source={{ uri: form.imagem }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.imagePlaceholder}>Nenhuma imagem selecionada</Text>
          )}
          <TouchableOpacity style={styles.imageBtn} onPress={handlePickImage}>
            <Text style={styles.imageBtnText}>Adicionar Imagem</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Salvar Evento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateEventScreen;
