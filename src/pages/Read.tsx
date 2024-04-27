/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { supabase } from '@/client';
import { css } from '@emotion/react';
import { myInfoState } from '@/recoil/atom/useFriend';
import MenuButton from '@/components/MenuButton';
import { Common } from '@/style/Common';
import { mq } from '@/style/mq';
import CryptoJS from 'crypto-js';
import { letterState } from '@/recoil/atom/useLetter';

export default function Read() {
  const navigate = useNavigate();
  const [myInfo] = useRecoilState(myInfoState);
  const [letter, setLetter] = useRecoilState(letterState);
  const { id } = useParams();
  4;
  const [isSent, SetIsSent] = useState(false);
  const [currentLetter, setCurrentLetter] = useState<LetterState | null>(null);
  const [content, setContent] = useState('');
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
          setCurrentLetter(letterData[0]);

          const bytes = CryptoJS.AES.decrypt(
            letterData[0].contents,
            import.meta.env.VITE_CRYPTO_KEY
          );
          const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

          setContent(decryptedData);

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
    if (!currentLetter?.read)
      (async () => {
        try {
          if (id) {
            const { data } = await supabase
              .from('letter')
              .update({ read: true })
              .eq('id', id);

            if (data) {
              setCurrentLetter(data);
            }
          }
        } catch (error) {
          console.error('Error updating letter read: ', error);
        }
      })();
  }, [currentLetter, id]);

  /* 받는 편지 여부 */
  useEffect(() => {
    if (
      currentLetter?.senderId === myInfo?.id ||
      currentLetter?.senderId === JSON.parse(localStorage.getItem('myInfo')!).id
    ) {
      SetIsSent(true);
    }

    return () => {
      SetIsSent(false);
    };
  }, [currentLetter, myInfo]);

  /* 답장 */
  const reply = () => {
    if (currentLetter) {
      setLetter({
        ...letter,
        sender: currentLetter.receiver,
        receiver: currentLetter.sender,
        member: true,
        senderId: currentLetter.receiverId,
        receiverId: currentLetter.senderId,
      });
    }
    return navigate('/writeLetter');
  };

  return (
    <div css={background}>
      <h1 css={srOnly}>
        {isSent ? '보낸 편지 읽는 페이지' : '받은 편지 읽는 페이지'}
      </h1>
      <header css={head}>
        <h3 css={font}>{currentLetter?.sender}님으로부터</h3>
        <Link to={isSent ? '/sent' : '/received'}>
          <img
            css={giftImg}
            src={isSent ? '/key.png' : '/gift.png'}
            alt={isSent ? '열쇠' : '선물'}
            aria-hidden={true}
          />
        </Link>
        {!isSent && (
          <button type="button" css={button} onClick={reply}>
            답장하기
          </button>
        )}
      </header>
      <section css={letterWrapper(currentLetter?.writingPad || 0)}>
        <div css={contentsWrapper}>
          {currentLetter?.attachment && (
            <img css={attachment} src={attachmentUrl} alt="첨부파일" />
          )}
          <div css={contents}>
            <p css={receiver}>{currentLetter?.receiver}에게</p>
            {content.split('\n').map((str, index) => (
              <span css={line} key={index}>
                {str}
              </span>
            ))}
          </div>
        </div>
        <MenuButton />
      </section>
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

const giftImg = mq({
  position: 'absolute',
  top: ['-40%', '-50%', '-50%', '-50%'],
  left: '48%',
  transform: 'translate(-50% -50%)',
  width: ['30px', '40px', '40px', '40px'],
  height: 'auto',
});

const button = css(font, {
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '18px',
  color: 'white',
  padding: '1px 6px 1px 0',
  cursor: 'pointer',
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

const contentsWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  padding: '20px 30px',
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

const contents = css(contentsWrapper, {
  background: 'rgba(255, 255, 255, 0.7)',
});

const receiver = css({ textAlign: 'left', width: '100%', fontSize: '30px' });

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
