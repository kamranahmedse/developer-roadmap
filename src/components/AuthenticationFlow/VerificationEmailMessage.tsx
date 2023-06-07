import VerifyLetterIcon from '../../icons/verify-letter.svg';
import { useEffect, useState } from 'preact/hooks';
import { httpPost } from '../../lib/http';
import { t } from '../../helpers/translate';

export function VerificationEmailMessage() {
  const [email, setEmail] = useState('..');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailResent, setIsEmailResent] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setEmail(urlParams.get('email')!);
  }, []);

  const resendVerificationEmail = () => {
    httpPost(`${import.meta.env.PUBLIC_API_URL}/v1-send-verification-email`, {
      email,
    })
      .then(({ response, error }) => {
        if (error) {
          setIsEmailResent(false);
          setError(error?.message || t('Something went wrong.'));
          setIsLoading(false);
          return;
        }

        setIsEmailResent(true);
      })
      .catch(() => {
        setIsEmailResent(false);
        setIsLoading(false);
        setError(t('Something went wrong. Please try again later.'));
      });
  };

  return (
    <div className="mx-auto max-w-md text-center">
      <img
        alt="Verify Email"
        src={VerifyLetterIcon}
        class="mx-auto mb-4 h-20 w-40 sm:h-40"
      />
      <h2 class="my-2 text-center text-xl font-semibold sm:my-5 sm:text-2xl">
        {t('verifyEmailTitle')}
      </h2>
      <div class="text-sm sm:text-base">
        <p>
          {t('verifyEmailSend', {
            Email: email,
          })}
        </p>

        <hr class="my-4" />

        {!isEmailResent && (
          <>
            {isLoading && <p className="text-gray-400">{t('sendingEmail')}</p>}
            {!isLoading && !error && (
              <p>
                {t('verifyEmailCheckSpam')}{' '}
                <button
                  disabled={!email}
                  className="inline text-blue-700"
                  onClick={resendVerificationEmail}
                >
                  {t('resendVerificationEmail')}
                </button>
              </p>
            )}

            {error && <p class="text-red-700">{error}</p>}
          </>
        )}

        {isEmailResent && (
          <p class="text-green-700">{t('verifyEmailResent')}</p>
        )}
      </div>
    </div>
  );
}
