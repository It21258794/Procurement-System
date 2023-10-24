import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ViewListIcon from '@mui/icons-material/ViewList';
import PaidIcon from '@mui/icons-material/Paid';
import NearMeIcon from '@mui/icons-material/NearMe';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom';

export default function ListItems() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  // if(key == '2'){
  //   console.log(key)
  //   setOpen(!open)
  // }
  const handleClickOn = () => {
    setOpen(!open);
  };

  const handleClickOff = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => {
          navigate('/supplier/viewOrders');
        }}
      >
        <ListItemIcon>
          <ViewListIcon />
        </ListItemIcon>
        <ListItemText primary="View Orders" />
      </ListItemButton>


      <ListItemButton
        onClick={() => {
          navigate('/supplier/viewNotes');
        }}
      >
        <ListItemIcon>
          <NearMeIcon />
        </ListItemIcon>
        <ListItemText primary="Delivery Notes" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </React.Fragment>
  );
}
