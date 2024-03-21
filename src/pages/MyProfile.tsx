/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { User } from '@supabase/supabase-js';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function MyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [hotelName, setHotelName] = useState('');

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

  const updateUser = async () => {
    if (!hotelName.trim()) {
      alert('호텔 이름을 입력해주세요.');
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
      } else {
        console.log('User updated successfully: ', data);
        toast.success('호텔 이름이 설정되었습니다.');
        navigate('/hotel');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHotelName(e.target.value);
  };

  return (
    <section css={wrapper}>
      <h2 css={nameTitle}>호텔 이름을 정해주세요</h2>
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
  );
}

const wrapper = css({
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%)',
  marginTop: '-70px',
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

const nameTitle = css({
  marginBottom: '10px',
  fontSize: '30px',
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

export default MyProfile;
