import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import randomString, { encryptMessage, postSecret } from '../utils/utils';
import { useState } from 'react';
import Result from '../displaySecret/Result';
import {
  Alert,
  TextField,
  Typography,
  Button,
  Grid,
  Box,
} from '@material-ui/core';

const CreateSecret = () => {
  const { t } = useTranslation();
  const {
    register,
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

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.ctrlKey && event.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (form: any): Promise<void> => {
    // Use the manually entered password, or generate one
    const pw = form.password ? form.password : randomString();
    setLoading(true);
    try {
      const { data, status } = await postSecret({
        // ToDo: put all this somewhere as general configuration defaults
        expiration: 86400,
        message: await encryptMessage(form.secret, pw),
        one_time: true,
      });

      if (status !== 200) {
        setError('secret', { type: 'submit', message: data.message });
      } else {
        setResult({
          customPassword: form.password ? true : false,
          password: pw,
          uuid: data.message,
          plainTextMessage: form.secret,
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
        {t('Enter password to encrypt')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justifyContent="center" paddingTop={1}>
          <TextField
            inputRef={register({ required: true })}
            multiline={true}
            name="secret"
            margin="dense"
            fullWidth
            label={t('Secret message')}
            rows="4"
            autoFocus={true}
            onKeyDown={onKeyDown}
            placeholder={t('Message to encrypt locally in your browser')}
          />
          <Grid container justifyContent="center">
            <Box p={2} pb={4}>
              <Button variant="contained" disabled={loading}>
                {loading ? (
                  <span>{t('Encrypting message...')}</span>
                ) : (
                  <span>{t('Encrypt!')}</span>
                )}
              </Button>
            </Box>
          </Grid>
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
