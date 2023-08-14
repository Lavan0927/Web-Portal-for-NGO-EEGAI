// ProjectsTree.js
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProjectTreeView from './ProjectTreeView';
import axios from 'axios';

const ProjectsTree = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('/api/projectTree') // Replace '/api/projects' with your API endpoint for projects
      .then((response) => setProjects(response.data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  return (
    <Box sx={{ height: 270, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
      <TreeView
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {projects.map((project) => (
          <ProjectTreeView key={project.projectId} node={project} />
        ))}
      </TreeView>
    </Box>
  );
};

export default ProjectsTree;
