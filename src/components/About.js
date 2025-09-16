import React from 'react';
import './About.css';

const About = () => {
  const stats = [
    { number: '3+', label: 'Languages Spoken' },
    { number: '2+', label: 'Years Programming' },
    { number: '3.5', label: 'Projected GPA' },
    { number: 'Dec 2025', label: 'Graduation' }
  ];

  const features = [
    {
      icon: 'fas fa-code',
      title: 'Programming',
      description: 'Passionate about coding and solving complex problems'
    },
    {
      icon: 'fas fa-book',
      title: 'Reading',
      description: 'Always learning and expanding knowledge through books'
    },
    {
      icon: 'fas fa-futbol',
      title: 'Soccer',
      description: 'Active in sports and team collaboration'
    },
    {
      icon: 'fas fa-golf-ball',
      title: 'Golf',
      description: 'Enjoying precision and strategic thinking in golf'
    }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-title">
          <h2>About Me</h2>
          <p>Get to know more about my background, skills, and passion for development</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <div className="about-intro">
              <h3>Hello! I'm Noah Kueng</h3>
              <p>
                I'm a Computer Science undergraduate student at Texas Tech University, pursuing my 
                bachelor's degree with an anticipated graduation in December 2025 and a projected GPA of 3.5. 
                Born in Zurich, Switzerland, I'm a Swiss citizen who brings a unique international perspective 
                to my studies and projects.
              </p>
              <p>
                My journey in computer science began with a curiosity about how technology works and has 
                evolved into a passion for programming and problem-solving. I'm particularly interested 
                in creating innovative solutions and learning new technologies that can make a real impact.
              </p>
              <p>
                When I'm not studying or coding, you can find me reading, playing soccer, or enjoying 
                a round of golf. I'm fluent in English and German (both native), and I'm working on 
                improving my French (currently B1 level).
              </p>
            </div>

            <div className="about-features">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">
                    <i className={feature.icon}></i>
                  </div>
                  <div className="feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-stats">
            <div className="stats-container">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=600&fit=crop" 
                alt="Working on laptop" 
              />
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>

        <div className="about-cta">
          <a 
            href="https://github.com/nk818/cvWebsite/blob/main/CV_2025.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <i className="fas fa-download"></i>
            Download Resume
          </a>
          <a href="#projects" className="btn btn-secondary">
            <i className="fas fa-eye"></i>
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
