import { Text, View, StyleSheet, TouchableOpacity,Image,TouchableWithoutFeedback} from 'react-native'
import React, {useState} from 'react';
import { TextInput,Avatar, Button, useTheme } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import { auth, storage } from '../../../firebaseConfig';
import { ref, uploadBytes } from 'firebase/storage';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';


const ProfileScreen = ({navigation}) => {
    const [image, setImage] = useState(null);
    const [date, setDate] = useState(null);
    const [gender, setGender] = useState(null);

    const theme = useTheme();

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    const updateProfileData = async () => {

        const imgCopy = image.slice()
        const extension = imgCopy.split("/").pop().split(".").pop();
        const imgName = `${auth.currentUser.uid}.${extension}` ;
        const userRef = ref(storage, imgName);
        // const response = await fetch(image);
        const blob = await uriToBlob(image);


        console.log(image);


        uploadBytes(userRef, blob,{contentType:"image/jpeg"}).then((snapshot) => {
            console.log('Uploaded a blob or file!');
          });
    } 

    /**
 * Function to convert a URI to a Blob object
 * @param {string} uri - The URI of the file
 * @returns {Promise} - Returns a promise that resolves with the Blob object
 */
function uriToBlob(uri){
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
  
      // If successful -> return with blob
      xhr.onload = function () {
        resolve(xhr.response);
      };
  
      // reject on error
      xhr.onerror = function () {
        reject(new Error('uriToBlob failed'));
      };
  
      // Set the response type to 'blob' - this means the server's response 
      // will be accessed as a binary object
      xhr.responseType = 'blob';
  
      // Initialize the request. The third argument set to 'true' denotes 
      // that the request is asynchronous
      xhr.open('GET', uri, true);
  
      // Send the request. The 'null' argument means that no body content is given for the request
      xhr.send(null);
    });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date ?? new Date(),
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };

    return (
        <View style= {styles.container}>
            
             <TouchableOpacity onPress={pickImage}>
                <View>
                    { image 
                        ?  <Avatar.Image size={200} source={{uri:image}} />
                        :  <Avatar.Text size={200} label="Upload Image" />
                    }
                </View>
            </TouchableOpacity> 

           <View style={{height:40}}/> 
            
            <View style={styles.inline_centered}>
                <TextInput label="FirstName" style={styles.short_inputs}></TextInput>
                <TextInput label="Last Name" style={styles.short_inputs}></TextInput>
            </View>

           <TouchableWithoutFeedback  onPress={showMode}>
                <View style={{width: "85%"}}>
                    <TextInput 
                        editable={false}
                        value={date?.toLocaleDateString('en-US')}
                        label="Birthday Date" 
                        right={<TextInput.Icon icon="calendar"/>}
                        style={{...styles.inputs_block, width: "100%"}}>
                    </TextInput>
                </View>
           </TouchableWithoutFeedback>

            <TextInput 
                label="Number phone"
                right={<TextInput.Icon icon="phone"/>} 
                style={styles.inputs_block}
                keyboardType = 'numeric'>
            </TextInput>

            {/* <TextInput 
                label="Gender" 
                style={styles.inputs_block}
                right={<TextInput.Icon icon="account"/>}>
            </TextInput> */}

            <Picker
                style={{backgroundColor: theme.colors.primary, borderRadius: 10, height:30, width:"85%"}}
                selectedValue={gender ?? "male"}
                onValueChange={(itemValue, itemIndex) =>
                    setGender(itemValue)
                }
            >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
            </Picker>

            <Button onPress={updateProfileData}
            mode="contained">
            try me!
            </Button>

        </View>
        )
    };

const styles = StyleSheet.create({
    short_inputs:{
        width:"40%",
        borderRadius:4,
        marginHorizontal:10, 
        marginVertical:10   
    },
    inputs_block:{
        width:"85%",
        marginVertical:10   
    },

    container:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        minHeight:"100%"
    },
    inline_centered:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    upload_image:{
        width:200,
        height:200,
        borderRadius:100,
        backgroundColor:"#250",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:40
    },
    text:{
        color:"#fff",
    },

    
    

});      

export default ProfileScreen;