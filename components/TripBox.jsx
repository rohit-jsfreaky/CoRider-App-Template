import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TripBox = ({setShowMenu,showMenu}) => {
  return (
    <View style={styles.tripInfo}>
            <Image
              source={require('../assets/images/head.jpg')}
              style={styles.profileImage}
            />
    
            <View style={styles.tripDetails}>
              <View style={styles.tripRow}>
                <Text style={styles.tripLabel}>From</Text>
                <Text style={styles.tripDestination}>IGI Airport, T3</Text>
              </View>
              <View style={styles.tripRow}>
                <Text style={styles.tripLabel}>To</Text>
                <Text style={styles.tripDestination}>Sector 28</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setShowMenu(!showMenu)}>
              <MaterialIcons name="more-vert" size={24} color="#141E0D" />
            </TouchableOpacity>
          </View>
  )
}

export default TripBox

const styles = StyleSheet.create({
    tripInfo: {
        flexDirection: 'row',
        paddingTop: 0,
        padding: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
      },
      profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
      },
      tripDetails: {
        flex: 1,
        gap: 0,
      },
      tripRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      },
      tripLabel: {
        color: '#606060',
        fontSize: 13,
      },
      tripDestination: {
        fontSize: 19,
        fontWeight: '600',
      },
      menuButton: {
        padding: 8,
      },
      menuDots: {
        fontSize: 20,
        color: '#606060',
      },
})