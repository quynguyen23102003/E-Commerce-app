import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

export const Header = () => {
    return (
        <View style={styles.header}>
            <Pressable style={styles.btnSearch}>
                <Feather name="search" size={22} color="black" style={{ paddingLeft: 10 }} />
                <TextInput placeholder='Search Amazon.in' />
            </Pressable>
            <Feather name="mic" size={24} color="black" />
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00CED1",
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
      },
      btnSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 7,
        gap: 10,
        backgroundColor: 'white',
        borderRadius: 3,
        height: 38,
        flex: 1,
      },
})