import * as React from 'react';
import { View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';
import { ETGetActivity, ETDeleteActivity } from '../utils/WebService';
import { PopupOk, PopupOkCancel } from '../utils/Popup';

// Import styling and components
import { TextParagraph, TextH1, TextH2, TextH3, TextListItem, TextLabel } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import Colours from '../constants/Colours';
import { MyButton } from '../components/MyButton';



export default function ViewActivityScreen(props) {

  const templateActivity = {
    ActivityId: 0,
    Type: null,
    ActivityDate: null,
    Duration: "",
    Distance: 0
  }

  const [activity, setActivity] = React.useState([]);

  React.useEffect(refreshActivity, []);

  //refreshActivityList();
  function refreshActivity(){
    
    let activityId = props.route.params.personId;
    // get data from the web service
    ETGetActivity(activityId)
    .then(data => {
      if (data) setActivity(data);
    })
    .catch(error => {
      PopupOk('Error', error);
      props.navigation.navigate('ViewActivities');
    });
  }

  function showEditActivity(){
    props.navigation.navigate('EditActivity', {activityId: activity.ActivityId});
  }

  function deleteActivity(){
    PopupOkCancel(
      'Delete activity?',
      `Are you sure you want to delete this activity?`,
      () => {
        ETDeleteActivity(activity.ActivityId)
        .then(data => {
          PopupOk('Success', `The activity has been deleted`);
          props.navigation.replace('Root', {screen: 'Activities'});
        })
        .catch(error => {
          PopupOk('Error', error);
        });
      },
      () => {}
    );
  }



  return (
    <SafeAreaView style={Styles.safeAreaView}>
      {/*<View style={Styles.peopleButtonContainer}>
        <MyButton
        text="+ Add new person"
        type="major"    // default*|major|minor
        size="small"      // small|medium*|large
        //onPress={showViewPeople}
      />
      <MyButton
      text="Refresh"
      type="default"    // default*|major|minor
      size="small"      // small|medium*|large
      onPress={refreshPersonList()}
  />

  </View>*/}
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>
          
          <TextH1 style={{marginTop: 0}}>Activity: {activity.ActivityId}</TextH1>

          <View style={Styles.form}>
            <View style={Styles.fieldSet}>
              <TextParagraph style={Styles.legend}>Details</TextParagraph>
              <View style={Styles.formRow}>
                <TextLabel>Type:</TextLabel>
                <TextParagraph>{activity.ActivityType ? activity.ActivityType.Name : '<none>'}</TextParagraph>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>Date:</TextLabel>
                <TextParagraph>{activity.ActivityDate}</TextParagraph>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>Duration:</TextLabel>
                <TextParagraph>{activity.Duration}</TextParagraph>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>Distance:</TextLabel>
                <TextParagraph>{activity.Distance}</TextParagraph>
              </View>

            </View>
          </View>
          <View style={Styles.activitiesButtonContainer}>
            <MyButton
            text="Edit"
            type="major"    // default*|major|minor
            size="medium"      // small|medium*|large
            onPress={showEditActivity}
            />
           <MyButton
            text="Delete"
            type="default"    // default*|major|minor
            size="medium"      // small|medium*|large
            onPress={deleteActivity}
            />
          </View>

      </ScrollView>
    </SafeAreaView>
  );
}