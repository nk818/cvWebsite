import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      category: 'Programming Languages',
      icon: 'fas fa-code',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'React.js', level: 85 },
        { name: 'Flutter', level: 80 },
        { name: 'Dart', level: 80 },
        { name: 'SQL', level: 75 }
      ]
    },
    {
      category: 'Soft Skills',
      icon: 'fas fa-users',
      skills: [
        { name: 'Communication', level: 90 },
        { name: 'Collaboration', level: 85 },
        { name: 'Problem-solving', level: 90 },
        { name: 'Critical thinking', level: 85 },
        { name: 'Attention to detail', level: 90 }
      ]
    },
    {
      category: 'Languages',
      icon: 'fas fa-globe',
      skills: [
        { name: 'English (Native)', level: 100 },
        { name: 'German (Native)', level: 100 },
        { name: 'French (B1)', level: 60 }
      ]
    },
    {
      category: 'Interests & Hobbies',
      icon: 'fas fa-heart',
      skills: [
        { name: 'Programming', level: 90 },
        { name: 'Reading', level: 80 },
        { name: 'Soccer', level: 75 },
        { name: 'Golf', level: 70 }
      ]
    }
  ];

  const certifications = [];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-title">
          <h2>Skills & Expertise</h2>
          <p>Technologies and tools I work with to bring ideas to life</p>
        </div>

        <div className="skills-content">
          <div className="skills-grid">
            {skillCategories.map((category, index) => (
              <div key={index} className="skill-category card">
                <div className="category-header">
                  <div className="category-icon">
                    <i className={category.icon}></i>
                  </div>
                  <h3>{category.category}</h3>
                </div>
                <div className="skills-list">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
