import firebase from 'firebase/app';
import { auth, firestore } from '../firebase';

function AppointmentCard(app: any) {
  const {
    location,
    timeSlot,
    organizerUid,
    organizerName,
    photoURL,
    participants,
    id,
  } = app.appointment;
  const appointmentRef = firestore.collection('appointments').doc(`${id}`);
  const ownAppointment = organizerUid === auth.currentUser?.uid ? 'own' : '';
  const attending = ownAppointment || participants.includes(auth.currentUser?.displayName);

  const enroll = async () => {
    await appointmentRef.update({
      participants: firebase.firestore.FieldValue.arrayUnion(auth.currentUser?.displayName),
    });
  };

  const cancel = async () => {
    ownAppointment
      ? await appointmentRef.delete().then(() => console.log('Appointment deleted'))
      : await appointmentRef.update({
          participants: firebase.firestore.FieldValue.arrayRemove(auth.currentUser?.displayName),
        });
  };

  return (
    <div className={`message ${ownAppointment}`}>
      <img src={photoURL} alt="user-profile" />
      <p>{organizerName}</p>
      <p>{location}</p>
      <p>{timeSlot}</p>
      <p>{participants}</p>
      {!attending ? (
        <button onClick={enroll}>Participate</button>
      ) : (
        <button onClick={cancel}>Cancel</button>
      )}
    </div>
  );
}

export default AppointmentCard;
