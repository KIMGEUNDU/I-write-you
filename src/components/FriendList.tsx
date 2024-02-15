import FriendButton from './FriendButton';

export default function FreindList() {
  return (
    <section>
      <ul>
        <li>
          name{' '}
          <FriendButton size="small" colorType="default">
            편지 보내기
          </FriendButton>
        </li>
      </ul>
    </section>
  );
}
