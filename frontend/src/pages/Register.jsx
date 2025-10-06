import RegisterForm from '../components/RegisterForm'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Inscription</h1>
      <RegisterForm />
      <p style={{ marginTop: '1rem' }}>
        Déjà inscrit ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  )
}
