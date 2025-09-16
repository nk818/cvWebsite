import React, { useState } from 'react';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      title: 'KovuApp',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop',
      description: 'A comprehensive full-stack application with Django Python backend, Firebase cloud functions, AWS infrastructure, and cross-platform Flutter applications for Android, iOS, and web.',
      technologies: ['Django', 'Python', 'Flutter', 'Firebase', 'AWS', 'Android', 'iOS', 'Web'],
      liveDemo: 'https://kovuapp.com/',
      appStoreIOS: 'https://apps.apple.com/app/kovu/id123456789',
      featured: true
    },
    {
      title: 'Personal Portfolio Website',
      category: 'frontend',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop',
      description: 'A responsive portfolio website built with React featuring modern animations, dark mode, and contact form integration.',
      technologies: ['React', 'CSS3', 'JavaScript', 'Responsive Design'],
      liveDemo: '#',
      featured: true
    },
    {
      title: 'Academic Programming Projects',
      category: 'programming',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop',
      description: 'Various programming projects completed during Computer Science studies, including data structures, algorithms, and software engineering coursework.',
      technologies: ['Python', 'Java', 'C++', 'Data Structures', 'Algorithms'],
      liveDemo: '#',
      featured: false
    },
    {
      title: 'Mathematics Problem Solvers',
      category: 'programming',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop',
      description: 'Programming solutions for mathematical problems developed during University of Zurich mathematics studies.',
      technologies: ['Python', 'MATLAB', 'Mathematical Analysis', 'Problem Solving', 'Algorithm Design'],
      liveDemo: '#',
      featured: false
    }
  ];

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'programming', label: 'Programming' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-title">
          <h2>Featured Projects</h2>
          <p>A showcase of my recent work and personal projects</p>
        </div>

        <div className="project-filters">
          {filters.map(filter => (
            <button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div key={index} className={`project-card card ${project.featured ? 'featured' : ''}`}>
              {project.featured && <div className="featured-badge">Featured</div>}
              
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    {project.liveDemo && project.liveDemo !== '#' && (
                      <a href={project.liveDemo} className="project-link" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe"></i>
                        Website
                      </a>
                    )}
                    {project.appStoreIOS && (
                      <a href={project.appStoreIOS} className="project-link" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-apple"></i>
                        iOS App
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <a href="https://kovuapp.com/" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-mobile-alt"></i>
            Visit KovuApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
