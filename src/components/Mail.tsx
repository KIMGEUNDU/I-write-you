/** @jsxImportSource @emotion/react */
import { mq } from '@/style/mq';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

function Mail({
  mail,
  src,
  alt,
  link,
}: {
  mail: boolean;
  src: string;
  alt: string;
  link: string;
}) {
  const navigate = useNavigate();

  const mailButton = mq({
    width: '35px',
    minWidth: '22px',
    maxWidth: '35px',
    height: '18%',
    border: 'none',
    background: 'transparent',
    margin: '1px 7.5px',
    padding: 0,
    cursor: mail ? 'default;' : 'pointer',
    '&:hover': css({
      transform: mail ? 'scale(100%)' : 'scale(120%)',
    }),
  });

  return (
    <button css={mailButton} type="button" onClick={() => navigate(link)}>
      <img css={{ width: '100%', height: 'auto' }} src={src} alt={alt} />
    </button>
  );
}

export default Mail;
