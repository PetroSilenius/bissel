import { useState, FormEvent } from 'react';
import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../firebase';
import AppointmentCard from './AppointmentCard';

function Appointments() {
  const appointmentsRef = firestore.collection('appointments');
  const query = appointmentsRef.orderBy('createdAt').limit(25);

  const [appointments] = useCollectionData(query, { idField: 'id' });
  const [location, setLocation] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  const saveAppointment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    const uid = user?.uid;
    const displayName = user?.displayName;
    const photoURL = user?.photoURL;

    await appointmentsRef.add({
      location: location,
      timeSlot: timeSlot,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      organizerUid: uid,
      organizerName: displayName,
      photoURL,
      participants: [],
    });

    setLocation('');
    setTimeSlot('');
  };

  return (
    <div>
      <div>
        {appointments &&
          appointments.map((app, index) => <AppointmentCard key={index} appointment={app} />)}
      </div>
      <form onSubmit={saveAppointment}>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input type="time" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} />
        <button type="submit" disabled={!location || !timeSlot}>
          🍻
        </button>
      </form>
    </div>
  );
}

export default Appointments;
