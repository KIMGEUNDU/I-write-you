/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function WriteInfo() {
  return (
    <>
      <section
        css={{
          padding: '1rem',
        }}
      >
        <h1
          css={css({
            textAlign: 'center',
            paddingBottom: '1rem',
          })}
        >
          누구에게 편지를 쓰실 건가요?
        </h1>

        <article
          css={css({
            width: '10rem',
            margin: '0 auto',
          })}
        >
          <div>
            <input type="checkbox" id="member" />
            <label htmlFor="member">친구</label>
          </div>
          <select
            name="memberFriends"
            id="memberFriends"
            css={css({
              width: '100%',
            })}
          >
            <option value="" disabled selected>
              ---
            </option>
            <option value="김건주">김건주</option>
            <option value="장효윤">장효윤</option>
            <option value="정소이">정소이</option>
          </select>
        </article>
        <article
          css={css({
            width: '10rem',
            margin: '0 auto',
          })}
        >
          <div>
            <input type="checkbox" id="nonMember" />
            <label htmlFor="nonMember">비회원</label>
          </div>
          <input
            type="text"
            placeholder="편지를 받을 친구의 이름을 입력해주세요."
            css={css({
              width: '100%',
            })}
          />
        </article>

        <button
          type="button"
          css={css({
            margin: '1rem auto 0',
            display: 'block',
          })}
        >
          선택
        </button>
      </section>
    </>
  );
}
