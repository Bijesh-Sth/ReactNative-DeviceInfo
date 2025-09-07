import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Linking,
  Alert,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import LoadingView from './src/components/LoadingView';
import DeviceIdCard from './src/components/DeviceIdCard';
import ReturnSection from './src/components/ReturnSection';
import AppButton from './src/components/AppButton';
import Clipboard from '@react-native-clipboard/clipboard';

const App = (): React.JSX.Element => {
  const [deviceId, setDeviceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [returnUrl, setReturnUrl] = useState('');
  const [hasReturned, setHasReturned] = useState(false);

  useEffect(() => {
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink(url);
      }
    });

    const linkingListener = Linking.addEventListener('url', ({url}) => {
      handleDeepLink(url);
    });

    getDeviceId();

    return () => {
      linkingListener?.remove();
    };
  }, []);

  useEffect(() => {
    if (!loading && deviceId && returnUrl && !hasReturned) {
      setHasReturned(true);
      returnToWebsite();
    }
  }, [loading, deviceId, returnUrl, hasReturned]);

  const getQueryParam = (rawUrl: string, param: string): string | null => {
    try {
      const regex = new RegExp('[?&]' + param + '=([^&#]*)');
      const results = regex.exec(rawUrl);
      return results
        ? decodeURIComponent(results[1].replace(/\+/g, ' '))
        : null;
    } catch {
      return null;
    }
  };

  const handleDeepLink = (url: string) => {
    try {
      const returnUrlParam = getQueryParam(url, 'returnUrl');
      if (returnUrlParam) {
        setHasReturned(false); // allow redirect for each new deep link
        setReturnUrl(returnUrlParam);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getDeviceId = async () => {
    try {
      setLoading(true);
      const uniqueId = await DeviceInfo.getUniqueId();
      setDeviceId(uniqueId);
    } catch (error) {
      Alert.alert('Error', 'Failed to get device ID');
    } finally {
      setLoading(false);
    }
  };

  const returnToWebsite = () => {
    if (!returnUrl) {
      Alert.alert('Error', 'No return URL specified');
      return;
    }
    if (!deviceId) {
      Alert.alert('Error', 'Device ID not available');
      return;
    }
    const separator = returnUrl.includes('?') ? '&' : '?';
    const finalUrl = `${returnUrl}${separator}deviceId=${encodeURIComponent(
      deviceId,
    )}`;
    Linking.openURL(finalUrl).catch(() => {
      Alert.alert('Error', 'Failed to return to website');
    });
  };

  const copyDeviceId = () => {
    Clipboard.setString(deviceId);
  };

  const openURLWithDeviceId = () => {
    Linking.openURL(
      `https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1`,
    ).catch(() => {
      Alert.alert('Error', 'Failed to open YouTube');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Device ID App</Text>
        {loading ? (
          <LoadingView message="Getting Device ID..." />
        ) : (
          <>
            <DeviceIdCard deviceId={deviceId} />
            {returnUrl ? (
              <ReturnSection
                returnUrl={returnUrl}
                onPressReturn={returnToWebsite}
                disabled={!deviceId}
              />
            ) : (
              <Text style={styles.instruction}>
                Open this app from your website to get the device ID
              </Text>
            )}
            <AppButton
              label="Copy Device ID"
              onPress={copyDeviceId}
              backgroundColor="#34C759"
              style={styles.spacedButton}
            />
            <AppButton
              label="Open URL with Device ID"
              onPress={openURLWithDeviceId}
              backgroundColor="#0A84FF"
              style={styles.spacedButton}
            />
            {/* <AppButton
              label="Refresh Device ID"
              onPress={getDeviceId}
              backgroundColor="#FF9500"
            /> */}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  instruction: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  spacedButton: {
    marginBottom: 10,
  },
});

export default App;
