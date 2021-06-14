import React, { useState } from 'react';
import { Alert, Button, Image, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'



const App = function() {

  const [photoSource, setPhotoSource] = useState();

  const openGallery = function() {
    launchImageLibrary({ mediaType: 'photo' }, function(ipr) {
      if (ipr.didCancel) {
        Alert.alert('Usuario canceló acceso a galería');
        return;
      }
    
      if (ipr.errorCode) {
        Alert.alert(`Error ${ipr.errorCode}`, ipr.errorMessage);
      }
    
      if (ipr.assets.length > 0) {
        let uri = ipr.assets[0].uri;
        console.log({uri});
        setPhotoSource({uri});
      }
      // console.log(ipr.assets);
    })
  }

  return (
    <View>
      <Button title="Abrir galería" onPress={() => openGallery()} />
      <Image source={photoSource}
        style={{height:300}}
        onError={(error) => console.log(error)} />
    </View>
  )
}
export default App;
