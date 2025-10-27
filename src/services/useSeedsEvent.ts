import React, { useEffect } from "react";
import { ID } from "appwrite";
import { databases } from "./appWriteConfig";

const DATABASE_ID = "68fe300d00286f2ad20a";
const EVENTOS_COLLECTION_ID = "eventos";

const useSeedEvents = () => {
    useEffect(() => {
        const seedEvents = async () => {
            try {
                const snapshot = await databases.listDocuments(DATABASE_ID, EVENTOS_COLLECTION_ID);

                if (snapshot.documents.length === 0) {
                    const defaultEvents = [
                        {
                            nome: "Encontro de Tecnologia",
                            dataHora: "2025-06-10T19:00:00",
                            local: "Auditório Principal",
                            endereco: "Rua das Inovações, 123 - Centro",
                            lotacaoMaxima: 100,
                            informacoesGerais: "Palestras sobre as tendências da tecnologia para os próximos anos.",
                            imagem: "https://source.unsplash.com/random/800x600?technology",
                            participantes: [], // array vazio, pronto para receber user.$id
                        },
                        {
                            nome: "Oficina de Design",
                            dataHora: "2025-06-15T14:30:00",
                            local: "Sala 202 - Bloco B",
                            endereco: "Av. Criativa, 456 - Bairro Novo",
                            lotacaoMaxima: 40,
                            informacoesGerais: "Workshop prático sobre design de interfaces e usabilidade.",
                            imagem: "https://source.unsplash.com/random/800x600?design",
                            participantes: [],
                        },
                    ];

                    for (const event of defaultEvents) {
                        await databases.createDocument(
                            DATABASE_ID,
                            EVENTOS_COLLECTION_ID,
                            ID.unique(),
                            event
                        );
                    }

                    console.log("Eventos de teste adicionados com sucesso.");
                } else {
                    console.log("Eventos já existentes no banco.");
                }
            } catch (error) {
                console.error("Erro ao semear eventos:", error);
            }
        };

        seedEvents();
    }, []);
};

export default useSeedEvents;
