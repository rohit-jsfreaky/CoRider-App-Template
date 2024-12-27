import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import axios from 'axios';
import InputBox from './components/InputBox';
import TripBox from './components/TripBox';

export default function App() {
  const [chats, setChats] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://qa.corider.in/assignment/chat?page=${page}`,
      );
      setChats(prevChats => [...response.data.chats.reverse(), ...prevChats]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
    setLoading(false);
  };

  const renderChatItem = ({item}) => (
    <View
      style={[
        styles.messageWrapper,
        item.sender.user_id === '67eab7475e5e4dd0903e133705213b43'
          ? styles.selfMessageWrapper
          : styles.otherMessageWrapper,
      ]}>
      {item.sender.user_id !== '67eab7475e5e4dd0903e133705213b43' && (
        <Image
          source={{uri: item.sender.image || 'https://via.placeholder.com/24'}}
          style={styles.chatAvatar}
        />
      )}
      <View
        style={[
          styles.messageBox,
          item.sender.user_id === '67eab7475e5e4dd0903e133705213b43'
            ? styles.selfMessageBox
            : styles.otherMessageBox,
        ]}>
        <Text
          style={[
            styles.messageText,
            item.sender.user_id === '67eab7475e5e4dd0903e133705213b43'
              ? styles.selfMessageText
              : styles.otherMessageText,
          ]}>
          {item.message}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <MaterialIcons name="arrow-back" size={24} color="#141E0D" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Trip 1</Text>
        </View>
        <TouchableOpacity>
          <Feather name="edit" size={24} color="#141E0D" />
        </TouchableOpacity>
      </View>



      <TripBox setShowMenu={setShowMenu} showMenu={showMenu}/>

      {showMenu && (
        <View style={styles.menuPopup}>
          <TouchableOpacity
            style={[
              styles.menuItem,
              {borderBottomWidth: 1, borderBottomColor: '#E5E5E5'},
            ]}>
            <Ionicons name="people-outline" size={24} color="black" />
            <Text style={styles.menuItemText}>Members</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuItem,
              {borderBottomWidth: 1, borderBottomColor: '#E5E5E5'},
            ]}>
            <Ionicons name="call-outline" size={24} color="#141E0D" />
            <Text style={styles.menuItemText}>Share Number</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, {borderBottomWidth: 0}]}>
            <Ionicons name="alert-circle-outline" size={30} color="black" />
            <Text style={[styles.menuItemText, {borderBottomWidth: 0}]}>
              Report
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {showAttachmentMenu && (
        
        <View style={styles.attachmentMenu}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="camera-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="videocam-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem]}>
            <Ionicons name="document-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        
      )}

      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={fetchChats}
        onEndReachedThreshold={0.2}
        ListFooterComponent={loading && <ActivityIndicator />}
        inverted // Invert the list to show the most recent message at the bottom
      />

     <InputBox showAttachmentMenu={showAttachmentMenu} setMessage={setMessage} message={message} setShowAttachmentMenu={setShowAttachmentMenu}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#faf8f5',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '700',
  },

  chatAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  selfMessageWrapper: {
    justifyContent: 'flex-end',
  },
  otherMessageWrapper: {
    justifyContent: 'flex-start',
  },
  messageBox: {
    maxWidth: '86%',
    padding: 12,
    borderRadius: 12,
  },
  selfMessageBox: {
    backgroundColor: '#1c63d5',
    borderBottomRightRadius: 0,
  },
  otherMessageBox: {
    backgroundColor: '#fefffe',
    borderTopLeftRadius: 0,
    // Added shadow properties
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  selfMessageText: {
    color: '#fefffe',
  },
  otherMessageText: {
    color: '#737373',
  },
  menuPopup: {
    position: 'absolute',
    right: 16,
    top: 100,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    minWidth: 120,
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  attachmentMenu: {
    position: 'absolute',
    right: 20,
    bottom: 60,
    backgroundColor: '#018000',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 120,
    zIndex: 1000,
    flexDirection: 'row',
    borderRadius: 50,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },

});
