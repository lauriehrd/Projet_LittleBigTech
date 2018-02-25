/*jshint esversion: 6*/

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, ImageBackground} from 'react-native';
import { Constants, Facebook, Google } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigator} from 'react-navigation';

export default class App extends React.Component {
  _handleFacebookLogin = async () => {
   try {
     const { type, token } = await Facebook.logInWithReadPermissionsAsync(
       '1201211719949057', // Replace with your own app id in standalone app
       { permissions: ['public_profile'] }
     );

     switch (type) {
       case 'success': {
         // Get the user's name using Facebook's Graph API
         const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
         const profile = await response.json();
         Alert.alert(
           'Logged in!',
           `Hi ${profile.name}!`,
         );
         break;
       }
       case 'cancel': {
         Alert.alert(
           'Cancelled!',
           'Login was cancelled!',
         );
         break;
       }
       default: {
         Alert.alert(
           'Oops!',
           'Login failed!',
         );
       }
     }
   } catch (e) {
     Alert.alert(
       'Oops!',
       'Login failed!',
     );
   }
 };
 _handleGoogleLogin = async () => {
     try {
       const { type, user } = await Google.logInAsync({
         androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
         iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
         androidClientId: '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
         iosClientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
         scopes: ['profile', 'email']
       });

       switch (type) {
         case 'success': {
           Alert.alert(
             'Logged in!',
             `Hi ${user.name}!`,
           );
           break;
         }
         case 'cancel': {
           Alert.alert(
             'Cancelled!',
             'Login was cancelled!',
           );
           break;
         }
         default: {
           Alert.alert(
             'Oops!',
             'Login failed!',
           );
         }
       }
     } catch (e) {
       Alert.alert(
         'Oops!',
         'Login failed!',
       );
     }
   };

  render() {
    return (
      <View style={styles.container}>
      <ImageBackground source={require('/home/kehli/JeuDeDame/app/img/fond-orange.png')} style={styles.backgroundImage}>
        <Text style={styles.text}>Damers</Text>
        <View style={styles.google}>
        <Button
           title="Google +"
           color="white"
           onPress={this._handleGoogleLogin}
         />
     </View>
     <View style={styles.facebook}>
     <Button
    title="Facebook"
    color="white"
    onPress={this._handleFacebookLogin}
  />
      </View>
      <View style={styles.connexion}>
      <Button
         title="Connexion"
         color="white"
       />
       </View>
       <View style={styles.inscrire}>
       <Button
        title="s'inscrire"
        color="white"
        fontFamily="Luckiest Guy"
        />
       </View>
       </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFCDCD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize: 50,
    fontFamily:'Cochin',
    fontWeight: 'bold',
    paddingBottom: 80,
    textAlign:'center',
    color:'#fff'
  },
  facebook: {
    marginTop:30,
    marginLeft: 50,
    backgroundColor: '#536081',
    borderColor: '#3F51B5',
    borderWidth: 2,
    width: 220,
    borderRadius:20,
    fontWeight: 'bold'
  },
  google:{
    marginLeft: 50,
    backgroundColor:'#D93324',
    borderColor: '#F44336',
    borderWidth: 2,
    width: 220,
    paddingLeft:0,
    borderRadius:50,
    fontWeight: 'bold'
  },
  connexion:{
    marginLeft: 50,
    marginTop: 50,
    width: 220,
    marginBottom:0,
    backgroundColor:'#FF9C0D',
    borderColor: '#FF9800',
    borderWidth: 2,
    width: 220,
    borderRadius:50,
    textAlign: 'center'
  },
  inscrire:{
    marginTop: 181,
    width: 320,
    marginBottom:0,
    backgroundColor:'#FF9C0D',
    borderColor: '#FF9800',
    borderWidth: 2,
  },
  backgroundImage:{
    overflow:'hidden',
    position:'absolute'
  }
});
