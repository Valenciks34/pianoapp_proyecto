import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { TextInput, Button, useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { AvatarPicker } from './components'
import { styles } from './style'
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/slices/userSlice";
import { getImageExtension, uriToBlob } from "../../utils";
import { auth, db, storage } from "../../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const ProfileScreen = ({ navigation }) => {
  const [form, setForm] = useState({});
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const { colors } = useTheme();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0].uri;
      setForm({...form, avatar: file})
    }
  };

  const onDateSelected = (_, selectedDate) => {
    const formatDate = selectedDate.toLocaleString("en-US", {day: "numeric", month: "long", year: "numeric"});
    setDate(selectedDate) ;
    setForm({...form, date: formatDate});
  };

  const showCalendar = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onDateSelected,
      mode: "date",
      is24Hour: true,
    });
  };

  const updateProfileData = async () => {
    const extension = getImageExtension(form.avatar);
    const imgName = `${auth.currentUser.uid}.${extension}`;
    const userStorageRef = ref(storage, imgName);
    const blob = await uriToBlob(form.avatar);
    await uploadBytes(userStorageRef, blob, { contentType: "image/jpeg" });
    const avatarUrl = await getDownloadURL(userStorageRef);

    const userRef = doc(db, "users", auth.currentUser.uid);

    await updateDoc(userRef, {...form, avatar: avatarUrl});

    dispatch(updateUser(form));
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: "center"}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={styles.container}>

          <TouchableOpacity onPress={pickImage}>
            <View style={{alignItems: "center"}}>
              <AvatarPicker 
                image={form.avatar ?? user.avatar}
                text={user.firstName}
                size={120}
                backgroundColor={colors.primary}
              />
            </View>
          </TouchableOpacity>

          <View style={{ height: 40 }} />

          <View style={{flexDirection: "row", justifyContent:"space-between"}}>
            <TextInput 
              value={form.firstName ?? user.firstName}
              label="FirstName" 
              style={{width:"48%"}}
              onChangeText={(value) => setForm({...form, firstName: value})}
            />
            <TextInput 
              value={form.lastName ?? user.lastName}
              label="Last Name" 
              style={{width:"48%"}}
              onChangeText={(value) => setForm({...form, lastName: value})}
            />
          </View>

          <View style={{ height: 20 }} />

          <TouchableWithoutFeedback onPress={showCalendar}>
            <View>
              <TextInput
                editable={false}
                value={form.date ?? user.date}
                label="Birthday Date"
                right={<TextInput.Icon icon="calendar" />}
              />
            </View>
          </TouchableWithoutFeedback>

          <View style={{ height: 20 }} />

          <TextInput
            value={form.phone ?? user.phone}
            label="Number phone"
            right={<TextInput.Icon icon="phone" />}
            keyboardType="numeric"
            onChangeText={(value) => setForm({...form, phone: value})}
          />

          <View style={{ height: 20 }} />

          <View style={{
            ...styles.picker, 
            backgroundColor: colors.surfaceVariant, 
            borderBottomColor: colors.onSurfaceVariant}}
          >
            <Picker
              selectedValue={form.gender ?? user.gender}
              placeholder=""
              onValueChange={(value, _) => setForm({...form, gender: value})}
            >
              <Picker.Item enabled={false} label="Select gender" value="null" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>

          <View style={{ height: 20 }} />

          <Button style={{alignSelf: "center"}} onPress={updateProfileData} mode="contained">
            Update Profile
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default ProfileScreen;