import { useState } from "react";
import { Modal, View, TextInput, Button, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string, email: string, password: string) => void;
  initialName?: string;
  initialEmail?: string;
  initialPassword?: string;
};

export default function ServiceModal({
  visible,
  onClose,
  onSave,
  initialName = "",
  initialEmail = "",
  initialPassword = "",
}: Props) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);

  const handleSave = () => {
    onSave(name, email, password);
    setName("");
    setEmail("");
    setPassword("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modal}>
        <TextInput
          placeholder="Service Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={onClose} color="gray" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
});
