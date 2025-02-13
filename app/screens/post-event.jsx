import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { db, auth } from "../../configs/FirebaseConfig";
import { addDoc, getDocs, collection, Timestamp } from "firebase/firestore";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function PostEvent() {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState([]);
  const [eventDate, setEventDate] = useState(null); // Initially, no date is selected
  const [showDatePicker, setShowDatePicker] = useState(false); // Control date picker visibility

  const handleGoBack = () => {
    router.back();
  };

  const onChangeDate = (e, selectedDate) => {
    if (selectedDate) {
      setEventDate(selectedDate); // Update date state\
    }
    setShowDatePicker(false); // Close the date picker after selecting a date
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Category"));
        const categories = [];
        querySnapshot.forEach((doc) => {
          categories.push(doc.data());
        });
        setCategoryList(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        Alert.alert("Error", "Unable to load categories. Please try again.");
      }
    };
    fetchCategories();
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      // Get the current user
      const user = auth.currentUser; // Use 'auth' here instead of getAuth()
      const formattedDate = Timestamp.fromDate(new Date(values.date));

      // Add event document to Firestore, including user's email
      const docRef = await addDoc(collection(db, "UserPosts"), {
        name: values.name,
        date: formattedDate,
        description: values.description,
        location: values.location,
        category: values.category,
        userEmail: user.email, // Add user's email here
        createdAt: Timestamp.now(),
      });

      console.log("Document written with ID: ", docRef.id);
      Alert.alert("Success", "Event successfully posted!");
      router.push("/(tabs)/manage-events");
    } catch (e) {
      console.error("Error adding document: ", e);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }}
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                onSubmit={(values) => {
                  if (
                    !values.name ||
                    !values.date ||
                    !values.description ||
                    !values.location ||
                    !values.category
                  ) {
                    Alert.alert(
                      "Missing fields",
                      "Please complete all required fields",
                      [
                        {
                          text: "Ok",
                          onPress: () => console.log("Alert acknowledged"),
                          style: "cancel",
                        },
                      ]
                    );
                    return;
                  } else {
                    handleFormSubmit(values);
                  }
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  setFieldValue,
                }) => (
                  <View style={styles.inputContainer}>
                    <Text style={styles.headerText}>
                      {" "}
                      Lets get some details
                    </Text>
                    <Text style={styles.labelText}>
                      Whats your event called?
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Event name"
                      value={values?.name}
                      onChangeText={handleChange("name")}
                      placeholderTextColor="#888"
                    />
                    <Text style={styles.labelText}>
                      Add a description for readers, use this as a chance to
                      sell your event! Feel free to add useful info such as
                      ticket links, clothing suggestions or start times.
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
                    <Text style={styles.labelText}>
                      Whats the address or location of the event? Make sure you
                      can be found!{" "}
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Event location/address"
                      value={values?.location}
                      onChangeText={handleChange("location")}
                      placeholderTextColor="#888"
                    />
                    <Text style={styles.labelText}>
                      Select a main category type for the event. Think of the
                      type of person you are trying to appeal to.{" "}
                    </Text>
                    <Picker
                      selectedValue={values?.category}
                      onValueChange={handleChange("category")}
                      style={styles.picker}
                      itemStyle={{ color: "#000" }}
                    >
                      {categoryList &&
                        categoryList.map((item, index) => (
                          <Picker.Item
                            key={index}
                            label={item.name}
                            value={item.name}
                          />
                        ))}
                    </Picker>

                    <Text style={styles.labelText}>
                      Use the calendar to set the event date. Users will be able
                      to add this date to their device calendars.{" "}
                    </Text>
                    <TouchableOpacity
                      style={styles.calendarButton}
                      onPress={() => setShowDatePicker(true)} // Show date picker when clicked
                      activeOpacity={0.7}
                    >
                      <Text style={styles.buttonText}>Set a calender date</Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                      <DateTimePicker
                        value={eventDate || new Date()}
                        mode="date"
                        display={Platform.OS === "ios" ? "default" : "calendar"}
                        onChange={(e, selectedDate) => {
                          setShowDatePicker(false);
                          if (selectedDate) {
                            setEventDate(selectedDate);
                            setFieldValue("date", selectedDate.toISOString());
                          }
                        }}
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
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20, // Add padding to avoid touching screen edges
    paddingTop: 20,
  },
  inputContainer: {
    width: "100%",
    marginTop: 20,
  },
  backArrowContainer: {
    position: "absolute",
    top: 10,
    left: "50%", // Center horizontally
    transform: [{ translateX: -24 }], // Adjust to center based on icon width (48px)
    zIndex: 10, // Ensure it appears above other elements
  },
  backArrow: {
    padding: 10,
  },
  textInput: {
    width: "100%",
    paddingVertical: 14, // Slightly increased for better touch targets
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#171616",
    borderRadius: 10, // Increased for a smoother design
    marginBottom: 20, // Ensure consistent spacing between inputs
    color: "#000",
  },
  picker: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#171616",
    borderRadius: 10,
    marginBottom: 20, // Space between picker and next element
  },
  button: {
    backgroundColor: "#171616",
    paddingVertical: 15,
    borderRadius: 18, // Smoother corners for buttons
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "100%", // Full width alignment
    elevation: 5, // Subtle shadow for button emphasis
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  calendarButton: {
    backgroundColor: "#171616",
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
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
    marginBottom: 10, // Tighter spacing for better grouping with inputs
    marginTop: 20, // Consistent margin above labels
    textAlign: "left", // Align text left for better readability
  },
  headerText: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    color: "#171616",
    marginBottom: 30, // Add space below header for breathing room
    textAlign: "center",
  },
  selectedDate: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
});
