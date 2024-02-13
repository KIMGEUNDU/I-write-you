/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/client';
import { css, keyframes } from '@emotion/react';
import { mq } from '@/style/mq';
import { Common } from '@/style/Common';
import { letterSentRecent } from '@/util/letterSentRecent';

type SentItemProp = {
  id: number;
  receiver: string;
  created_at: string;
};

export default function Sent() {
  const [sentData, setSentData] = useState<SentItemProp[] | null>(null);
  const [emptyData, setEmptyData] = useState<Array<number> | null>([]);

  useEffect(() => {
    const fetchSent = async () => {
      try {
        const { data } = await supabase
          .from('sent')
          .select('id, receiver, created_at');
        setSentData(data!.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    fetchSent();
  }, []);

  useEffect(() => {
    if (sentData) {
      const emptyData = Array(16 - sentData!.length)
        .fill(0)
        .map((v, i) => v + i);
      setEmptyData(emptyData);
    }
  }, [sentData, setSentData]);

  return (
    <section css={background}>
      <h1 css={srOnly}>보낸 편지함</h1>
      <div css={gridLayout}>
        {/* 보낸 편지 */}
        {sentData &&
          sentData.map((item: SentItemProp) => {
            const isRecent = letterSentRecent(item.created_at);
            const animationStyle = isRecent
              ? css`
                  animation: ${twinkleEffect} 2s alternate infinite;
                `
              : '';

            return (
              <div css={letterBoxLayout} key={item.id}>
                <dl css={namePlate}>
                  <dt css={srOnly}>보낸 사람</dt>
                  <dd css={name}>{item.receiver}</dd>
                </dl>
                <div css={namePlateLine} aria-hidden />
                <Link
                  css={letterBox}
                  to={`/sentRead/${item.id}`}
                  aria-label="보낸 편지함"
                >
                  <img css={animationStyle} src="/key.png" alt="키" />
                </Link>
              </div>
            );
          })}
        {/* 빈 편지함 */}
        {emptyData!.length > 0 &&
          emptyData!.map((_, index) => (
            <div css={letterBoxLayout} key={index}>
              <dl css={namePlate}>
                <dt css={srOnly}>보낸 사람</dt>
                <dd css={name} />
              </dl>
              <div css={namePlateLine} aria-hidden />
              <div css={letterBox} aria-label="빈 편지함" />
            </div>
          ))}
      </div>
      <img src="/frontMan.png" alt="지배인" css={frontMan} />
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
  background: `${Common.colors.brown}`,
  margin: 'auto 0',
  paddingTop: '2rem',
  paddingBottom: '265px',
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

const namePlate = css({
  width: ' 7.875rem',
  height: '3.0625rem',
  background: `url('/namePlate.png') no-repeat center / cover`,
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
  background: `${Common.colors.darkBrown}`,
  '& img': {
    position: 'absolute',
    top: 0,
    left: '-1.25rem',
    width: '9.5rem',
    height: '10.625rem',
    objectFit: 'cover',
  },
});

const frontMan = css({
  position: 'fixed',
  left: '50%',
  bottom: 0,
  width: '20.5625rem',
  transform: 'translateX(-50%)',
});

const twinkleEffect = keyframes`
 0% {
    filter: drop-shadow(0 0 3px rgb(245, 198, 159, 0.2));
  }

  50% {
    filter: drop-shadow(0 0 18px rgb(245, 198, 159, 0.7));
  }

  100% {
    filter: drop-shadow(0 0 3px rgb(245, 198, 159, 0.2));
  }

`;
