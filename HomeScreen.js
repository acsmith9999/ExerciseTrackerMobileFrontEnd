import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';
import { PopupOk } from "../utils/Popup";

// Import styling and components
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';
import { TextH1, TextParagraph } from "../components/StyledText";


export default function HomeScreen(props) {

  //const isLogoColour = true;
  const [isLogoColour, setIsLogoColour] = React.useState(true);

  function toggleLogo(){
    setIsLogoColour(!isLogoColour);
  }

  function showHelp() {
    props.navigation.replace('Root', {screen: 'Help'});
  }
  function showViewActivities() {
    props.navigation.replace('Root', {screen: 'Activities'});
    //PopupOk('View activities', 'you clicked view activities ');
  }

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>
        
        <View style={Styles.homeLogoContainer}>
          <TouchableOpacity onPress={toggleLogo}>
            <Image 
              source={
                isLogoColour ? require('../assets/images/logo.jpg')
                : require('../assets/images/logo-monochrome.jpg')
              } 
              style={Styles.homeLogo}
            />
          </TouchableOpacity>
        </View>
        <View style={Styles.homeHeadingContainer}>
          <Text style={Styles.homeHeading}>Exercise Tracker</Text>
        </View>
        <View style={Styles.homeButtonContainer}>
          <MyButton
            text="View Activities"
            type="major"    // default*|major|minor
            size="large"      // small|medium*|large
            onPress={showViewActivities}
            buttonStyle={Styles.homeButton}
          />
          <MyButton
          text="Help"
          type="default"    // default*|major|minor
          size="large"      // small|medium*|large
          onPress={showHelp}
          buttonStyle={Styles.homeButton}
        />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}