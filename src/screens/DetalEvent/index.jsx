import React from "react";
import { View, Text, ScrollView, Button, Image } from "react-native";
import { styles } from "./DetalEventStyle";
import { useNavigation, useRoute } from "@react-navigation/native";

const DetalEvent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { evento } = route.params; 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{evento.titulo}</Text>

      {evento.subtitulo ? (
        <>
          <Text style={styles.label}>Subtítulo:</Text>
          <Text style={styles.text}>{evento.subtitulo}</Text>
        </>
      ) : null}

      <Text style={styles.label}>Data:</Text>
      <Text style={styles.text}>{evento.data}</Text>

      <Text style={styles.label}>Horário:</Text>
      <Text style={styles.text}>{evento.horario}</Text>

      <Text style={styles.label}>Lotação:</Text>
      <Text style={styles.text}>{evento.lotacao}</Text>

      <Text style={styles.label}>Endereço:</Text>
      <Text style={styles.text}>{evento.endereco}</Text>

      <Text style={styles.label}>Detalhes:</Text>
      <Text style={styles.text}>{evento.detalhes}</Text>
     
      {evento.imagem ? (
        <Image
          source={{ uri: evento.imagem }}
          style={{ width: "100%", height: 200, borderRadius: 8, marginTop: 16 }}
          resizeMode="cover"
        />
      ) : null}

      <View style={{ marginTop: 30 }}>
        <Button
          title="Administrar"
          color="#0F62AC"
          onPress={() => {
            
            navigation.navigate("EventAdmin", { evento });
          }}
        />
      </View>
    </ScrollView>
  );
};

export default DetalEvent;
