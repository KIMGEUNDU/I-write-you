/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function WriteLetter() {
  return (
    <>
      <section
        css={{
          padding: '1rem',
        }}
      >
        <article>
          <h3
            css={css({
              textAlign: 'center',
            })}
          >
            편지지를 선택해주세요.
          </h3>
          <ul
            css={css({
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
            })}
          >
            <li>편지지1</li>
            <li>편지지2</li>
            <li>편지지3</li>
            <li>편지지4</li>
          </ul>
        </article>
        <hr />
        <textarea
          name=""
          id=""
          placeholder="편지를 작성해주세요"
          css={css({
            width: '100%',
            height: '70vh',
            background: 'transparent',
            border: 'gray 1px solid',
            fontSize: '1.2rem',
            fontFamily: 'Pretendard',
            lineHeight: '1.8',
            padding: '1rem',
            boxSizing: 'border-box',
          })}
        ></textarea>
        <button type="button">사진 첨부하기</button>

        <div>
          <label htmlFor="photo" className="">
            사진 등록
          </label>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/webp,image/avif"
            name="photo"
            id="photo"
          />
          <div>
            <img src="/vite.svg" alt="photo" />
          </div>
        </div>

        <article>
          <h3>
            비회원의 경우, 편지를 열람하기 위한 코드가 필요합니다. 4자리의
            코드를 입력해주세요.
          </h3>
          <p>
            편지 링크와 코드 4자리를 전달하시면, 코드 입력 후 편지를 읽을 수
            있습니다.
          </p>
          <input type="password" name="" id="" minLength={4} maxLength={4} />
          <input type="password" name="" id="" minLength={4} maxLength={4} />
        </article>
      </section>
    </>
  );
}
