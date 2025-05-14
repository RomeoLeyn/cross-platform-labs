import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Service } from '../db/operations';
import { Edit, Trash2 } from "lucide-react-native";

type Props = {
  service: Service;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ServiceItem({ service, onEdit, onDelete }: Props) {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{service.name}</Text>
        <Text>{service.email}</Text>
        <Text>{service.password}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Edit color="black" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Trash2 color="black" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
});
