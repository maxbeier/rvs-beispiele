import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import Products from './Products';
import Product from './Product';
import products from './products.json';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    backgroundColor: theme.palette.background.default,
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <HomeIcon color="primary" className={classes.icon} />
          <Typography
            variant="h6"
            color="primary"
            noWrap
            className={classes.toolbarTitle}
          >
            Merx
          </Typography>

          <IconButton href="#" color="primary">
            <Badge badgeContent={4} color="primary">
              <FavoriteBorderOutlinedIcon color="primary" />
            </Badge>
          </IconButton>

          <IconButton href="#" color="primary">
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlinedIcon color="primary" />
            </Badge>
          </IconButton>

          <Button
            href="#"
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Products products={products} />
        </Container>
      </main>

      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Merx 2020
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          <Link color="inherit" href="/">
            Imprint
          </Link>
          {' | '}
          <Link color="inherit" href="/">
            Privacy
          </Link>
        </Typography>
      </footer>
    </React.Fragment>
  );
}
