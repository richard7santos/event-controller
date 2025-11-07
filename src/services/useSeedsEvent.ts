import React, { useEffect } from "react";
import { ID } from "appwrite";
import { databases } from "./appWriteConfig";

const DATABASE_ID = "68fe300d00286f2ad20a";
const EVENTOS_COLLECTION_ID = "eventos";

const useSeedEvents = () => {
    useEffect(() => {
        const seedEvents = async () => {
            try {
                const snapshot = await databases.listDocuments(
                    DATABASE_ID,
                    EVENTOS_COLLECTION_ID
                );

                if (snapshot.documents.length === 0) {
                    const defaultImage =
                        "https://appwrite.cintespbr.org/v1/storage/buckets/eventos/files/68fed96b00008a476421/view?project=68f6d14f003a3e2ceea0&mode=admin";

                    const defaultEvents = [
                        {
                            nome: "Encontro de Tecnologia",
                            local: "Auditório Principal",
                            endereco: "Rua das Inovações, 123 - Centro",
                            lotacaoMaxima: 100,
                            informacoesGerais:
                                "Palestras sobre as tendências da tecnologia para os próximos anos.",
                            imagem: defaultImage,
                            participantes: [],
                            data: "2025-06-10",
                            horaInicio: "19:00",
                            horaFim: "21:00",
                        },
                        {
                            nome: "Oficina de Design",
                            local: "Sala 202 - Bloco B",
                            endereco: "Av. Criativa, 456 - Bairro Novo",
                            lotacaoMaxima: 40,
                            informacoesGerais:
                                "Workshop prático sobre design de interfaces e usabilidade.",
                            imagem: defaultImage,
                            participantes: [],
                            data: "2025-06-15",
                            horaInicio: "14:30",
                            horaFim: "17:30",
                        },
                        {
                            nome: "Hackathon de Inovação",
                            local: "Laboratório de Computação",
                            endereco: "Rua dos Desenvolvedores, 789 - Campus Tech",
                            lotacaoMaxima: 80,
                            informacoesGerais:
                                "Maratona de programação com foco em soluções para problemas reais.",
                            imagem: defaultImage,
                            participantes: [],
                            data: "2025-07-05",
                            horaInicio: "08:00",
                            horaFim: "20:00",
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
