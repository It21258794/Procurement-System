import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; 
import Add from '@mui/icons-material/Add';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
export default function ListItemss({ userRole }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate('/admin/items')}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/admin/items')}>
        <ListItemIcon>
          <ViewListIcon />
        </ListItemIcon>
        <ListItemText primary="Item Details" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/admin/accountList')}>
        <ListItemIcon>
          <PersonOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Account Details" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AddCircleIcon /> {/* Replace with the desired icon */}
        </ListItemIcon>
        <ListItemText primary="Insert" />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={() => navigate('/admin/insertItem')}>
            <ListItemIcon>
              <BuildCircleIcon /> {/* Replace with the desired icon */}
            </ListItemIcon>
            <ListItemText primary="Insert Item" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/admin/insertSite')}>
            <ListItemIcon>
              <AddLocationIcon /> {/* Replace with the desired icon */}
            </ListItemIcon>
            <ListItemText primary="Insert Site" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/admin/createAccount')}>
            <ListItemIcon>
              <PersonAddIcon/> {/* Replace with the desired icon */}
            </ListItemIcon>
            <ListItemText primary="Insert Account" />
          </ListItemButton>
          {/* Add more insert buttons as needed with appropriate icons */}
        </List>
      </Collapse>
    </React.Fragment>
  );
}
