import { auth } from '../firebase';

function ChatMessage(msg: any) {
  const { text, uid, photoURL } = msg.message;
  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="user-profile" />
      <p>{text}</p>
    </div>
  );
}

export default ChatMessage;
