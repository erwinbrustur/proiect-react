import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDoc, collection, getDocs, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './config/firebase';
import '../src/css/LeaveRequest.css';
import { Timestamp } from 'firebase/firestore';

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const LeaveRequestPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({
    username: '',
    leaveType: '',
    startDate: new Date(),
    endDate: new Date(),
  });
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedNoteIndex, setEditedNoteIndex] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const q = query(
        collection(db, 'leaveRequests'),
        where('date', '==', selectedDate)
      );
      const querySnapshot = await getDocs(q);
    
      const notesData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Convert Timestamp to Date for 'startDate' and 'endDate' fields
        const startDate = data.startDate instanceof Timestamp ? data.startDate.toDate() : data.startDate;
        const endDate = data.endDate instanceof Timestamp ? data.endDate.toDate() : data.endDate;
        notesData.push({ id: doc.id, ...data, startDate, endDate });
      });
    
      setNotes(notesData);
    };

    fetchNotes();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPopupOpen(true);
    setEditMode(false);
    setEditedNoteIndex(null);
  };

  const handleSave = async () => {
    setPopupOpen(false);

    if (editMode && editedNoteIndex !== null) {
      // Update the edited note
      const noteId = notes[editedNoteIndex].id;
      await updateDoc(doc(db, 'leaveRequests', noteId), {
        notes: [...notes[editedNoteIndex].notes, popupContent],
      });
      setEditMode(false);
      setEditedNoteIndex(null);
    } else {
      // Save a new note
      const newNote = {
        date: selectedDate,
        notes: [popupContent],
      };

      await addDoc(collection(db, 'leaveRequests'), newNote);
      setNotes([...notes, newNote]);
    }

    // Reset the popup content
    setPopupContent({
      username: '',
      leaveType: '',
      startDate: new Date(),
      endDate: new Date(),
    });
  };

  const handleDelete = async () => {
    if (editMode && editedNoteIndex !== null) {
      // Delete the edited note
      const noteId = notes[editedNoteIndex].id;
      await deleteDoc(doc(db, 'leaveRequests', noteId));
      setEditMode(false);
      setEditedNoteIndex(null);
      setPopupOpen(false);
    }
  };

  const handleNoteClick = (index) => {
    const selectedNote = notes[index];
  
    setPopupContent({
      username: selectedNote.username || '',
      leaveType: selectedNote.leaveType || '',
      startDate: selectedNote.startDate || new Date(),
      endDate: selectedNote.endDate || new Date(),
    });
  
    setPopupOpen(true);
    setEditMode(true);
    setEditedNoteIndex(index);
  };

  const customDateClass = (date) => {
    const dateToCheck = date.toDateString();
    const notesForDate = notes.filter((note) => note.date === dateToCheck);
    const noteCount = notesForDate.reduce((count, note) => count + note.notes.length, 0);
  
    if (noteCount > 7) {
      return 'more-than-seven-notes';
    } else if (noteCount > 3) {
      return 'more-than-three-notes';
    } else if (noteCount > 0) {
      return 'light-green-notes';
    }
  
    return '';
  };

  return (
    <div className="leave-request-container">
      <div className="legend-container">
        <div className="legend-item more-than-seven-notes">
          Dark Red: More than 7 notes
        </div>
        <div className="legend-item more-than-three-notes">
          Yellow: More than 3 notes
        </div>
        <div className="legend-item light-green-notes">
          Light Green: 1 to 3 notes
        </div>
      </div>

      <div className="content-container">
        <div className="datepicker-container">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            calendarClassName="custom-datepicker"
            dayClassName={customDateClass}
          />
        </div>

        <div className="notes-container">
          <h2 className="notes-header">Notes for {formatDate(selectedDate)}</h2>
          {Array.isArray(notes) &&
            notes.map((note, index) => (
              <div key={index} className="note" onClick={() => handleNoteClick(index)}>
                {note.notes &&
                  note.notes.map((innerNote, innerIndex) => (
                    <div key={innerIndex}>
                      {`${innerNote.username || ''} ${innerNote.leaveType || ''} ${formatDate(innerNote.startDate)} - ${formatDate(innerNote.endDate)}`}
                    </div>
                  ))}
              </div>
            ))}
        </div>

        {popupOpen && (
          <div className="popup">
            <button className="close-button" onClick={() => setPopupOpen(false)}>X</button>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={popupContent.username}
                onChange={(e) => setPopupContent({ ...popupContent, username: e.target.value })}
              />
            </div>
            <div>
              <label>Leave Type:</label>
              <input
                type="text"
                value={popupContent.leaveType}
                onChange={(e) => setPopupContent({ ...popupContent, leaveType: e.target.value })}
              />
            </div>
            <div>
              <label>Start Date:</label>
              <DatePicker
                selected={popupContent.startDate}
                onChange={(date) => setPopupContent({ ...popupContent, startDate: date })}
              />
            </div>
            <div>
              <label>End Date:</label>
              <DatePicker
                selected={popupContent.endDate}
                onChange={(date) => setPopupContent({ ...popupContent, endDate: date })}
              />
            </div>
            <button onClick={handleSave}>Save</button>
            {editMode && (
              <button onClick={handleDelete} className="delete-button">
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequestPage;
