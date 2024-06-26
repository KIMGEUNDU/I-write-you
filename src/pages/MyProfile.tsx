/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { User } from '@supabase/supabase-js';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { myInfoState } from '@/recoil/atom/useFriend';
import { mq } from '@/style/mq';
import MenuButton from '@/components/MenuButton';

function MyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [hotelName, setHotelName] = useState('');
  const [myInfo] = useRecoilState(myInfoState);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user: ', error);
    } else if (data) {
      setUser(data.user);
      fetchHotelName(data.user);
    }
  };

  const fetchHotelName = async (user: User) => {
    if (user) {
      const { data, error } = await supabase
        .from('userInfo')
        .select('hotelName')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching hotel name: ', error);
      } else if (data) {
        setHotelName(data.hotelName);
      }
    }
  };

  const updateSenderName = async () => {
    if (user) {
      const { error: senderError } = await supabase
        .from('friends')
        .update({ senderName: hotelName })
        .match({ senderId: user.id });

      if (senderError) {
        console.error('Error updating senderName: ', senderError);
        return false;
      }
      return true;
    }
  };

  const updateReceiverName = async () => {
    if (user) {
      const { error: receiverError } = await supabase
        .from('friends')
        .update({ receiverName: hotelName })
        .match({ receiverId: user.id });

      if (receiverError) {
        console.error('Error updating receiverName: ', receiverError);
        return false;
      }
      return true;
    }
  };

  const updateUser = async () => {
    if (!hotelName.trim()) {
      toast.warn('호텔 이름을 입력해주세요.');
      return;
    }

    if (myInfo.email === hotelName) {
      toast.warn('호텔 이름이 변경되지 않았습니다.');
      return;
    }

    if (user) {
      const { data, error } = await supabase.from('userInfo').upsert([
        {
          id: user.id,
          userId: user.id,
          userEmail: user.email,
          hotelName,
        },
      ]);

      if (error) {
        console.error('Error updating user: ', error);
        return;
      } else {
        console.log('User updated successfully: ', data);
      }

      const updatedSender = await updateSenderName();
      const updatedReceiver = await updateReceiverName();

      if (updatedSender && updatedReceiver) {
        console.log('Friends names updated successfully');
        toast.success('호텔 이름이 설정되었습니다.');
        navigate('/hotel');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHotelName(e.target.value);
  };

  return (
    <div css={background}>
      <section css={wrapper}>
        <button
          css={FriendBackButton}
          onClick={() => navigate(-1)}
          type="button"
        >
          <img src="./back.png" alt="뒤로 가기" />
        </button>
        <h2 css={nameTitle}>호텔 이름을 설정해주세요</h2>
        <input
          type="text"
          value={hotelName}
          onChange={handleChange}
          css={hotelNameWrapper}
        />
        <button type="button" onClick={updateUser} css={updateHotelName}>
          설정
        </button>
      </section>
      <MenuButton profile={true} />
    </div>
  );
}

const background = css({
  position: 'relative',
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const wrapper = css({
  textAlign: 'center',
  position: 'relative',
});

const hotelNameWrapper = css({
  width: '100%',
  textAlign: 'center',
  fontSize: '30px',
  color: '#452E72',
  fontFamily: 'InkLipquid',
  marginBottom: '10px',
  outline: 'none',
  border: 'none',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
});

const nameTitle = mq({
  marginBottom: '10px',
  fontSize: ['20px', '21px', '25px', '30px'],
  fontWeight: '400',
});

const updateHotelName = css({
  background: 'rgba(255, 255, 255, 0.5)',
  border: '1px solid #452E72',
  padding: '5px 20px',
  cursor: 'pointer',
  fontFamily: 'Pretendard',
  fontWeight: '500',
  fontSize: '1rem',
});

export const FriendBackButton = mq({
  border: 'none',
  background: 'transparent',
  position: 'absolute',
  height: '5px',
  top: 0,
  left: '6%',
  cursor: 'pointer',
  '& > img': {
    transform: 'translateY(20%)',
    height: ['20px', '21px', '25px', '30px'],
  },
});

export default MyProfile;
