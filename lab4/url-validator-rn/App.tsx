import { useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";

export default function App() {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateUrl = () => {
    Keyboard.dismiss();
    const regex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[^\s]*)?$/i;
    setIsValid(regex.test(url));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="URL Validator" />
        <Card.Content>
          <TextInput
            label="Enter URL"
            value={url}
            onChangeText={setUrl}
            style={styles.input}
            mode="outlined"
          />
          <Button mode="contained" onPress={validateUrl} style={styles.button}>
            Validate
          </Button>
          {isValid !== null && (
            <Text style={{ color: isValid ? "green" : "red", marginTop: 10 }}>
              {isValid ? "URL is valid!" : "URL is invalid"}
            </Text>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  card: { padding: 10, borderRadius: 10 },
  input: { marginBottom: 10 },
  button: { marginTop: 10 },
});
