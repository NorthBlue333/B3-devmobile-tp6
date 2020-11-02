import React, { useContext, useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { save } from 'ionicons/icons';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import AppContext from '../data/app-context';
import './Live.css';

const Live: React.FC = () => {

  const appCtx = useContext(AppContext)
  const [position, setPosition] = useState<Geoposition>();
  const getLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setPosition(position);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const interval = setInterval( async () => {
      await getLocation();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const updatePosition = () => {
    let updatedProfile = { ...appCtx.profile }
    updatedProfile.latitude = position?.coords.latitude ?? appCtx.profile.latitude ?? null;
    updatedProfile.longitude = position?.coords.longitude ?? appCtx.profile.longitude ?? null;
    appCtx.updateProfile(updatedProfile);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle className='bold'>Live Position</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonTitle className='bold padding-25'>Your current position is :</IonTitle>
        <IonText>
          <p><span className='bold ion-margin-start'>Latitude:</span> {position?.coords.latitude ?? appCtx.profile.latitude ?? null}</p>
          <p><span className='bold ion-margin-start'>Longitude:</span> {position?.coords.longitude ?? appCtx.profile.longitude ?? null}</p>
        </IonText>

        <div className="ion-text-end padding-right-25">
          <IonButton color='primary' fill='outline' onClick={updatePosition}>
            <IonIcon slot='start' icon={save}></IonIcon>
            Save!
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Live;
