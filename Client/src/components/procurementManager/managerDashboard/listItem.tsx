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
      {/* <ListItemButton
        onClick={() => {
          navigate('/sites');
        }}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton> */}
      <ListItemButton
        onClick={() => {
          navigate('/manager/sites');
        }}
      >
        <ListItemIcon>
          <ViewListIcon />
        </ListItemIcon>
        <ListItemText primary="Sites" />
        {open ? (
          <ExpandLess onClick={handleClickOff} />
        ) : (
          <ExpandMore onClick={handleClickOn} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            // onClick={() => {
            //   navigate(`/manager/orders/`);
            // }}
            disabled={true}
          >
            <ListItemIcon>
              <AirportShuttleIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </List>
      </Collapse>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => {
              navigate('/manager/order');
            }}
            disabled={true}
          >
            <ListItemIcon>
              <AirportShuttleIcon />
            </ListItemIcon>
            <ListItemText primary="Order" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton
        onClick={() => {
          navigate('/manager/allOrders');
        }}
      >
        <ListItemIcon>
          <NearMeIcon />
        </ListItemIcon>
        <ListItemText primary="Track Order" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate('/manager/payment');
        }}
        disabled={true}
      >
        <ListItemIcon>
          <PaidIcon />
        </ListItemIcon>
        <ListItemText primary="Payment" />
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
