import * as React from 'react';
import { View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';

// Import styling and components
import { TextParagraph, TextH1, TextH2, TextH3, TextListItem } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import Colours from '../constants/Colours';
import { MyButton } from '../components/MyButton';

export default function HelpScreen(props) {

  const [fontSizeModifier, setFontSizeModifier] = React.useState(Settings.fontSizeModifier);

  function changeFontSize(sizeModifier){
    Settings.fontSizeModifier += sizeModifier;
    setFontSizeModifier(Settings.fontSizeModifier);
  }

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>

        <View>
          
          <TextH1 style={{marginTop:0}}>Help topics</TextH1>

          <TextH2>Change Settings</TextH2>

          <TextParagraph>Here are some basic settings to change to make the app more comfortable to use.</TextParagraph>

          <TextH3>Font Size</TextH3>

          <View style={Styles.helpButtonContainer}>
          <MyButton
            text="- Smaller"
            type="default"    // default*|major|minor
            size="medium"      // small|medium*|large
            onPress={() => changeFontSize(-0.1)}
            buttonStyle={Styles.helpButton}
          />
          <MyButton
          text="+ Bigger"
          type="default"    // default*|major|minor
          size="medium"      // small|medium*|large
          onPress={() => changeFontSize(0.1)}
          buttonStyle={Styles.helpButton}
        />
        </View>



          <TextH2>Main tab navigation</TextH2>

          <TextParagraph>The banner at the bottom of the page contains links to different pages. The banner is different on mobile and tablet due to the larger screen size on tablets allowing for more functionality per screen.</TextParagraph>
          <TextParagraph>Each tab links to an important screen.</TextParagraph>

          <TextH3>Actions:</TextH3>

          <TextListItem>Home - the landing page of the app.</TextListItem>
          <TextListItem>View People - list all the staff members.</TextListItem>
          <TextListItem>Add Person - add a new staff member.</TextListItem>
          <TextListItem>Help - view this help content.</TextListItem>

          <TextH2>Home Screen</TextH2>
          <TextParagraph>The home screen contains buttons to view all people and help.</TextParagraph>
          <TextParagraph>View People will take you to the view all people screen. Help will take you to the help screen. </TextParagraph>

          <TextH3>Actions:</TextH3>
          
          <TextListItem>View People - list all the staff members.</TextListItem>
          <TextListItem>View Help - view this help content.</TextListItem>

          <TextH2>View All People</TextH2>
          <TextParagraph>View all people contains a scrollable list of employees with their department and phone number below their names. The button at the top left beneath the company logo is to add a person. On mobile this opens a new screen, and on tablet it opens and overlay in the lower right quadrant of the screen that is currently blank. The button on the top right refreshes the employee list and sets the view to the top.</TextParagraph>
          <TextParagraph>On mobile each employee has three buttons next to their entry. Info opens the view person page with more information about the employee. Edit opens the edit person page. Delete opens a popup asking the user to confirm if they want to delete the employee. On tablet, only the info button is present. It opens an overlay in the blank area of the screen with more information about the employee.</TextParagraph>

          <TextH3>Actions:</TextH3>
          <TextListItem>Add Person - add a new staff member.</TextListItem>
          <TextListItem>Refresh - refresh the list of staff members and set view to the top of the list.</TextListItem>
          <TextListItem>Info - view more details about a particular staff member.</TextListItem>
          <TextListItem>Edit - edit a staff member's details.</TextListItem>
          <TextListItem>Delete - delete a staff member.</TextListItem>

          <TextH2>View Person</TextH2>
          <TextParagraph>This page shows more details about an employee. It has two buttons: edit and delete. Edit will take a user to the edit page, and delete will bring up a prompt asking to confirm if the user wants to delete the person’s details.</TextParagraph>

          <TextH3>Actions:</TextH3>
          <TextListItem>Edit - edit a staff member's details.</TextListItem>
          <TextListItem>Delete - delete a staff member.</TextListItem>

          <TextH2>Add Person</TextH2>
          <TextParagraph>This page allows a user to add a new person but filling out their details in the blank fields. Department and state fields are dropdown menus, reducing user error. Add button will add the person to the database and cancel will bring the user back to the view all people page. On tablet, cancel will close the overlay and return the lower right quadrant to white space.</TextParagraph>

          <TextH3>Actions:</TextH3>
          <TextListItem>Add - save changes to the new person.</TextListItem>
          <TextListItem>Cancel - return to view all people.</TextListItem>

          <TextH2>Edit Person</TextH2>
          <TextParagraph>Similar to the add person screen, the edit person screen allows a user to make changes to a person’s details and either save or cancel these.</TextParagraph>

          <TextH3>Actions:</TextH3>
          <TextListItem>Save - save changes to the person.</TextListItem>
          <TextListItem>Cancel - return to view all people.</TextListItem>

          <TextH2>Save Successful</TextH2>
          <TextParagraph>After adding or editing a person, the user is shown a success message. Clicking OK will bring the user back to view all people.</TextParagraph>

          <TextH2>Confirm Delete</TextH2>
          <TextParagraph>When asking to delete a person, the user will be asked to confirm their decision. Clicking cancel will return to the view person details screen.</TextParagraph>

          <TextH2>Delete Successful</TextH2>
          <TextParagraph>If a user decides to delete a person, they will be shown a success message.</TextParagraph>

          <TextH2>Delete Error</TextH2>
          <TextParagraph>If the server is unable to delete a person, the user will be shown an error message.</TextParagraph>


          <TextH2>Need more help?</TextH2>
          <TextParagraph>If you are needing more help with using the app, please get in contact with our support staff.</TextParagraph>
          <TextH3>Contact Information:</TextH3>
          <TextListItem>Email: help@ROI.com.au</TextListItem>
          <TextListItem>Phone: 1800 123 123</TextListItem>
          <TextListItem>Fax: Do not fax us please</TextListItem>

          <TextH2>Wanna go home?</TextH2>

          <TouchableOpacity onPress={() => props.navigation.replace('Root')}>
            <TextParagraph style={{marginVertical: 10, color: Colours.tabLabelSelected}}>Click here to go home...</TextParagraph>
          </TouchableOpacity>

          <View style={Styles.helpLogoContainer}>
            <Image source={require('../assets/images/logo.jpg')} style={Styles.helpLogo}/>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}