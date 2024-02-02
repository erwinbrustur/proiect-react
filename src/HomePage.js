import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db, auth } from './config/firebase';
import './css/HomePage.css'; 

function HomePage() {
  const [userInfo, setUserInfo] = useState([]);
  const location = useLocation();

  const userInfoCollection = collection(db, 'userInfo');

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await getDocs(userInfoCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUserInfo(filteredData);
    };
    getUserInfo();
  }, [userInfoCollection]);

  const currentUser = auth.currentUser;
  const currentUserInfo = userInfo.find((user) => user.email === currentUser.email);

  const chartData = [
    { month: 'Jan', performance: 10 },
    { month: 'Feb', performance: 20 },
    { month: 'Mar', performance: 15 },
    { month: 'Apr', performance: 25 },
    { month: 'May', performance: 30 },
    { month: 'Jun', performance: 20 },
  ];

  return (
    <div>
      <div className="container">
        <div className="employee-info-card">
          <h2>Employee Information</h2>
          <div className="info">
            <div className="info-item">
              <h3>First Name:</h3>
              <p>{currentUserInfo?.firstName}</p>
            </div>
            <div className="info-item">
              <h3>Last Name:</h3>
              <p>{currentUserInfo?.lastName}</p>
            </div>
            <div className="info-item">
              <h3>Email:</h3>
              <p>{currentUserInfo?.email}</p>
            </div>
            <div className="info-item">
              <h3>phoneNumber:</h3>
              <p>{currentUserInfo?.phoneNumber}</p>
            </div>
            <div className="info-item">
              <h3>Position:</h3>
              <p>{currentUserInfo?.position}</p>
            </div>
            <div className="info-item">
              <h3>Department:</h3>
              <p>{currentUserInfo?.department}</p>
            </div>
          </div>
        </div>
        <div className="chart-container">
          <h2>Employee Performance</h2>
          <div className="chart">
            <svg viewBox="0 0 400 150">
              {/* X-axis */}
              <line x1="50" y1="120" x2="350" y2="120" stroke="#000" />
              {/* Y-axis */}
              <line x1="50" y1="20" x2="50" y2="120" stroke="#000" />
              {/* Bars */}
              {chartData.map((dataPoint, index) => (
                <rect
                  key={index}
                  x={50 + (index * 50)}
                  y={120 - (dataPoint.performance)}
                  width="30"
                  height={dataPoint.performance}
                  fill="#007bff"
                />
              ))}
              {/* X-axis labels */}
              {chartData.map((dataPoint, index) => (
                <text key={index} x={50 + (index * 50) + 15} y="135" textAnchor="middle">
                  {dataPoint.month}
                </text>
              ))}
              {/* Y-axis labels */}
              <text x="40" y="25" textAnchor="end">100</text>
              <text x="40" y="65" textAnchor="end">50</text>
              <text x="40" y="105" textAnchor="end">0</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
