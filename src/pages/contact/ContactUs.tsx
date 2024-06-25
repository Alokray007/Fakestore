
import Faq from '../../components/faq\'s/Faq'
import Contact from '../../components/contact/Contact'
import { Link } from 'react-router-dom'

const ContactUs = () => {
  return (
    <Link to="/contactus">
        <Faq />
        <Contact />
    </Link>
  )
}

export default ContactUs;
