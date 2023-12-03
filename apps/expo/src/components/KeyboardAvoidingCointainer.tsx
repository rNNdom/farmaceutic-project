import { SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, StatusBar } from "react-native"

const KeyboardAvoidingContainer = ({ children, style }) => {
    return (
        <SafeAreaView className="flex-1">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={10}
            >
                <ScrollView contentContainerStyle={styles.container, style} showsVerticalScrollIndicator={false}>
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
export default KeyboardAvoidingContainer;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: Platform.OS === "android" ?
            StatusBar.currentHeight + 50 : 50,
    }
})