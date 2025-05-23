import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Landing.module.scss';
import Navbar from '../../components/Navbar/Navbar';

export default function Landing() {
  return (
    <>
    <Navbar/>
    <div className={styles.landing}>
      <div className={styles.hero}>
        <div className={styles.content}>
          <h1>Share Your Stories with the World</h1>
          <p>A modern platform for writers, thinkers, and storytellers. Start your journey today.</p>
          <Link to="/explore" className={styles.cta}>
            Start Reading <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
      
      <section className={styles.features}>
        <div className={styles.container}>
          <h2>Why Choose Us?</h2>
          <div className={styles.grid}>
            <div className={styles.feature}>
              <h3>Beautiful Writing Experience</h3>
              <p>Focus on your content with our distraction-free editor.</p>
            </div>
            <div className={styles.feature}>
              <h3>Engage with Readers</h3>
              <p>Build your audience and connect with like-minded people.</p>
            </div>
            <div className={styles.feature}>
              <h3>Customizable Profile</h3>
              <p>Make your presence unique with customizable profiles.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>);
}