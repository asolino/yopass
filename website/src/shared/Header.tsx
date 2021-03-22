import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Link,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(4),
  },
  logo: {
    verticalAlign: 'middle',
    paddingLeft: '5px',
  },
}));

export const Header = () => {
  const base = process.env.PUBLIC_URL || '';
  const home = base + '/';
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" component="div">
          <Link href={home} color="inherit" underline="none">
            Yopass
            <img
              className={classes.logo}
              width="40"
              height="40"
              alt=""
              src="yopass.svg"
            />
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
