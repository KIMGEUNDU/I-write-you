import FriendButton from './FriendButton';

export default function FriendRequest() {
  return (
    <section>
      <h3>친구 요청 보내기</h3>
      <form>
        <input />
        <FriendButton size="small" colorType="default">
          보내기
        </FriendButton>
      </form>
      <h3>받은 친구 요청</h3>
      <ul>
        <li>
          name{' '}
          <FriendButton size="small" colorType="default">
            수락
          </FriendButton>
          <FriendButton size="small" colorType="red">
            거절
          </FriendButton>
        </li>
      </ul>
    </section>
  );
}
