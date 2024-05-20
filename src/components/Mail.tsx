/** @jsxImportSource @emotion/react */
import { mq } from '@/style/mq';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

function Mail({
  mail,
  isEmpty = false,
  src,
  alt,
  link,
}: {
  mail: boolean;
  src: string;
  alt: string;
  link: string;
  isEmpty?: boolean;
}) {
  const navigate = useNavigate();

  const mailButton = mq({
    width: '35px',
    height: '18%',
    border: 'none',
    background: 'transparent',
    margin: '0 4.5px',
    padding: 0,
    cursor: mail ? 'default' : 'pointer',
    '&:hover': css({
      transform: mail ? 'scale(100%)' : 'scale(120%)',
    }),
  });

  if (isEmpty) {
    return (
      <li css={mailButton}>
        <img css={{ width: '100%', height: 'auto' }} src={src} alt={alt} />
      </li>
    );
  }

  return (
    <button css={mailButton} type="button" onClick={() => navigate(link)}>
      <img
        css={{ width: '100%', minWidth: '35px', height: 'auto' }}
        src={src}
        alt={alt}
      />
    </button>
  );
}

export default Mail;
