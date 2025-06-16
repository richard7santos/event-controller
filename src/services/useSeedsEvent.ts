import React, { useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const useSeedEvents = () => {
    useEffect(() => {
        const seedEvents = async () => {
            try {
                const eventsRef = collection(db, 'eventos');
                const snapshot = await getDocs(eventsRef);

                if (snapshot.empty) {
                    const defaultEvents = [
                        {
                            nome: 'Encontro de Tecnologia',
                            dataHora: '2025-06-10T19:00:00',
                            local: 'Auditório Principal',
                            endereco: 'Rua das Inovações, 123 - Centro',
                            lotacaoMaxima: 100,
                            informacoesGerais: 'Palestras sobre as tendências da tecnologia para os próximos anos.',
                            participantes: [
                                {
                                    nome: 'João da Silva',
                                    email: 'joao@email.com',
                                    telefone: '(32) 99999-1111',
                                    aluno: true,
                                    numeroMatricula: '20251234'
                                }
                            ]
                        },
                        {
                            nome: 'Oficina de Design',
                            dataHora: '2025-06-15T14:30:00',
                            local: 'Sala 202 - Bloco B',
                            endereco: 'Av. Criativa, 456 - Bairro Novo',
                            lotacaoMaxima: 40,
                            informacoesGerais: 'Workshop prático sobre design de interfaces e usabilidade.',
                            participantes: [
                                {
                                    nome: 'Maria Oliveira',
                                    email: 'maria@email.com',
                                    telefone: '(32) 98888-2222',
                                    aluno: false,
                                    numeroMatricula: ''
                                }
                            ]
                        }
                    ];

                    for (const event of defaultEvents) {
                        await addDoc(eventsRef, event);
                    }

                    console.log('Eventos de teste adicionados com sucesso.');
                } else {
                    console.log('Eventos já existentes no banco.');
                }
            } catch (error) {
                console.error('Erro ao semear eventos:', error);
            }
        };

        seedEvents();
    }, []);
};

export default useSeedEvents;
