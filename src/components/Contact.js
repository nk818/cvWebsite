import React from 'react';
import './Contact.css';

const Contact = () => {

  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      content: 'noah.kueng.1@gmail.com',
      link: 'mailto:noah.kueng.1@gmail.com'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      content: '(806) 544-4268',
      link: 'tel:+18065444268'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      content: 'Lubbock, TX 74907',
      link: 'https://maps.google.com/?q=Lubbock,TX'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'App',
      content: 'KovuApp on App Store',
      link: 'https://apps.apple.com/us/app/kovuapp/id6737746953'
    }
  ];

  const socialLinks = [
    { icon: 'fas fa-mobile-alt', url: 'https://apps.apple.com/us/app/kovuapp/id6737746953', label: 'KovuApp' },
    { icon: 'fas fa-envelope', url: 'mailto:noah.kueng.1@gmail.com', label: 'Email' },
    { icon: 'fas fa-phone', url: 'tel:+18065444268', label: 'Phone' }
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title">
          <h2>Get In Touch</h2>
          <p>Ready to start your next project? Let's discuss how we can work together</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-intro">
              <h3>Let's work together!</h3>
              <p>
                I'm always excited to take on new challenges and collaborate on interesting projects. 
                Whether you have a specific project in mind or just want to explore possibilities, 
                I'd love to hear from you.
              </p>
            </div>

            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <a key={index} href={info.link} className="contact-item" target="_blank" rel="noopener noreferrer">
                  <div className="contact-icon">
                    <i className={info.icon}></i>
                  </div>
                  <div className="contact-text">
                    <h4>{info.title}</h4>
                    <p>{info.content}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="social-links">
              <h4>Follow me on social media</h4>
              <div className="social-grid">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url} 
                    className="social-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2024 Noah Kueng. All rights reserved.</p>
            <p>Built with React and lots of ❤️</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
