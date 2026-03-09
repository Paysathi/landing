function CTAButton({
  children,
  className = '',
  variant = 'primary',
  fullWidth = false,
  href = '#',
  onClick,
  type = 'link',
  ...rest
}) {
  const baseClass = `cta-btn cta-btn--${variant} ${fullWidth ? 'cta-btn--full' : ''} ${className}`.trim();

  if (type === 'button') {
    return (
      <button className={baseClass} type="button" onClick={onClick} {...rest}>
        {children}
      </button>
    );
  }

  return (
    <a className={baseClass} href={href} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}

export default CTAButton;
