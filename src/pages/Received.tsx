/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { supabase } from '@/client';
import { css, keyframes } from '@emotion/react';

import LetterPagination from '@/components/LetterPagination';
import MenuButton from '@/components/MenuButton';
import { myInfoState } from '@/recoil/atom/useFriend';
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
  const [myInfo] = useRecoilState(myInfoState);
  const [receivedData, setReceivedData] = useState<ReceivedItemProp[] | null>(
    null
  );
  const [emptyData, setEmptyData] = useState<Array<number> | null>([]);
  const [hover, setHover] = useState<number | null>(null);

  // 페이지네이션
  // TODO: mq 1) 12, 2) 24
  // TODO: mq 12 페이지네이션 기준 -> max 24 편지함
  const [limit] = useState(12);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    const fetchReceived = async () => {
      try {
        const { data } = await supabase
          .from('letter')
          .select('id, created_at, receiver')
          .eq(
            'receiverId',
            myInfo.id || JSON.parse(localStorage.getItem('myInfo')!).id
          );

        if (data) {
          data.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          setReceivedData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchReceived();
  }, [myInfo]);

  useEffect(() => {
    if (receivedData && receivedData?.length % limit != 0) {
      const emptyData = Array(limit - (receivedData!.length % limit))
        .fill(0)
        .map((v, i) => v + i);
      setEmptyData(emptyData);
    }
  }, [receivedData, setReceivedData, limit]);

  const numPages = receivedData && Math.ceil(receivedData!.length / limit);

  return (
    <section css={background}>
      <h1 css={srOnly}>받는 편지함</h1>
      <div css={gridLayout}>
        {/* 받는 편지 */}
        {receivedData
          ?.slice(offset, offset + limit)
          .map((item: ReceivedItemProp) => {
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
                    <dt css={srOnly}>보낸 사람</dt>
                    <dd css={name}>{item.receiver}</dd>
                  </dl>
                  {hover == item.id && (
                    <div css={hoverName}>{item.receiver}</div>
                  )}
                </div>
                <div css={namePlateLine} aria-hidden />
                <Link
                  css={letterBox}
                  to={`/read/${item.id}`}
                  aria-label="받는 편지함"
                >
                  <img css={animationStyle} src="/gift.png" alt="선물" />
                </Link>
              </div>
            );
          })}
        {/* 빈 편지함 */}
        {page === numPages
          ? emptyData!.length > 0 &&
            emptyData!.map((_, index) => (
              <div css={letterBoxLayout} key={index}>
                <div css={namePlate} />
                <div css={namePlateLine} aria-hidden />
                <div css={letterBox} aria-label="빈 편지함" />
              </div>
            ))
          : Array(limit)
              .fill(0)
              .map((_, index) => (
                <div css={letterBoxLayout} key={index}>
                  <div css={namePlate} />
                  <div css={namePlateLine} aria-hidden />
                  <div css={letterBox} aria-label="빈 편지함" />
                </div>
              ))}
      </div>
      <img src="/mailMan.png" alt="배달원" css={frontMan} />
      <MenuButton sent />
      {page > 1 && (
        <footer css={footerlayout}>
          <LetterPagination
            total={receivedData?.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </footer>
      )}
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
  height: '100%',
  background: '#FFC7BA',
  paddingTop: '2rem',
  paddingBottom: '150px',
});

const name = mq({
  position: 'relative',
  top: '55%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)',
  width: ['65%', '70%'],
  fontFamily: 'GangwonEduHyeonokT_OTFMediumA',
  fontSize: '1.875rem',
  letterSpacing: '-0.0625rem',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

// TODO: 3, 4 mq 편지함 repeat: 5, 6, ...
const gridLayout = mq({
  display: 'grid',
  gridTemplateColumns: ['repeat(3, 1fr)', 'repeat(4, 1fr)'],
  rowGap: ['0.75rem', '1rem'],
});

const letterBoxLayout = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const nameAnimationLayout = css({
  position: 'relative',
});

const namePlate = mq({
  width: ['6.25rem', '7.375rem', '9.6875rem', '10.625rem'],
  height: ['2.25rem', '2.625rem', '3.5625rem', '4.0625rem'],
  background: `url('/namePlate.png') no-repeat center / cover`,
});

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const hoverName = css({
  position: 'absolute',
  top: '0',
  width: 'max-contents',
  padding: '0 0.75rem',
  border: `1px solid ${Common.colors.lightPink}`,
  borderRadius: '0.375rem',
  zIndex: 1,
  background: `${Common.colors.lightMint}`,
  color: `${Common.colors.lightPink}`,
  fontFamily: 'GangwonEduHyeonokT_OTFMediumA',
  fontSize: '2rem',
  letterSpacing: '-0.0625rem',
  textAlign: 'center',
  animation: `${fadeIn} 0.3s ease-in`,
});

const namePlateLine = mq({
  width: ['0.1875rem', '0.3125rem'],
  height: ['0.5625rem', '0.5625rem', '0.5625rem', '0.75rem'],
  background: '#A78F6C',
});

// TODO: 3, 4 mq 편지함 정사각형 사이즈로 변경
const letterBox = mq({
  position: 'relative',
  width: ['25lvw', '20lvw', '20lvw', '18lvw'],
  maxWidth: '13.125rem',
  height: ['15lvh', '15lvh', '18lvh', '20lvh'],
  background: `${Common.colors.lightMint}`,
  '& img': {
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    width: ['5rem', '5rem', '6.25rem', '7.5rem'],
    height: ['5rem', '5rem', '6.25rem', '7.5rem'],
    transform: 'translateX(-50%)',
    objectFit: 'cover',
  },
});

const frontMan = mq({
  position: 'fixed',
  left: '50%',
  bottom: '-6lvh',
  width: ['35lvw', '30lvw'],
  maxWidth: '11.25rem',
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

const footerlayout = css({
  display: 'flex',
  // justifyContent: 'center',
});
