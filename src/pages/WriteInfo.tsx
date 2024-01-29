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
        <article
          css={css({
            display: 'flex',
            flexDirection: 'column',
            margin: '1rem auto 0',
            width: '16rem',
          })}
        >
          <h3>
            비회원의 경우, <br />
            편지를 열람하기 위한 코드가 필요합니다. <br />
            4자리의 코드를 입력해주세요.
          </h3>
          <p
            css={css({
              margin: '0.5rem 0',
            })}
          >
            편지 링크와 코드 4자리를 전달하시면, <br />
            코드 입력 후 편지를 읽을 수 있습니다.
          </p>
          <input type="password" name="" id="" minLength={4} maxLength={4} />
          <input type="password" name="" id="" minLength={4} maxLength={4} />
        </article>

        <button
          type="button"
          css={css({
            margin: '1rem auto 0',
            display: 'block',
          })}
        >
          확인
        </button>
      </section>
    </>
  );
}
