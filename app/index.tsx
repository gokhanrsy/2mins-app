import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { APP_NAME, APP_TAGLINE } from "@/constants/app";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.tagline}>{APP_TAGLINE}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F1E8",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    color: "#1E211F",
    fontSize: 40,
    fontWeight: "600",
    lineHeight: 46,
    textAlign: "center",
  },
  tagline: {
    color: "#737870",
    fontSize: 18,
    lineHeight: 26,
    marginTop: 12,
    textAlign: "center",
  },
});