import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Logo = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.logoText}>Event Controller</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    logoText: {
        color: '#F5A9D0',
        fontSize: 24,
        fontWeight: 'bold',
        borderColor: '#F5A9D0',
        borderWidth: 2,
        padding: 10,
    },
});

export default Logo;