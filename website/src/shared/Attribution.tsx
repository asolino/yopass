import { Container, Link, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  attribution: {
    margin: theme.spacing(4),
  },
}));

export const Attribution = () => {
  const classes = useStyles();
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Container className={classes.attribution}>
        {'Based on a yopass project by'}{' '}
        <Link href="https://github.com/jhaals/yopass">Johan Haals</Link>
      </Container>
    </Typography>
  );
};
