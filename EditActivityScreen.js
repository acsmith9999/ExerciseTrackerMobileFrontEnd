import * as React from 'react';
import { View, Image, TextInput, Picker, KeyboardAvoidingView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';
import { ETGetActivity, ETGetTypes, ETUpdateActvity } from '../utils/WebService';
import { PopupOk, PopupOkCancel } from '../utils/Popup';

// Import styling and components
import { TextParagraph, TextH1, TextH2, TextH3, TextListItem, TextLabel } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import Colours from '../constants/Colours';
import { MyButton } from '../components/MyButton';



export default function EditActivityScreen(props) {

  const [activityId, setActivityId] = React.useState(-1);
  const [typeId, setTypeId] = React.useState(1);
  const [date, setDate] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [distance, setDistance] = React.useState("");

  const [nameOriginal, setNameOriginal] = React.useState("");

  const[types, setTypes] = React.useState([]);

  React.useEffect(refreshType, []);
  React.useEffect(refreshActivity, []);

  function refreshType(){
    
    // get data from the web service
    ETGetTypes()
    .then(data => {
      setTypes(data);
    })
    .catch(error => {
      PopupOk('Error', error);
    });
  }

  function refreshActivity(){
    
    let activityId = props.route.params.activityId;
    // get data from the web service
    ETGetActivity(activityId)
    .then(a => {
      if (a) {
        setActivityId(a.ActivityId);
        setTypeId(a.Type ? a.Type.Id : 0);
        setDate(a.ActivityDate);
        setDuration(a.Duration);
        setDistance(a.Distance);
      }
    })
    .catch(error => {
      PopupOk('Error', error);
      props.navigation.navigate('ViewActivities');
    });
  }

  function displayTypeListItems(){
    return types.map(t => {
      return <Picker.Item key={t.Id} label={t.Name} value={t.Id} />;
    });
  }

  function showViewActivities(){
    props.navigation.replace('Root', {screen: 'Activities'});
  }

  function updateActivity(){
    ETUpdateActivity(activityId, typeId, date, duration, distance)
    .then(data => {
      PopupOk('Activity updated', `The activity has been updated`);
      showViewActivities();
    })
    .catch(error => {
      PopupOk('Error', error);
    });
  }

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>
          <KeyboardAvoidingView behavior="position" style={{flex:1}}>
            <TextH1 style={{marginTop: 0}}>Edit: {nameOriginal}</TextH1>

            <View style={Styles.form}>
              <View style={Styles.fieldSet}>
                <TextParagraph style={Styles.legend}>Details</TextParagraph>
                <View style={Styles.formRow}>
                  <TextLabel>Type:</TextLabel>
                  <Picker
                    selectedValue={typeId}
                    onValueChange={v => setTypeId(v)}
                    style={Styles.picker}
                    itemStyle={Styles.pickerItem}
                  >
                    {displayTypeListItems()}
                  </Picker>
                </View>
                <View style={Styles.formRow}>
                  <TextLabel>Date:</TextLabel>
                  <TextInput value={date} onChangeText={setDate} style={Styles.textInput}/>
                </View>
                <View style={Styles.formRow}>
                  <TextLabel>Duration:</TextLabel>
                  <TextInput value={duration} onChangeText={setDuration} style={Styles.textInput}/>
                </View>
                <View style={Styles.formRow}>
                  <TextLabel>Distance:</TextLabel>
                  <TextInput value={distance} onChangeText={setDistance} style={Styles.textInput}/>
                </View>

              </View>
            </View>
            <View style={Styles.activitiesButtonContainer}>
              <MyButton
              text="Save"
              type="major"    // default*|major|minor
              size="medium"      // small|medium*|large
              onPress={updateActivity}
              />
            <MyButton
              text="Cancel"
              type="minor"    // default*|major|minor
              size="medium"      // small|medium*|large
              onPress={showViewActivities}
              />
            </View>
          </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}