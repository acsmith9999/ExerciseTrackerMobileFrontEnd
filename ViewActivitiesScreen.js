import * as React from 'react';
import { View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';
import { ETDeleteActivity, ETGetActivity } from '../utils/WebService';
import { PopupOk, PopupOkCancel } from '../utils/Popup';

// Import styling and components
import { TextParagraph, TextH1, TextH2, TextH3, TextListItem } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import Colours from '../constants/Colours';
import { MyButton } from '../components/MyButton';



export default function ViewActivitiesScreen(props) {

  const [activities, setActivities] = React.useState([]);

  React.useEffect(refreshActivityList, []);

  //refreshActivityList();
  function refreshActivityList(){
    // get data from the web service
    ETGetActivities()
    .then(data => {
      setActivities(data);
    })
    .catch(error => {
      PopupOk('Error', error);
    });
  }

function showAddActivity(){
  props.navigation.replace('Root',{screen: 'AddActivity'});
}

function showViewActivity(activity){
  props.navigation.navigate('ViewActivity', {activityId: activity.Id});
}

function showEditActivity(activity){
  props.navigation.navigate('EditActivity', {activityId: activity.Id});
}

function deleteActivity(activity){
  PopupOkCancel(
    'Delete activity?',
    `Are you sure you want to delete this activity?`,
    () => {
      ETDeleteActivity(activity.Id)
      .then(data => {
        PopupOk('Success', `This activity has been deleted`);
        refreshActivityList();
      })
      .catch(error => {
        PopupOk('Error', error);
      });
    },
    () => {}
  );
}

function displayActivities(){
  return activities.map(a => {
    return(
      <View key={a.ActivityId} style={Styles.activityListItem}>
      <View style={Styles.activitiesListItemDetails}>
        <TextParagraph style={Styles.activityListItemText}>{a.ActivityType.Name}</TextParagraph>
        <TextParagraph style={Styles.activityListItemText}>{a.ActivityDate}</TextParagraph>      
      </View>
      <View style={Styles.activityListItemButtons}>
        <MyButton
        text="Details"
        type="major"    // default*|major|minor
        size="small"      // small|medium*|large
        onPress={() => showViewActivity(p)}
        buttonStyle={Styles.activityListItemButton}
      />
        <MyButton
        text="Edit"
        type="default"    // default*|major|minor
        size="small"      // small|medium*|large
        onPress={() => showEditActivity(p)}
        buttonStyle={Styles.activityListItemButton}
      />
        <MyButton
        text="Delete"
        type="minor"    // default*|major|minor
        size="small"      // small|medium*|large
        onPress={() => deleteActivity(p)}
        buttonStyle={Styles.activityListItemButton}
      />
      </View>
      </View>
    );
  });
}

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <View style={Styles.peopleButtonContainer}>
        <MyButton
        text="+ Add new activity"
        type="major"    // default*|major|minor
        size="small"      // small|medium*|large
        onPress={showAddActivity}
      />
      <MyButton
      text="Refresh"
      type="default"    // default*|major|minor
      size="small"      // small|medium*|large
      onPress={refreshActivityList()}
    />

      </View>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>
          
          <TextH1 style={{marginTop: 0}}>All Activities</TextH1>

          <View style={Styles.activitiesList}>
            {displayActivities()}
          </View>

      </ScrollView>
    </SafeAreaView>
  );
}