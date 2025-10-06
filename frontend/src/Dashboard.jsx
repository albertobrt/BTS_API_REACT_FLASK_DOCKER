import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/user/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })

        const data = await res.json()

        if (!res.ok) {
          setError(data.error || 'Erreur')
          return
        }

        setUserData(data)
      } catch (err) {
        setError('Erreur lors de la récupération du profil')
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  if (error) return <div><p style={{ color: 'red' }}>{error}</p></div>
  if (!userData) return <p>Chargement du profil...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Bienvenue, {userData.user.username} 👋</h2>
      <p>Email : {userData.user.email}</p>
      <p>Rôles : {userData.roles.join(', ')}</p>

      {userData.profile && Object.keys(userData.profile).length > 0 && (
        <>
          <h3>Profil :</h3>
          <ul>
            {Object.entries(userData.profile).map(([key, val]) => (
              <li key={key}><strong>{key}</strong>: {val}</li>
            ))}
          </ul>
        </>
      )}

      <button onClick={handleLogout} style={{ marginTop: '1rem' }}>Se déconnecter</button>
    </div>
  )
}
