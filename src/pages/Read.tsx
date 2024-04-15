/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { supabase } from '@/client';
import { css } from '@emotion/react';
import { myInfoState } from '@/recoil/atom/useFriend';
import MenuButton from '@/components/MenuButton';
import { Common } from '@/style/Common';
import { mq } from '@/style/mq';

// http://localhost:5173/#/nonMember/61
// s2.receiver: http://localhost:5173/#/Read/46
// s2.sender: http://localhost:5173/#/Read/54

export default function Read() {
  const [myInfo] = useRecoilState(myInfoState);
  const { id } = useParams();
  4;
  const [isSent, SetIsSent] = useState(false);
  const [letter, setLetter] = useState<LetterState | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState('');

  /* 데이터 가져오기 */
  useEffect(() => {
    const getLetter = async () => {
      try {
        const { data: letterData } = await supabase
          .from('letter')
          .select('*')
          .eq('id', `${id}`);

        if (letterData) {
          setLetter(letterData[0]);

          if (letterData[0].attachment) {
            const imgUrl = await supabase.storage
              .from('letter')
              .getPublicUrl(`attachment/${id}.png`).data.publicUrl;

            setAttachmentUrl(imgUrl);
          }
        }
      } catch (error) {
        console.error('Error getting letter: ', error);
      }
    };

    getLetter();
  }, [id]);

  /* 읽은 편지 업데이트 */
  useEffect(() => {
    if (!letter?.read)
      (async () => {
        try {
          if (id) {
            const { data } = await supabase
              .from('letter')
              .update({ read: true })
              .eq('id', id);

            if (data) {
              setLetter(data);
            }
          }
        } catch (error) {
          console.error('Error updating letter read: ', error);
        }
      })();
  }, [letter, id]);

  /* 받는 편지 여부 */
  useEffect(() => {
    if (
      letter?.senderId === myInfo?.id ||
      letter?.senderId === JSON.parse(localStorage.getItem('myInfo')!).id
    ) {
      SetIsSent(true);
    }

    return () => {
      SetIsSent(false);
    };
  }, [letter, myInfo]);

  return (
    <div css={background}>
      <h1 css={srOnly}>
        {isSent ? '보낸 편지 읽는 페이지' : '받은 편지 읽는 페이지'}
      </h1>
      <header css={head}>
        <h3 css={font}>{letter?.sender}님으로부터</h3>
        <img
          css={giftImg(isSent)}
          src={isSent ? '/key.png' : '/gift.png'}
          alt={isSent ? '열쇠' : '선물'}
          aria-hidden={true}
        />
        {!isSent && (
          <Link css={button} to="/writeLetter">
            답장하기
          </Link>
        )}
      </header>
      <section css={letterWrapper(letter?.writingPad || 0)}>
        <div css={contents}>
          {letter?.attachment && (
            <img css={attachment} src={attachmentUrl} alt="첨부파일" />
          )}
          <p css={receiver}>{letter?.receiver}에게</p>
          {letter?.contents.map((str, index) => (
            <span css={line} key={index}>
              {str}
            </span>
          ))}
        </div>
      </section>
      <MenuButton />
    </div>
  );
}

const background = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
  boxSizing: 'border-box',
  background: Common.colors.darkPurple,
  padding: '30px 0',
});

const head = mq({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  width: ['90%', '70%', '70%', '70%'],
  fontSize: '20px',
  color: 'white',
});

const font = css({
  fontFamily: 'GowunBatang-Regular',
});

const giftImg = (isSent: boolean) =>
  mq({
    position: 'absolute',
    top: ['-40%', '-50%', '-50%', '-50%'],
    left: `${isSent ? '48%' : '51%'}`,
    transform: 'translate(-50% -50%)',
    width: ['30px', '40px', '40px', '40px'],
    height: 'auto',
  });

const button = css(font, {
  fontSize: '18px',
  color: 'white',
  padding: '1px 6px 1px 0',
  textDecoration: 'none',
});

const letterWrapper = (index: number) =>
  mq({
    boxSizing: 'border-box',
    width: ['90%', '70%', '70%', '70%'],
    height: '93%',
    background: `url("bg/letter${index}.jpg") no-repeat center`,
    backgroundSize: 'cover',
    overflowY: 'auto',
  });

const receiver = css({ textAlign: 'left', width: '100%', fontSize: '30px' });

const contents = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  padding: '20px 30px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  fontFamily: 'GangwonEduHyeonokT_OTFMediumA',
  fontSize: '20px',
});

const attachment = css({
  width: '60%',
  maxWidth: '600px',
  height: 'auto',
  maxHeight: '500px',
  padding: '20px 0',
});

const line = css({
  display: 'inline-block',
  width: '100%',
});

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
