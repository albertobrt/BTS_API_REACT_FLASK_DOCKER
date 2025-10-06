import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_URL

export default function Dashboard() {
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login')
          return
        }

        const res = await fetch(`${API_BASE_URL}/user/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        const data = await res.json()

        if (!res.ok) {
          setError(data.error || 'Erreur')
          if (res.status === 401) {
            // Token invalide
            localStorage.removeItem('token')
            navigate('/login')
          }
          return
        }

        setUserData(data)
      } catch (err) {
        setError("Erreur lors de la récupération du profil")
      }
    }

    fetchProfile()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (error) return <div><p style={{ color: 'red' }}>{error}</p></div>
  if (!userData) return <p>Chargement du profil...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Bienvenue, {userData.user.username} 👋</h2>
      <p><strong>Email :</strong> {userData.user.email}</p>
      <p><strong>Rôles :</strong> {userData.roles.join(', ')}</p>

      {userData.profile && Object.keys(userData.profile).length > 0 && (
        <>
          <h3>Profil :</h3>
          <ul>
            {Object.entries(userData.profile).map(([key, val]) => (
              <li key={key}><strong>{key} :</strong> {val}</li>
            ))}
          </ul>
        </>
      )}

      <button onClick={handleLogout} style={{ marginTop: '1rem' }}>Se déconnecter</button>
    </div>
  )
}
