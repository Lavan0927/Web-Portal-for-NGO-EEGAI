import React from 'react';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';

const ProjectTreeView = ({ node }) => {
  const { nodeId, label, children } = node;

  return (
    <TreeItem nodeId={nodeId} label={label}>
      {Array.isArray(children) && children.map((childNode) => (
        <ProjectTreeView key={childNode.nodeId} node={childNode} />
      ))}
    </TreeItem>
  );
};

export default ProjectTreeView;
