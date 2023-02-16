/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {TEST_DATAPLANE_URL, TEST_WRITE_KEY} from '@env';

import rc, {RUDDER_LOG_LEVEL} from '@rudderstack/rudder-sdk-react-native';

const initialization = async () => {
  console.log(TEST_DATAPLANE_URL);
  console.log(TEST_WRITE_KEY);
  const config = {
    dataPlaneUrl: TEST_DATAPLANE_URL,
    trackAppLifecycleEvents: true,
    autoCollectAdvertId: true,
    recordScreenViews: true,
    logLevel: RUDDER_LOG_LEVEL.VERBOSE,
    withFactories: [],
  };

  await rc.setup(TEST_WRITE_KEY, config);

  const options = {
    externalIds: [
      {
        id: '2d31d085-4d93-4126-b2b3-94e651810673',
        type: 'brazeExternalId',
      },
    ],
  };

  const props = {
    key1: 'value1',
    key2: true,
    key3: 123.45,
    name: 'Miraj',
  };

  await rc.identify(
    'sanityId_iOS',
    {
      email: 'sanityuseriOS@example.com',
      location: 'UK',
    },
    options,
  );
  await rc.track('WOOOW Sanity iOS', props);
  await rc.screen('WOOOW Sanity screen iOS', props);

  await rc.track('WOOOW React Native event', props);
  await rc.screen('WOOOW React Native screen', props);
  // await rc.group("group ID");
  // await rc.alias('test_userIdAndroid', "alias android newUserId");
  // await rc.flush();
};

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
