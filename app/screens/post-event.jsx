import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { app } from "../../configs/FirebaseConfig";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function PostEvent() {
  const router = useRouter();
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  const [eventDate, setEventDate] = useState(null); // Initially, no date is selected
  const [showDatePicker, setShowDatePicker] = useState(false); // Control date picker visibility

  const handleGoBack = () => {
    router.back();
  };

  const onChangeDate = (e, selectedDate) => {
    if (selectedDate) {
      setEventDate(selectedDate); // Update date state
    }
    setShowDatePicker(false); // Close the date picker after selecting a date
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Category"));
      if (querySnapshot.empty) {
        console.log("No documents found.");
      } else {
        querySnapshot.forEach((doc) => {
          console.log("Docs:", doc.data());
          setCategoryList((categoryList) => [...categoryList, doc.data]);
        });
      }
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"#fff" }} >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor:"#fff" }}
        style={styles.container}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backArrow}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
         
          <Formik
            initialValues={{
              name: "",
              date: "",
              description: "",
              location: "",
              category: "",
            }}
            onSubmit={(values) => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.inputContainer}>
                 <Text style={styles.headerText}> Lets get some details</Text>
                <Text style={styles.labelText}>Whats your event called?</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Event name"
                  value={values?.name}
                  onChangeText={handleChange("name")}
                  placeholderTextColor="#888"
                />
                <Text style={styles.labelText}>
                  Add a description for readers, use this as a chance to sell
                  your event! Feel free to add useful info such as ticket links, clothing suggestions or event duration.
                </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Event description (maximum 400 characters)"
                  value={values?.description}
                  onChangeText={handleChange("description")}
                  multiline={true}
                  maxLength={400}
                  numberOfLines={4}
                  textAlignVertical="top"
                  placeholderTextColor="#888"
                />
<Text style={styles.labelText}>Whats the address or location of the event? Make sure you can be found! </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Event location/address"
                  value={values?.location}
                  onChangeText={handleChange("location")}
                  placeholderTextColor="#888"
                />
<Text style={styles.labelText}>Select a main category type for the event. Think of the type of person you are trying to appeal to. </Text>
                <Picker
                  selectedValue={values?.category}
                  onValueChange={handleChange("category")}
                  style={styles.picker}
                >
                  <Picker.Item
                    label="Dropdown 1"
                    value={"Dropdown"}
                    color="#000"
                  />
                  <Picker.Item
                    label="Dropdown 2"
                    value={"Dropdown"}
                    color="#000"
                  />
                </Picker>

                <Text style={styles.labelText}>Use the calendar to set the event date. Users will be able to add this date to their device calendars. </Text>
                <TouchableOpacity
                  style={styles.calendarButton}
                  onPress={() => setShowDatePicker(true)} // Show date picker when clicked
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonText}>Set event date</Text>
                </TouchableOpacity>

                {/* DateTimePicker */}
                {showDatePicker && (
                  <DateTimePicker
                    value={eventDate || new Date()} // Default to today's date if no date is selected
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                  />
                )}

                {/* Show selected date below the button */}
                {eventDate && (
                  <Text style={styles.labelText}>
                    Event start date: {eventDate.toLocaleDateString()}
                  </Text>
                )}

                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Submit for approval</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin:10
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
    
  },
  backArrow: {
    margin: 20,
    position: "absolute",
    top: 10,
    left: 10,
  },
  textInput: {
    width: "80%",
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#171616",
    borderRadius: 8,
    marginBottom: 15,
    color: "#000",
  },
  picker: {
    width: "80%",
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#171616",
    borderRadius: 8,
    marginBottom: 15,
    color: "#000",
  },
  button: {
    backgroundColor: "#171616",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "80%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  calendarButton: {
    backgroundColor: "#171616",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom:10,
    width: "80%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },

  labelText: {
    fontSize: 16,
    fontFamily: "outfit-regular",
    color: "#171616",
    marginHorizontal:30,
    marginBottom:5,
    marginTop:20
  },
  selectedDate: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "outfit-regular",
    color: "#171616",
    marginTop:10,
    textAlign: "center",
  },
});
