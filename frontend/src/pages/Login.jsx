import LoginForm from '../components/LoginForm'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Connexion</h1>
      <LoginForm />
      <p style={{ marginTop: '1rem' }}>
        Pas encore inscrit ? <Link to="/register">Créer un compte</Link>
      </p>
    </div>
  )
}
