import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Chart } from 'chart.js';

Chart.register(...registerables);

function WeightTrackerPage() {
  const [weights, setWeights] = useState([]);
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/weight/entries');
        const data = await response.json();
        if (Array.isArray(data)) {
          setWeights(data);
        } else {
          console.error('Unexpected response data:', data);
        }
      } catch (error) {
        console.error('Error fetching weight data:', error);
      }
    }
    fetchData();
  }, []);

  async function addWeight(e) {
    e.preventDefault();

    try {
      const response = await fetch('/api/weight/entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, weight }),
      });
      const data = await response.json();
      if (response.ok) {
        setWeights([...weights, { date, weight }]);
      } else {
        console.error('Error adding weight:', data.message);
      }
      setDate('');
      setWeight('');
    } catch (error) {
      console.error('Error adding weight:', error);
    }
  }
  async function handleLogout() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'GET',
      });
      if (response.ok) {
        // Log out was successful
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  async function checkLoginStatus() {
    try {
      const response = await fetch('/api/auth/checklogin');
      const data = await response.json();
      if (data.isAuthenticated) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  }

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const chartData = {
    labels: weights && weights.map((entry) => entry.date),
    datasets: [
      {
        label: 'Weight',
        data: weights && weights.map((entry) => entry.weight),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: '#999',
        },
      },
      y: {
        type: 'linear',
        gridLines: {
          color: '#eee',
        },
        ticks: {
          fontColor: '#999',
        },
      },
    },
    title: {
      display: true,
      text: 'Weight Tracker',
      fontColor: '#3333',
      fontSize: 24,
      padding: 20,
    },
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleFontColor: '#fff',
      bodyFontColor: '#fff',
      cornerRadius: 3,
    },
  };

  return (
    <div className='container'>
      <h1>Weight Tracker</h1>
      {loggedIn ? (
        <div>
          <button onClick={() => navigate('/login')}>Back to Login</button>
          <button onClick={handleLogout}>Logout</button>
          <form onSubmit={addWeight}>
            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <input
              type='number'
              placeholder='Weight'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
            <button type='submit'>Add Weight</button>
          </form>
          <div className='line-chart-container'>
            <Line data={chartData} options={options} />
          </div>
        </div>
      ) : (
        <div>
          <p>Please log in to access weight tracker.</p>
          <button onClick={() => navigate('/login')}>Go to Login Page</button>
        </div>
      )}
    </div>
  );
}

export default WeightTrackerPage;
