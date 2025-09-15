import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';

const Logo = () => {
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            friction: 5,
            tension: 80,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../../assets/logo.png')}
                style={[styles.logoImage, { transform: [{ scale: scaleAnim }] }]}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,

    },
    logoImage: {
        width: 150,
        height: 150,
    },
});

export default Logo;
