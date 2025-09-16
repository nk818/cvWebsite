import React from 'react';
import './Education.css';

const Education = () => {
  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Texas Tech University',
      period: '2021 - 2025',
      gpa: '3.5/4.0 (Projected)',
      description: 'Currently pursuing a bachelor\'s degree in Computer Science with anticipated graduation in December 2025.',
      achievements: [
        'Maintaining strong academic performance',
        'Actively involved in programming projects',
        'Developing problem-solving skills',
        'Building foundation in computer science principles'
      ],
      courses: ['Data Structures', 'Algorithms', 'Programming Languages', 'Computer Systems', 'Software Engineering']
    },
    {
      degree: '4 Semesters of Mathematics',
      institution: 'University of Zurich',
      period: 'November 2019 - July 2021',
      gpa: null,
      description: 'Completed foundational mathematics coursework before transitioning to Computer Science studies.',
      achievements: [
        'Strong mathematical foundation',
        'Analytical thinking skills',
        'Problem-solving approach',
        'Academic discipline'
      ],
      courses: ['Calculus', 'Linear Algebra', 'Discrete Mathematics', 'Statistics', 'Mathematical Analysis']
    },
    {
      degree: 'High School Diploma',
      institution: 'Hull School Zurich',
      period: '2015 - 2019',
      gpa: null,
      description: 'Completed high school education following British curriculum in Zurich, Switzerland.',
      achievements: [
        'International education background',
        'Multilingual capabilities',
        'Strong academic foundation',
        'Cultural diversity experience'
      ],
      courses: ['Mathematics', 'Physics', 'Chemistry', 'English', 'German', 'French']
    }
  ];

  const certifications = [];

  return (
    <section id="education" className="education">
      <div className="container">
        <div className="section-title">
          <h2>Education & Certifications</h2>
          <p>My academic background and professional certifications</p>
        </div>

        <div className="education-content">
          <div className="education-section">
            <h3 className="subsection-title">
              <i className="fas fa-graduation-cap"></i>
              Education
            </h3>
            
            <div className="education-timeline">
              {education.map((edu, index) => (
                <div key={index} className="education-item card">
                  <div className="education-header">
                    <div className="education-main">
                      <h4>{edu.degree}</h4>
                      <h5>{edu.institution}</h5>
                    </div>
                    <div className="education-meta">
                      <span className="period">{edu.period}</span>
                      {edu.gpa && <span className="gpa">GPA: {edu.gpa}</span>}
                    </div>
                  </div>

                  <p className="education-description">{edu.description}</p>

                  <div className="education-details">
                    <div className="achievements">
                      <h6>Key Achievements:</h6>
                      <ul>
                        {edu.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="courses">
                      <h6>Relevant Coursework:</h6>
                      <div className="course-tags">
                        {edu.courses.map((course, i) => (
                          <span key={i} className="course-tag">{course}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;
