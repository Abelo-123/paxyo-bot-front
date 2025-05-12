import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [messageId, setMessageId] = useState('');

  const handleBroadcast = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://paxyo-bot-ywuk.onrender.com/api/broadcast', { message, imageUrl });
    //   alert('Message sent to all users!');
      setMessage('');
      setImageUrl('');
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message.');
    }
  };

  const handleBroadcastImage = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://paxyo-bot-ywuk.onrender.com/api/broadcastImage', { imageUrl });
    //   alert('Image sent to all users!');
      setImageUrl('');
    } catch (error) {
      console.error('Failed to send image:', error);
      alert('Failed to send image.');
    }
  };

  const handleSendToUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://paxyo-bot-ywuk.onrender.com/api/sendToUser', { chatId, message, imageUrl });
    //   alert(`Message sent to user with Chat ID: ${chatId}`);
      setMessageId(response.data.messageId);
      setChatId('');
      setMessage('');
      setImageUrl('');
    } catch (error) {
      console.error('Failed to send message to user:', error);
      alert('Failed to send message to user.');
    }
  };

  const handleDeleteMessage = async () => {
    try {
      await axios.post('https://paxyo-bot-ywuk.onrender.com/api/deleteMessage', { chatId, messageId });
    //   alert('Message deleted successfully!');
      setMessageId('');
    } catch (error) {
      console.error('Failed to delete message:', error);
      alert('Failed to delete message.');
    }
  };

  const handleDeleteAllMessages = async () => {
    try {
      await axios.post('https://paxyo-bot-ywuk.onrender.com/api/deleteAllMessages');
    //   alert('All broadcast messages deleted successfully!');
    } catch (error) {
      console.error('Failed to delete all messages:', error);
      alert('Failed to delete all messages.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Broadcast Message</h1>
      <form onSubmit={handleBroadcast}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here..."
          rows="5"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter Image URL (optional)"
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginRight: '10px' }}>
          Broadcast to All
        </button>
      </form>

      <h2>Send Image Only to All Users</h2>
      <form onSubmit={handleBroadcastImage}>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter Image URL"
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginRight: '10px' }}>
          Broadcast Image to All
        </button>
      </form>

      <h2>Send Message to Specific User</h2>
      <form onSubmit={handleSendToUser}>
        <input
          type="text"
          value={chatId}
          onChange={(e) => setChatId(e.target.value)}
          placeholder="Enter Chat ID"
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here..."
          rows="5"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter Image URL (optional)"
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Send to User
        </button>
      </form>

      {messageId && (
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleDeleteMessage} style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white' }}>
            Delete Message
          </button>
        </div>
      )}

      <h3>Delete All Broadcast Messages</h3>
      <button onClick={handleDeleteAllMessages} style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white' }}>
        Delete All Messages
      </button>
      <br/>
      <h3>Delete Message by Text or Image</h3>
<form onSubmit={async (e) => {
  e.preventDefault();
  try {
    await axios.post('https://paxyo-bot-ywuk.onrender.com/api/deleteByContent', {
      message,
      imageUrl,
    });
    // alert('Matching messages deleted!');
  } catch (error) {
    console.error('Failed to delete message by content:', error);
    alert('Error deleting messages by content.');
  }
}}>
  <textarea
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Enter exact message text (optional)"
    rows="3"
    style={{ width: '100%', marginBottom: '10px' }}
  />
  <input
    type="text"
    value={imageUrl}
    onChange={(e) => setImageUrl(e.target.value)}
    placeholder="Enter image URL (optional)"
    style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
  />
  <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'orange', color: 'white' }}>
    Delete Matching Messages
  </button>
</form>

    </div>
  );
}

export default App;
