// components/SendMail.js
"use client";
import React, { useState } from 'react';

const SendMail = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const emailData = {
      to: email,
      subject: subject,
      text: message,
    };

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if(response.ok) {
        setStatus('Email sent successfully');
      } else {
        setStatus('Failed to send email');
      }
    } catch (error) {
      setStatus('Failed to send email');
    }
  };

  return (
    <div style={{ padding: '20px' }} className='text-black'>
      <h2>Send Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Email</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SendMail;
