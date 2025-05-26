import { useState } from 'react';
import { Alert } from 'react-native';
import { auth, db, createUserWithEmailAndPassword } from '../../services/firebaseConfig'; // Ajuste o caminho conforme necessário
import { doc, setDoc } from 'firebase/firestore';

const useCadastro = () => {
    const [loading, setLoading] = useState(false);

    const cadastrarUsuario = async (formData) => {
        setLoading(true);
        try {
            // Cria o usuário no Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.senha);
            const user = userCredential.user;

            // Salva os dados adicionais no Firestore
            const userDoc = {
                nome: formData.nome,
                dataNascimento: formData.dataNascimento,
                telefone: formData.telefone,
                cep: formData.cep,
                endereco: formData.endereco,
                numero: formData.numero,
                complemento: formData.complemento,
                email: formData.email,
                uid: user.uid,
            };

            await setDoc(doc(db, 'usuarios', user.uid), userDoc);

            Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar o usuário. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return { cadastrarUsuario, loading };
};

export default useCadastro;