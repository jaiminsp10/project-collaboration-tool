/* 
Name of the Module : Full Project Profile
Date of Module Creation : 23/09/2021
Author of the module: Jaimin Prajapati
What the module does : Display Full Information of project and Project Owner
Modification history : 
    Box-shadow remove in Project Details(Division 3)
*/

import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './viewproject.css'
import img from '../projects/default_image.png';
import ProjectImgCarousel from '../projects/ProjectImgCarousel'
import Footer from '../home/Footer';

const ViewProject = () => {
    const { id } = useParams();
    const history = useHistory();
    const [editProject, setEditProject] = useState([]);
    const [profile, setProfile] = useState([]);
    const [checkHiringStatus, setcheckHiringStatus] = useState(false);

    const projects = useSelector(state => state.projects);

    useEffect(() => {
        if (projects.length !== 0) {
            projects.forEach(project => {
                if (project._id === id) {
                    const result = axios.get(`/projects/${id}`);
                    var promise = Promise.resolve(result);

                    promise.then(function (val) {
                        setProfile(val.data);
                    });
                    setEditProject(project);
                    setcheckHiringStatus(project.hiringStatus === 0 ? "Active" : "Closed");
                }
            })
        } else {
            history.push(`/myprojects`);
        }
    }, [projects, id, history]);

    return (
        <>
            <div className="grd-joinProjectContainer mt-5">

                {/* {main-division} */}
                <div className="flx-projectContent">

                    {/* division1 */}
                    <div className="project-title">
                        {/* <h2 defaultValue={editProject.title}></h2> */}
                        <h2>{editProject.title}</h2>
                        <hr />
                    </div>

                    {/* division2 */}
                    <div className="flx-projectDiv2">
                        <div className="projectOverview">
                            <h5>Overview:</h5> <br />
                            {editProject.overview}
                        </div>

                        <div className="project-image">
                            <ProjectImgCarousel />
                        </div>
                    </div>


                    {/* division3 */}
                    <div className="project-details mt-5">
                        <div className="project-description">
                            <h5>Description:</h5>
                            <br />
                            {editProject.description}
                        </div>

                        <div className="project-requirement">
                            <h5>Requirements:</h5>
                            <br />
                            {editProject.requirements}
                        </div>
                    </div>


                    {/* division4 */}
                    <div className="flx-project-bottom">
                        <div className="GithubLink-div">
                            <b> Github Link: </b>
                            <a href={`${editProject.github}`} rel="noopener noreferrer" target="_blank">{editProject.github}</a>
                        </div>

                        <div className="Collabration-status">
                            <b> Collabration-status: </b>
                            {checkHiringStatus}
                        </div>

                        <div className="request-button-div">
                            <Link to={`/updateproject/${editProject._id}`}>
                                <button className="request-button">
                                    <span>EDIT</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 11c2.761.575 6.312 1.688 9 3.438 3.157-4.23 8.828-8.187 15-11.438-5.861 5.775-10.711 12.328-14 18.917-2.651-3.766-5.547-7.271-10-10.917z" /></svg>
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>



                {/* Owner Profile Information Division  */}
                {/* <div className="flx-ownerProfile">
                    <h2 className="d-flex" >Project</h2>
                    <h2 className="d-flex" >Owner</h2>
                    <div className="owner-profile-img"> */}
                        {/* <i className="bi bi-person-fill"></i> */}
                        {/* <img className="" src={profile.avatar} alt="" />
                    </div>

                    <div className="owner-info">
                        <h6>Name: {profile.name}</h6>
                        <h6>E-mail: {profile.email}</h6>
                        <h6>Contact: {profile.contact}</h6>
                        <h6>Institute: {profile.institute}</h6>
                        <h6>Department: {profile.department}</h6>
                        <h6>Github: {profile.github}</h6>
                        <h6>LinkedIn: {profile.LinkedIn}</h6>
                        <h6>Area of Interest: {profile.areaOfInterest}</h6>
                    </div>

                    <div className="Button-showProfile">
                        <button>
                            <span><Link to='/dashboard'>Show Profile</Link></span>
                        </button>
                    </div>
                </div> */}

            </div>

            {/* Using Footer Module on Home Page */}
            {/* <Footer /> */}
        </>
    )
}

export default ViewProject;