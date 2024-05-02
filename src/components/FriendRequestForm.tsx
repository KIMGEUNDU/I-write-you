/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { mq } from '@/style/mq';
import { Common } from '@/style/Common';
import FriendButton from './FriendButton';
import { SrOnlyStyle } from '@/pages/Login';
import { FriendListItem, FriendListNumber } from './FriendList';
import { FriendRequestBtnBox } from './FriendReceived';
import { supabase } from '@/client';
import { useRecoilState } from 'recoil';
import { myInfoState } from '@/recoil/atom/useFriend';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function FriendRequestForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [myInfo] = useRecoilState(myInfoState);
  const [filterUserInfo, setFilterUsersInfo] = useState<infoType[]>([]);
  const [fList, setFriendList] = useState<string[]>([]);
  const [buttonStates, setButtonStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const { data } = await supabase
          .from('friends')
          .select('*')
          .or(`senderId.eq.${myInfo.id},receiverId.eq.${myInfo.id}`);

        const friendList = data!.map((friend) => {
          if (!friend.status) {
            setButtonStates((prev) => ({ ...prev, [friend.receiverId]: true }));
          }

          return friend.status && friend.senderId === myInfo.id
            ? friend.receiverName
            : friend.senderName;
        });

        setFriendList(friendList);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };
    fetchFriendList();
  }, [myInfo.id]);

  const handleFriendRequest = useCallback(
    async (value: infoType) => {
      const { error } = await supabase.from('friends').upsert([
        {
          senderId: myInfo.id,
          senderName: myInfo.email,
          receiverId: value.id,
          receiverName: value.name,
          status: false,
        },
      ]);
      if (error) {
        console.error('업데이트 중 오류 발생: ', error);
      } else {
        setButtonStates((prev) => ({ ...prev, [value.id]: true }));
        toast.success(`${value.name} 님에게 친구 신청이 완료되었습니다.`);
      }
    },
    [myInfo.id, myInfo.email]
  );

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      toast.error('검색어를 입력해주세요.');
      setFilterUsersInfo([]);
      return;
    }

    const { data, error } = await supabase
      .from('userInfo')
      .select('*')
      // .or(`userEmail.ilike.%${searchTerm}%,hotelName.ilike.%${searchTerm}%`);
      .ilike('hotelName', `%${searchTerm}%`);

    if (data && data.length > 0) {
      const usersInfoData = data.map((item) => ({
        id: item.id,
        name: item.hotelName,
        email: item.userEmail,
      }));

      const filterUser = usersInfoData.filter((user) => {
        return user.id !== myInfo.id && !fList.includes(user.name);
      });

      if (filterUser?.length === 0) {
        toast.error('검색된 호텔이 없습니다. 정확히 입력해주세요.');
        setFilterUsersInfo([]);
        return;
      }

      setFilterUsersInfo(filterUser);
    }

    if (error) {
      console.error('error', error);
    }
  };

  const handleRejectFriend = async (value: infoType) => {
    try {
      const { data } = await supabase
        .from('friends')
        .delete()
        .eq('senderId', myInfo.id)
        .eq('receiverId', value.id)
        .eq('status', false);

      setButtonStates((prev) => ({ ...prev, [value.id]: false }));
      toast.error(`${value.name} 님에게 친구 신청이 취소되었습니다.`);

      console.log('친구 거절 성공:', data);
    } catch (error) {
      console.error('친구 거절 중 오류 발생:', error);
    }
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSearch();
  }

  return (
    <>
      <form css={Requestform} onSubmit={handleSubmit}>
        <label css={SrOnlyStyle} htmlFor="friendRequest">
          친구 요청 보내기
        </label>

        <input
          css={FriendRequestInput}
          id="friendRequest"
          name="friendRequest"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="호텔 이름을 입력해주세요."
          maxLength={50}
        />

        <FriendButton
          size="small"
          colorType="default"
          type="submit"
          onClick={handleSearch}
        >
          검색
        </FriendButton>
      </form>
      <ul>
        {filterUserInfo.length !== 0 &&
          filterUserInfo.map((value, index) => {
            return (
              <li key={index} css={FriendListItem}>
                <div css={FriendListNumber}>
                  <span css={SrOnlyStyle}>{index}</span>
                </div>
                <span>
                  {value.name} <span css={friendList}>{value.email}</span>
                </span>

                <div css={FriendRequestBtnBox}>
                  {!buttonStates[value.id] ? (
                    <FriendButton
                      size="small"
                      colorType="default"
                      onClick={() => handleFriendRequest(value)}
                    >
                      요청
                    </FriendButton>
                  ) : (
                    <FriendButton
                      size="small"
                      colorType="red"
                      onClick={() => handleRejectFriend(value)}
                    >
                      취소
                    </FriendButton>
                  )}
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
}

const friendList = css`
  font-size: 1rem;
`;

export const Requestform = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
  & > img {
    position: absolute;
    right: 10px;
    top: 5px;
  }
  ${mq({
    height: ['38px', '43px', '46px', '48px'],
  })}
`;

export const FriendRequestInput = css`
  ::placeholder {
    color: ${Common.colors.lightMint};
  }
  :focus {
    border: 2px solid ${Common.colors.lightMint};
  }
  outline: none;

  background: url('/noPass.png') no-repeat;
  background: url('/pass.png') no-repeat;
  background-position: right 10px top 50%;
  background-size: 6%;

  padding: 0 60px 0 20px;
  border: none;
  border-radius: 25px;
  background-color: white;

  color: ${Common.colors.lightMint};

  ${mq({
    '&::placeholder': {
      fontSize: ['16px', '20px', '20px', ' 22px'],
    },
    fontSize: ['20px', '22px', '23px', ' 24px'],
    width: ['55%', '59%', '63%', '67%'],
    height: ['33px', '43px', '43px', '45px'],
    marginBottom: ['8px', '20px', '20px', '30px'],
  })}
`;
