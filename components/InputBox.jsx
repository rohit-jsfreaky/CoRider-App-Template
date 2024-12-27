import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Feather from 'react-native-vector-icons/Feather';
import React from 'react'

const InputBox = ({setShowAttachmentMenu,showAttachmentMenu ,message, setMessage}) => {
  return (
    <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.textInput}
                placeholder="Reply to @Rohit Yadav"
                value={message}
                onChangeText={setMessage}
              />
              <TouchableOpacity
                style={styles.attachButton}
                onPress={() => setShowAttachmentMenu(!showAttachmentMenu)}>
                <Feather name="paperclip" size={24} color="#141E0D" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="send-outline" size={24} color="#141E0D" />
              </TouchableOpacity>
            </View>
          </View>
  )
}

export default InputBox

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#faf8f5',
      },
      inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#fff',
        width: '100%',
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginRight: 12,
      },
      textInput: {
        flex: 1,
        paddingHorizontal: 12,
        marginRight: 12,
      },
      attachButton: {
        marginRight: 12,
      },
      sendButton: {
        backgroundColor: '#1C63D5',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
      },
})