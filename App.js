import React, { useState } from 'react';
import { Alert, Button, Image, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'
import { RNCamera } from 'react-native-camera';

const androidCameraPermissionOptions = {
  title: "Permitir acceso a la cámara",
  message: "¿Desea permitir el acceso a la cámara?",
  buttonPositive: "Sí",
  buttonNegative: "No"
}

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

  const capturarOnPress = async function() {
    if (this.camara) {
      const options = {quality: .5, base64:true}
      const data = await this.camara.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  return (
    <View>
      <Button title="Abrir galería" onPress={() => openGallery()} />
      <Image source={photoSource}
        style={{height:300}}
        onError={(error) => console.log(error)} />
      <RNCamera
        ref={ref => { this.camara = ref }}
        style={{height: 300}}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        androidCameraPermissionOptions={androidCameraPermissionOptions}
      />
      <Button title="Capturar" onPress={capturarOnPress} />
    </View>
  )
}
export default App;
