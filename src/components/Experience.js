import React from 'react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      title: 'Full Stack Developer & Founder',
      company: 'Kovu Application',
      period: '2024 - Present',
      description: 'Developing and maintaining a comprehensive full-stack application with Django Python backend, Firebase cloud functions, AWS infrastructure, and cross-platform Flutter applications for Android, iOS, and web.',
      achievements: [
        'Built scalable Django REST API backend with Python',
        'Implemented Firebase cloud functions for real-time features',
        'Deployed and managed AWS S3 buckets for cloud storage',
        'Developed cross-platform Flutter applications for Android and iOS',
        'Created responsive web application using Flutter Web',
        'Integrated cloud services and managed hosting infrastructure',
        'Designed and implemented user authentication and data management systems'
      ],
      technologies: ['Django', 'Python', 'Firebase', 'AWS S3', 'Flutter', 'Android', 'iOS', 'REST API', 'Cloud Functions', 'Web Development']
    },
    {
      title: 'Student and Security Assistant',
      company: 'Securitas AG',
      period: 'November 2019 - July 2020',
      description: 'Worked as a student and security assistant for Securitas AG in Zurich, Switzerland. Gained valuable experience in professional work environment while pursuing studies.',
      achievements: [
        'Maintained security protocols and procedures',
        'Developed professional communication skills',
        'Balanced work responsibilities with academic studies',
        'Gained experience in Swiss corporate environment'
      ],
      technologies: ['Security Systems', 'Communication', 'Time Management', 'Professional Development']
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="section-title">
          <h2>Work Experience</h2>
          <p>My professional journey and key accomplishments</p>
        </div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content card">
                <div className="experience-header">
                  <h3>{exp.title}</h3>
                  <span className="period">{exp.period}</span>
                </div>
                <h4 className="company">{exp.company}</h4>
                <p className="description">{exp.description}</p>
                
                <div className="achievements">
                  <h5>Key Achievements:</h5>
                  <ul>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="technologies">
                  <h5>Technologies Used:</h5>
                  <div className="tech-tags">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="timeline-marker"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
