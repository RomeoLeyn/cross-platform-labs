import { useState, useEffect } from "react";
import { View, Button, FlatList, StyleSheet } from "react-native";
import ServiceItem from "./ServiceItem";
import ServiceModal from "./ServiceModal";
import {
  fetchServices,
  insertService,
  deleteService,
  Service,
} from '../db/operations';
import { useSQLiteContext } from "expo-sqlite";

export default function ServiceList() {
  const db = useSQLiteContext();
  const [services, setServices] = useState<Service[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const data = await fetchServices(db);
    setServices(data);
  };

  const handleAdd = async (name: string, email: string, password: string) => {
    await insertService(db, name, email, password);
    loadServices();
  };

  const handleDelete = async (id: number) => {
    await deleteService(db, id);
    loadServices();
  };

  return (
    <View style={styles.container}>
      <Button title="Add Service" onPress={() => setModalVisible(true)} />
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ServiceItem
            service={item}
            onEdit={() => {}}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
      <ServiceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAdd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
