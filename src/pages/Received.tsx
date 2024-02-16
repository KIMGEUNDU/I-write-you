/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/client';
import { css, keyframes } from '@emotion/react';

import MenuButton from '@/components/MenuButton';
import { debounce } from '@/util/debounce';
import { letterSentRecent } from '@/util/letterSentRecent';
import { mq } from '@/style/mq';
import { Common } from '@/style/Common';

type ReceivedItemProp = {
  id: number;
  receiver: string;
  created_at: string;
};

export default function Received() {
  const [receivedData, setReceivedData] = useState<ReceivedItemProp[] | null>(
    null
  );
  const [emptyData, setEmptyData] = useState<Array<number> | null>([]);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const fetchReceived = async () => {
      try {
        const { data } = await supabase
          .from('letter')
          .select('id, created_at, receiver');
        // filter: 로그인 - sender 일치할 경우만
        setReceivedData(data!.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    fetchReceived();
  }, []);

  useEffect(() => {
    if (receivedData) {
      const emptyData = Array(16 - receivedData!.length)
        .fill(0)
        .map((v, i) => v + i);
      setEmptyData(emptyData);
    }
  }, [receivedData, setReceivedData]);

  return (
    <section css={background}>
      <h1 css={srOnly}>받는 편지함</h1>
      <div css={gridLayout}>
        {/* 받는 편지 */}
        {receivedData &&
          receivedData.map((item: ReceivedItemProp) => {
            const isRecent = letterSentRecent(item.created_at);
            const animationStyle = isRecent
              ? css`
                  animation: ${twinkleEffect} 2s alternate infinite;
                `
              : '';

            return (
              <div css={letterBoxLayout} key={item.id}>
                <div
                  css={nameAnimationLayout}
                  onMouseEnter={() => setHover(item.id)}
                  onMouseLeave={debounce(() => setHover(null))}
                >
                  <dl css={namePlate}>
                    <dt css={srOnly}>받는 사람</dt>
                    <dd css={name}>{item.receiver}</dd>
                  </dl>
                  {hover == item.id && (
                    <div css={hoverName}>{item.receiver}</div>
                  )}
                </div>
                <div css={namePlateLine} aria-hidden />
                <Link
                  css={letterBox}
                  to={`/receivedRead/${item.id}`}
                  aria-label="받는 편지함"
                >
                  <img css={animationStyle} src="/gift.png" alt="선물" />
                </Link>
              </div>
            );
          })}
        {/* 편지 없을 때 */}
        {emptyData!.length > 0 &&
          emptyData!.map((_, index) => (
            <div css={letterBoxLayout} key={index}>
              <div css={namePlate} />
              <div css={namePlateLine} aria-hidden />
              <div css={letterBox} aria-label="빈 편지함" />
            </div>
          ))}
      </div>
      <img src="/mailMan.png" alt="배달원" css={frontMan} />
      <MenuButton sent />
    </section>
  );
}

const srOnly = css({
  clip: 'rect(0.0625rem, 0.0625rem, 0.0625rem, 0.0625rem)',
  clipPath: 'inset(50%)',
  height: '0.0625rem',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '0.0625rem',
  margin: '-1px',
});

const background = css({
  position: 'relative',
  width: '100%',
  height: 'auto',
  background: '#FFC7BA',
  margin: 'auto 0',
  paddingTop: '2rem',
  paddingBottom: '16.25rem',
  overflow: 'hidden',
});

const name = css({
  position: 'relative',
  top: '55%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)',
  width: '70%',
  fontSize: '1.875rem',
  letterSpacing: '-0.1094rem',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const gridLayout = mq({
  display: 'grid',
  gridTemplateColumns: [
    'repeat(2, 1fr)',
    'repeat(3, 1fr)',
    'repeat(4, 1fr)',
    'repeat(4, 1fr)',
  ],
  rowGap: '2.25rem',
});

const letterBoxLayout = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const nameAnimationLayout = css({
  position: 'relative',
});

const namePlate = css({
  width: ' 7.875rem',
  height: '3.0625rem',
  background: `url('/namePlate.png') no-repeat center / cover`,
});

const hoverName = css({
  position: 'fixed',
  top: '3rem',
  width: 'max-contents',
  padding: '0.125rem 0.75rem',
  border: `1px solid ${Common.colors.lightPink}`,
  borderRadius: '0.375rem',
  zIndex: 1,
  background: `${Common.colors.lightMint}`,
  color: `${Common.colors.lightPink}`,
  fontSize: '1.5rem',
  letterSpacing: '-0.1094rem',
  textAlign: 'center',
  transition: 'top 1s ease-in',

  ':hover': {
    top: '1.5rem',
    animationDuration: '3s',
    animationName: keyframes`
    0% {
      opacity: 0; 
    }

    100% {
      opacity: 1;
    }
  `,
  },
});

const namePlateLine = css({
  width: '0.1875rem',
  height: '0.75rem',
  background: '#A78F6C',
});

const letterBox = css({
  position: 'relative',
  width: '10.6875rem',
  height: '11.0625rem',
  background: `${Common.colors.lightMint}`,
  '& img': {
    position: 'absolute',
    bottom: '0.3125rem',
    left: '50%',
    width: '9rem',
    height: '9rem',
    transform: 'translateX(-50%)',
    objectFit: 'cover',
  },
});

const frontMan = css({
  position: 'fixed',
  left: '50%',
  bottom: '-5rem',
  width: '20.5625rem',
  transform: 'translateX(-50%)',
});

const twinkleEffect = keyframes`
 0% {
    filter: drop-shadow(0 0 3px rgb(255, 255, 255, 0.4));
  }

  50% {
    filter: drop-shadow(0 0 18px rgb(255, 255, 255, 0.8));
  }

  100% {
    filter: drop-shadow(0 0 3px rgb(255, 255, 255, 0.4));
  }

`;
