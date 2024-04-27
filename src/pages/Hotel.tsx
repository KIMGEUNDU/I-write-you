/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsFillSendFill } from 'react-icons/bs';
import Mail from '@/components/Mail';
import MenuButton from '@/components/MenuButton';
import SeasonEvent from '@/components/SeasonEvent';
import { Common } from '@/style/Common';
import { mq } from '@/style/mq';
import { randomColor, randomPosition } from '@/util/random';
import { css, keyframes } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { myInfoState } from '@/recoil/atom/useFriend';

import empty from '/emptyMail.png';
import newMail from '/newMail.png';
import view from '/viewMail.png';
import EventControl from '@/components/EventControl';
import { supabase } from '@/supabaseClient';
import LetterPagination from '@/components/LetterPagination';

interface letterType {
  id: number;
  created_at: string;
  receiverId: string | null;
  read: boolean;
}

export default function Hotel() {
  const navigate = useNavigate();
  const [season, setSeason] = useState('');
  const [control, setControl] = useState(false);
  const [hotelName, setHotelName] = useState('');
  const [letterData, setLetterData] = useState<letterType[] | null>(null);
  const [emptyData, setEmptyData] = useState<Array<number> | null>([]);
  const [myInfo, setMyInfo] = useRecoilState(myInfoState);

  // 페이지네이션
  const [limit] = useState(32);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // fetch User Data
  useEffect(() => {
    const findAndFetchMyId = async () => {
      try {
        // 사용자 기본 정보를 불러옵니다.
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          // userId를 이용해 추가 정보를 조회합니다.
          const { data: userInfo, error } = await supabase
            .from('userInfo')
            .select('*')
            .eq('userId', user.id);

          if (userInfo && !userInfo[0].hotelName) {
            toast.warn('호텔 이름을 설정해주세요.');
            navigate('/myProfile');
            return;
          }

          // 에러가 없으면 상태를 한 번만 업데이트합니다.
          if (!error && userInfo.length > 0) {
            // 사용자 정보와 추가 정보 모두를 상태에 설정합니다.
            setMyInfo({ id: user.id, email: userInfo[0].hotelName });
            //localStorage에 나의 정보 담기
            localStorage.setItem(
              'myInfo',
              JSON.stringify({ id: user.id, email: userInfo[0].hotelName })
            );
            // 호텔이름 state 저장
            setHotelName(userInfo[0].hotelName);
          } else {
            // userInfo가 비어있거나 오류가 발생한 경우, 사용자 기본 정보만으로 상태를 업데이트합니다.
            setMyInfo({ id: user.id, email: '' });
          }
        }
      } catch (error) {
        console.log('Error fetching user info: ', error);
      }
    };
    findAndFetchMyId();
  }, []);

  // fetch Letter Data
  useEffect(() => {
    const fetchLetterData = async () => {
      try {
        const { data } = await supabase
          .from('letter')
          .select('id, created_at, receiverId, read')
          .eq('receiverId', myInfo.id);

        if (data) {
          data.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          setLetterData(data);
        }
      } catch (error) {
        console.error('Error fetching hotel data: ', error);
      }
    };
    if (myInfo.id) {
      fetchLetterData();
    }
  }, [myInfo]);

  useEffect(() => {
    if (letterData && letterData?.length % limit != 0) {
      const emptyData = Array(limit - (letterData!.length % limit))
        .fill(0)
        .map((v, i) => v + i);
      setEmptyData(emptyData);
    }
  }, [letterData, setLetterData, limit]);

  const numPages = letterData && Math.ceil(letterData!.length / limit);

  /* 현재 달 */
  const currentMonth = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;

    switch (true) {
      case 1 <= month && month < 4:
        setSeason('spring');
        break;

      case 4 <= month && month < 7:
        setSeason('summer');
        break;

      case 7 <= month && month < 10:
        setSeason('fall');
        break;

      default:
        setSeason('winter');
    }
  };

  useEffect(() => {
    currentMonth();
  }, []);

  return (
    <section css={background}>
      <button
        type="button"
        id="writeButton"
        css={writeMail}
        onClick={() => navigate('/writeInfo')}
      >
        <BsFillSendFill
          css={{
            '#writeButton:hover &': css({
              animation: `${writeButton} 1s ease infinite`,
            }),
          }}
        />
        편지 쓰기
      </button>
      <div css={hotelWrapper}>
        <ul css={mailWrapper}>
          {letterData?.slice(offset, offset + limit).map((letter) => (
            <li key={letter.id}>
              <Mail
                mail={Number.isSafeInteger(letter.read)}
                src={letter.read ? `${view}` : `${newMail}`}
                alt={
                  !letter.read
                    ? '새로운 편지' // 1 -> 0
                    : '확인 편지' // 2 -> 1
                }
                link={`/read/${letter.id}`}
              />
            </li>
          ))}
          {page === numPages
            ? emptyData!.length > 0 &&
              emptyData!.map((_, index) => (
                <Mail
                  key={index}
                  mail
                  isEmpty
                  src={empty}
                  alt="미확인 편지"
                  link="/hotel"
                />
              ))
            : Array(limit)
                .fill(0)
                .map((_, index) => (
                  <Mail
                    key={index}
                    mail
                    isEmpty
                    src={empty}
                    alt="미확인 편지"
                    link="/hotel"
                  />
                ))}
          <p css={hotelNameWrapper}>{hotelName} HOTEL</p>
          {page > 1 && (
            <footer css={footerlayout}>
              <LetterPagination
                total={letterData?.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            </footer>
          )}
        </ul>
      </div>
      <MenuButton home={true} />
      <EventControl control={control} setControl={setControl} />
      <ul>
        {season &&
          [...new Array(60)].map((v, i) => (
            <li key={i}>
              <SeasonEvent
                key={v}
                season={season}
                top={randomPosition(100)}
                position={randomPosition(100)}
                color={randomColor(season, randomPosition(3))}
                control={control}
              />
            </li>
          ))}
      </ul>
    </section>
  );
}

/* 편지작성하기 애니메이션 */
const writeButton = keyframes`
  0%{
    transform: translateX(0) translateY(0);
  }

  100%{
    transform: translateX(30px) translateY(-20px) scale(0%);
  }
`;

const background = css({
  position: 'relative',
  color: Common.colors.white,
  background: Common.colors.darkPurple,
  overflow: 'hidden',
  width: '100%',
  fontSize: '25px',
  height: '100vh',
  display: 'flex',
  alignItems: 'flex-end',

  '.season:nth-of-type(2n)': {
    width: '15px',
    height: '15px',
    animationDuration: '7s',
    animationDelay: '0.5s',
  },

  '.season:nth-of-type(2n+1)': {
    width: '18px',
    height: '18px',
    animationDuration: '5s',
    animationDelay: '1s',
  },

  '.season:nth-of-type(4n)': {
    animationDuration: '3s',
    animationDelay: '2s',
  },

  '.season:nth-of-type(9n)': {
    animationDuration: '6s',
    animationDelay: '2s',
  },
});

const writeMail = css({
  display: 'flex',
  position: 'absolute',
  top: '10%',
  left: '50%',
  background: 'transparent',
  color: Common.colors.white,
  transform: 'translateX(-50%)',
  flexDirection: 'column',
  border: 'none',
  alignItems: 'center',
  gap: '5px',
  cursor: 'pointer',
  fontSize: '20px',
  textShadow: '4px 2px 5px white',
  '&:hover': css({
    transition: 'font-size 0.2s',
    fontSize: '22px',
  }),
});

const hotelWrapper = css({
  position: 'relative',
  width: '100%',
  height: '75%',
  display: 'flex',
  alignItems: 'flex-end',
  background: `url("/hotel.png") no-repeat center`,
  backgroundSize: 'cover',
});

const mailWrapper = mq({
  position: 'absolute',
  top: '30.5%',
  left: '50.2%',
  zIndex: '1',
  backgroundColor: 'black',
  opacity: '0.5',
  width: '100%',
  minWidth: '400px',
  maxWidth: '400px',
  height: '41%',
  maxHeight: '41%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'flex-start',
  flexWrap: 'wrap',

  // '> :nth-of-type(1)': {
  //   marginLeft: '7px',
  // },

  // '> :nth-of-type(8n+1)': {
  //   marginLeft: '7px',
  // },

  // '> :nth-of-type(8n)': {
  //   marginRight: 0,
  // },
});

const hotelNameWrapper = css({
  position: 'relative',
  width: '95%',
  textAlign: 'center',
  fontSize: '30px',
  color: '#452E72',
  fontFamily: 'InkLipquid',
});

const footerlayout = css({
  width: '100%',
});
