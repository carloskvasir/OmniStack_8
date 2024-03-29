import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id,
        }
      });

      setUsers(response.data);
    }

    loadUsers();
  }, [match.params.id]);

  async function handleLike(targetId) {
    await api.post(`/devs/${targetId}/like`, null, {
      headers: { user: match.params.id }
    });
    setUsers(users.filter(user => user._id !== targetId));
  }

  async function handleDislike(targetId) {
    await api.post(`/devs/${targetId}/dislike`, null, {
      headers: { user: match.params.id }
    });
    setUsers(users.filter(user => user._id !== targetId));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt='Tindev' />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map(user => ( // loop
            <li key={user._id}>
              <img src={user.avatar}
                alt={"Foto de " + user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="like" />
                </button>
              </div>
            </li>
          )
          )}

        </ul>
      ) : (
          <div className="empty">Acabou =(</div>
        )
      }

    </div>
  );
}