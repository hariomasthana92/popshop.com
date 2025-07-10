import React, { useState } from 'react';
import emailjs from "emailjs-com";
import './Home.css';
import {useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

const Home = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: 'smooth' });
  };

  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handlesignin = () => {
    logout();
    navigate('/credential');
  };

  const handleGetStarted = () => {
    logout();
    navigate('/credential', { state: { prefillEmail: email, mode: 'register' } });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
    .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.log(error.text);
          alert("Something went wrong. Please try again later.");
        }
      );
  };

  return (
    <>
    
    
    <div className="homepage1">
      {/* Navbar */}
      <nav className="navbar1">
        <h2 className="logo11">POPSHOP</h2>
        <ul>
          <li onClick={() => scrollToSection('home11')}>Home</li>
          <li onClick={() => scrollToSection('about11')}>About</li>
          <li onClick={() => scrollToSection('testimonials1')}>Testimonials</li>
          <li onClick={() => scrollToSection('contact1')}>Contact</li>
          <li className="auth-buttons1">
            <button onClick={handlesignin}>Sign In</button>
          </li>
          <li></li>
        </ul>
      </nav>

      {/* Home Section */}
      <section id="home11" className="section1 home11">
        <h1>Find What You Need, When You Need It</h1>
        <p>
          Popshop is a web platform that helps you to find nearby shops
          selling specific or rare items in real-time. Using GPS tracking and
          instant shopkeeper notifications, we reduce the hassle of item hunting.
        </p>
        <div className="email-form1">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button onClick={handleGetStarted}>Get Started</button>
        </div>
      </section>

      {/* About Section */}
      <section id="about11" className="section1 about11">
        <h2>How It Works</h2>
        <div className="about11-content1">
          <div className="flash-card1">
            <img src="https://via.placeholder.com/150" alt="GPS Tracking" />
            <div className="flash-text1">Live GPS tracking to locate shops near you</div>
          </div>
          <div className="flash-card1">
            <img src="https://via.placeholder.com/150" alt="Shop Notification" />
            <div className="flash-text1">Instant notifications to shopkeepers when an item is searched</div>
          </div>
          <div className="flash-card1">
            <img src="https://via.placeholder.com/150" alt="Rare Items" />
            <div className="flash-text1">Focus on rare and hard-to-find item availability</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials1" className="section1 testimonials1">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards1">
          <div className="card1">
            <p>"I found a rare motherboard in under 10 minutes using ItemLocator. Super helpful!"</p>
            <h4>- Akash</h4>
          </div>
          <div className="card1">
            <p>"Finally, a way to save time instead of running shop to shop. Genius idea!"</p>
            <h4>- Meena</h4>
          </div>
          <div className="card1">
            <p>"Love the instant ping to shopkeepers. Got my old camera battery in minutes."</p>
            <h4>- Ravi</h4>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact1" className="section1 contact1">
        <h2>Reach Out To Us</h2>
        <form onSubmit={handleSubmit} className="contact-form1">
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required/>
          <input type="email" placeholder="Your Email" name="email" value={formData.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Write your message..." rows="5" value={formData.message} onChange={handleChange} required></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
      {/* Footer */}
      <footer className="footer">
        © 2025 Popshop. All rights reserved.
      </footer>
    </div>
    </>
  );
};

export default Home;
