import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCopyToClipboard } from 'react-use';
import {
  Button,
  makeStyles,
  Typography,
  Grid,
  Divider,
  Box,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

type ResultProps = {
  readonly uuid: string;
  readonly password: string;
  readonly prefix: 's' | 'f';
  readonly customPassword?: boolean;
  readonly plainTextMessage: string;
};

const useStyles = makeStyles(() => ({
  pre: {
    backgroundColor: '#ecf0f1',
    padding: '1px',
    border: '1px solid #cccccc',
    display: 'block',
    fontSize: '14px',
    borderRadius: '2px',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
  },
}));

const Result = ({ uuid, password, prefix, customPassword, plainTextMessage }: ResultProps) => {
  const base =
    (process.env.PUBLIC_URL ||
      `${window.location.protocol}//${window.location.host}`) + `/#/${prefix}`;
  const short = `${base}/${uuid}`;
  const { t } = useTranslation();
  const classes = useStyles();
  const [copy, copyToClipboard] = useCopyToClipboard();
  const generatedPassword = `${plainTextMessage}`
  const emailText =
 `Greeting from the Satellogic Security Team\n
 The following link will give you a ONE TIME ONLY access to a password that is being shared
 with you: ${short}

 The unlock key for the password is: ${password}

 We strongly recommend to change your password after first login.
 If you cannot access the secret, or it has been used already, please contact security@satellgic.com.\n
 Cheers!`;

  return (
    <div>
      <Typography variant="h4">{t('Secret stored in database')}</Typography>
      <Typography>
       <Grid container={true} spacing={2} paddingTop={4}>
       <Grid item={true} xs={12}>
        <Divider />
        <Box p={2}>
          <Typography variant="h5" align={'left'}>
            {t('Generated Password')}
          </Typography>
          <Typography variant="body2" align={'left'}>
            {t(
              'Dear Admin: This is the password generated for the user. DO NOT SHARE!'
            )}
          </Typography>
          <div>
            <Button
            color={copy.error ? 'secondary' : 'primary'}
            onClick={() => copyToClipboard(generatedPassword)} >
            <FontAwesomeIcon icon={faCopy} /> {t('Copy')}
            </Button>
            <pre id="pre" className={classes.pre}>
            <p> {generatedPassword}</p>
            </pre>
          </div>
        </Box>
        <Divider />
        <Box p={2}>
          <Typography variant="h5" align={'left'}>
            {t('Email to share with the recipient')}
          </Typography>
          <Typography variant="body2" align={'left'}>
            {t(
              'This is a template email you can use to share with the employee you\'re sharing the password with'
            )}
          </Typography>
          <div>
            <Button
            color={copy.error ? 'secondary' : 'primary'}
            onClick={() => copyToClipboard(emailText)} >
            <FontAwesomeIcon icon={faCopy} /> {t('Copy')}
            </Button>
            <pre id="pre" className={classes.pre}>
            <p> {emailText}</p>
            </pre>
          </div>
        </Box>
        <Divider />
        </Grid>
        </Grid>
      </Typography>
    </div>
  );
};

export default Result;
