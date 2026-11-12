import { Link } from 'react-router-dom';
import Seo from '../seo/Seo.jsx';
import Icon from '../components/Icon.jsx';
import { StarTrails } from '../components/Brand.jsx';

export default function NotFound() {
  return (
    <>
      <Seo title="Sahifa topilmadi" path="/404" noindex />
      <main className="notfound">
        <StarTrails />
        <span className="notfound__code" aria-hidden="true">404</span>
        <h1 className="title" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>Bu yo‘l xaritada yo‘q</h1>
        <p className="lead" style={{ maxWidth: 460 }}>
          Siz qidirgan sahifa ko‘chirilgan yoki o‘chirilgan bo‘lishi mumkin. Shimoliy yulduzga qarab — bosh sahifaga qayting.
        </p>
        <Link to="/" className="btn btn--lg btn--accent">
          Bosh sahifa <Icon name="arrowRight" size={18} strokeWidth={1.8} />
        </Link>
      </main>
    </>
  );
}
