import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import NavBar from './NavBar';
import HeaderTemp from './HeaderTemp';
import Footer from './Footer';
import NavBarTest from './NavBarTest';
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";


const Projects = () => {

    const [projects, setProjects] = useState([]);
    useEffect(() => {
        // Fetch project data from the server
        axios.get('/projects')
          .then(response => {
            console.log(response.deta)
            const { data } = response;
            setProjects(data);
            console.log(projects)
          })
          .catch(error => {
            console.error('Error fetching project data:', error);
          });
      }, []);
    
  return (
    <div>
    <HeaderTemp />    
    <NavBarTest />
    {/* <h1>Projects Page</h1> */}
    <section class="section-padding" id="section_3">
      <div class="container">
          <div class="row">

              <div class="col-lg-12 col-12 text-center mb-4">
                  <h2>Our Projects</h2>
              </div>

                        {projects.map(project => (
        <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0" key={project.id}>
          <div className="custom-block-wrap" style={{marginBottom:"50px"}}>
            <img style={{height:"200px"}} src={project.coverPhotoReference} className="custom-block-image img-fluid" alt="" />

            <div className="custom-block">
              <div className="custom-block-body" style={{height:"200px"}}>
                <h5 className="mb-3">{project.projectName}</h5>


                <p>{project.projectDescription}</p>

                <div className="progress mt-4">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${(project.raisedAmount / project.goalAmount) * 100}%` }}
                    aria-valuenow={(project.raisedAmount / project.goalAmount) * 100}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>

                <div className="d-flex align-items-center my-2">
                  <p className="mb-0">
                    <strong>Raised:</strong>
                    {project.raisedAmount}
                  </p>

                  <p className="ms-auto mb-0">
                    <strong>Goal:</strong>
                    {project.goalAmount}
                  </p>
                </div>
              </div>

              <a href="donate.html" className="custom-btn btn">Donate now</a>
            </div>
          </div>
        </div>
      ))}
                   </div>
                </div>
            </section>

    <Footer />
  </div>
  );
};

export default Projects;
