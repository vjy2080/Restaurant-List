import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, RefreshControl, Pressable } from 'react-native';
import { useHandleApi, createItem, deleteItem } from './ReactQuery';
import { useMutation } from '@tanstack/react-query';
import { styles } from './style';
import { MaterialIcons } from '@expo/vector-icons';

const Restaurant: React.FC = () => {
  const [restaurant, setRestaurant] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const { data, refetch } = useHandleApi();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch()
    reset()
    setRefreshing(false);
  }, []);

  const reset = () => {
    console.log('reset');
    refetch();
    setRestaurant('');
  }
  const create = useMutation({
    mutationFn: () => createItem(restaurant, data ? data.length + 1 : 0),
    onSuccess: () => {
      reset();
    }
  });

  const deleteData = useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => reset(),
  });

  const addHandle = () => {
    if (restaurant) {
      create.mutate();
    } else {
      console.error('Please fill required field');
    }
  };

  const deleteHandle = (id: number) => {
    if (id) {
      deleteData.mutate(id);
    } else {
      console.error('Something went wrong');
    }
  };



  return (
    <>
      <View>
        <Text style={{ color: 'brown', fontSize: 30, textAlign: 'center', marginStart: 15 }}>Restaurant List</Text>
      </View>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginHorizontal: 10 }}>
        <TextInput
          style={styles.titleInput}
          autoFocus
          maxLength={15}
          placeholder="Add restaurant here"
          value={restaurant}
          onChangeText={(text) => setRestaurant(text)}
        />
        <Button
          title='ADD'
          onPress={() => addHandle()}
        />
      </View>
      <FlatList
        style={{ width: '100%', }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={data}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <View style={{ flexDirection: 'row', backgroundColor: 'skyblue', margin: 3, padding: 5, justifyContent: 'space-between' }}>
            <Text
              style={styles.cardText}
            >{item.restaurant}</Text>
            <View style={{ backgroundColor: '#F75D59', borderRadius: 10 }}>
              <Pressable
                onPress={() => deleteHandle(item.id)}
              >
                <MaterialIcons name="delete-outline" size={30} color="white" />
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.centeredView}>
            <Text style={{ marginTop: 50, fontSize: 30, color: 'red' }}>The list is empty</Text>
            <Text style={{ marginTop: 20, fontSize: 20, color: 'blue' }}>Try to add Restaurant</Text>
          </View>
        }
      />

    </>
  );
};

export default Restaurant;
