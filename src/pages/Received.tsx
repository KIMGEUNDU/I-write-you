/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Common } from '@/style/Common';
import { mq } from '@/style/mq';

const data = Array(15).fill(1);

export default function Received() {
  return (
    <section css={background}>
      <h1 css={srOnly}>받는 편지함</h1>
      {/* 받는 편지: props 통해 img */}
      <div css={gridLayout}>
        <div css={letterBoxLayout} key={'a'}>
          <dl css={namePlate}>
            <dt css={srOnly}>받는 사람</dt>
            <dd css={font}>라이온</dd>
          </dl>
          <div css={namePlateLine} aria-hidden />
          <div css={letterBox} aria-label="받는 편지함">
            <img src="/gift.png" alt="선물" />
          </div>
        </div>
        {/* 편지 없을 때 */}
        {data.map((_, index) => (
          <div css={letterBoxLayout} key={index}>
            <dl css={namePlate}>
              <dt css={srOnly}>받는 사람</dt>
              <dd css={font} />
            </dl>
            <div css={namePlateLine} aria-hidden />
            <div css={letterBox} aria-label="빈 편지함" />
          </div>
        ))}
      </div>
      <img src="/mailMan.png" alt="배달원" css={frontMan} />
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

const font = css({
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '1.875rem',
  letterSpacing: '-0.1094rem',
  textAlign: 'center',
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
  position: 'absolute',
  left: '50%',
  bottom: '-5rem',
  width: '20.5625rem',
  transform: 'translateX(-50%)',
});
