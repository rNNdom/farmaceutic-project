import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { CustomColors } from '~/styles/CustomStyles';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className='flex-1 items-center justify-center p-5'>
        <Text className='mt-4 py-4'>This screen doesn't exist.</Text>

        <Link href="/" className='mt-4 py-4' style={styles.linkText}>
          <Text className='text-sm' style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  linkText: {
    color: CustomColors.United_nations_blue,
  },
});
