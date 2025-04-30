import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Timer = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCount(prev => prev + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={styles.container}>
            <Text testID="counter" style={styles.counterText}>{count}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default Timer;
