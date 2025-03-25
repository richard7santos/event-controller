import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './CustomInput.style';

const CustomInput = ({ label, ...props }) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={styles.input}
                placeholderTextColor="#999"
                {...props}
            />
        </View>
    );
};

export default CustomInput;