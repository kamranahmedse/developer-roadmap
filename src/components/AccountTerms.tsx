export function AccountTerms() {
  return (
    <div className="mt-3 text-left text-xs leading-normal text-gray-500">
      By continuing to use our services, you acknowledge that you have both read
      and agree to our{' '}
      <a
        href="/terms"
        className="font-medium underline underline-offset-2 hover:text-black"
      >
        Terms of Service
      </a>{' '}
      and{' '}
      <a
        href="/privacy"
        className="font-medium underline underline-offset-2 hover:text-black"
      >
        Privacy Policy
      </a>
      .
    </div>
  );
}
