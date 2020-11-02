import React, { useContext, useState } from 'react';
import { IonAlert, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Profile.css';
import AppContext from '../data/app-context';

const Profile: React.FC = () => {

  const appCtx = useContext(AppContext)

  const updateProfile = (username: string) => {
    let updatedProfile = { ...appCtx.profile }
    updatedProfile.username = username;
    appCtx.updateProfile(updatedProfile);
  }

  const [showModal, setShowModal] = useState(false);



  return (
    <IonPage>
      <IonAlert
        isOpen={showModal}
        cssClass='my-custom-class'
        header='Username'
        onDidDismiss={() => setShowModal(false)}
        inputs={[
          {
            name: 'username',
            type: 'text',
            placeholder: 'username'
          }
        ]}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Ok',
            handler: (data) => {
              updateProfile(data.username)           
            }
          }
        ]}/>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle className='bold'>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList className='padding-25 max-width-50'>
          <IonItem onClick={() => setShowModal(true)}>
            <IonLabel>Username</IonLabel>
            <IonLabel className='align-right'>{appCtx.profile.username}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Last latitude</IonLabel>
            <IonLabel className='align-right'>{appCtx.profile.latitude?.toFixed(4)}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Last longitude</IonLabel>
            <IonLabel className='align-right'>{appCtx.profile.longitude?.toFixed(4)}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
