import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button, TextInput} from '@react-native-material/core';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'Kuala Lumpur', value: 0},
  {label: 'Singapore', value: 1},
];

const HomeScreen = () => {
  const [valueSelected, setValueSelected] = useState(null);
  const [setCity, setSetCity] = useState(null);
  const [firstScene, setFirstScene] = useState(true);
  const [setCelcius, setValueCelcius] = useState('');
  const [setFahrenheit, setValueFahrenheit] = useState('');

  const handleResult = () => {
    console.log('DATA : ', valueSelected);

    if (valueSelected === 0) {
      fetch(
        'http://api.weatherapi.com/v1/current.json?key=ff9f895b2e884d6680530135202710&q=Kuala%20Lumpur',
      )
        .then(response => response.json())
        .then(responseJson => {
          const response = responseJson;
          setValueFahrenheit(response.current.temp_f);
          setValueCelcius(response.current.temp_c);
          setFirstScene(false);
          console.log('Kuala Lumpur', setCelcius, setFahrenheit);
        });
    } else {
      fetch(
        'http://api.weatherapi.com/v1/current.json?key=ff9f895b2e884d6680530135202710&q=Singapore',
      )
        .then(response => response.json())
        .then(responseJson => {
          const response = responseJson;
          setValueFahrenheit(response.current.temp_f);
          setValueCelcius(response.current.temp_c);
          setFirstScene(false);

          console.log('Singapore', setCelcius, setFahrenheit);
        });
    }
  };

  return (
    <View style={styles.container}>
      {firstScene ? (
        <View>
          <TextInput
            label="Your API Key"
            value="ff9f895b2e884d6680530135202710"
            variant="standard"
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            labelField="label"
            valueField="value"
            placeholder="City Name"
            searchPlaceholder="Search City..."
            value={valueSelected}
            onChange={item => {
              setValueSelected(item.value);

              console.log('SELECTED : ', valueSelected);
            }}
          />

          <View style={styles.button}>
            <Button
              title="Click Me"
              onPress={() => handleResult(valueSelected)}
            />
          </View>
        </View>
      ) : (
        <View>
          <Text>{setCelcius}</Text>

          <Text>{setFahrenheit}</Text>

          <View style={styles.button}>
            <Button title="Go Back" onPress={() => setFirstScene(true)} />
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: '7%',
  },
  button: {
    marginTop: 20,
  },
  dropdown: {
    marginTop: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
