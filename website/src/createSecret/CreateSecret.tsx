import { useForm } from 'react-hook-form';
import randomString, { encryptMessage, postSecret, randomPassword } from '../utils/utils';
import { useState } from 'react';
import Result from '../displaySecret/Result';
import {
  Alert,
  Typography,
  Button,
  Grid,
  Box,
} from '@material-ui/core';

const CreateSecret = () => {
  const {
    errors,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      generateDecryptionKey: true,
      secret: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    password: '',
    uuid: '',
    customPassword: false,
    plainTextMessage: '',
  });

  const onSubmit = async (form: any): Promise<void> => {
    // Use the manually entered password, or generate one
    const pw = form.password ? form.password : randomString();
    const plainTextMessage = randomPassword();
    setLoading(true);
    try {
      const { data, status } = await postSecret({
        // ToDo: put all this somewhere as general configuration defaults
        expiration: 86400,
        message: await encryptMessage(plainTextMessage, pw),
        one_time: true,
      });

      if (status !== 200) {
        setError('secret', { type: 'submit', message: data.message });
      } else {
        setResult({
          customPassword: form.password ? true : false,
          password: pw,
          uuid: data.message,
          plainTextMessage: plainTextMessage,
        });
      }
    } catch (e) {
      setError('secret', { type: 'submit', message: e.message });
    }
    setLoading(false);
  };

  if (result.uuid) {
    return (
      <Result
        password={result.password}
        uuid={result.uuid}
        prefix="s"
        customPassword={result.customPassword}
        plainTextMessage={result.plainTextMessage}
      />
    );
  }

  return (
    <>
      <Error
        message={errors.secret?.message}
        onClick={() => clearErrors('secret')}
      />
      <Typography component="h1" variant="h4" align="center">
        {'Welcome to the Secret Sharing portal!'}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container justifyContent="center">
            <Box p={2} pb={4}>
              <Button variant="contained" disabled={loading}>
                {loading ? (
                  <span>{'Working...'}</span>
                ) : (
                  <span>{'Generate Password for me'}</span>
                )}
              </Button>
            </Box>
          </Grid>
      </form>
    </>
  );
};

export const Error = (props: { message?: string; onClick?: () => void }) =>
  props.message ? (
    <Alert severity="error" {...props}>
      {props.message}
    </Alert>
  ) : null;

export default CreateSecret;
