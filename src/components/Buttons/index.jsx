import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { styles } from './Buttons.styles';

const RoundButton = ({ onPress, text }) => {
    return (
        <TouchableOpacity style={styles.roundButton} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const FullWidthButton = ({ onPress, text }) => {
    return (
        <TouchableOpacity style={styles.fullWidthButton} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};


export { RoundButton, FullWidthButton };