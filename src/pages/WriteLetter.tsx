/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function WriteLetter() {
  return (
    <>
      <section
        css={{
          padding: '1rem',
          background: "url('bg/illust7.jpg')",
          backgroundPositionX: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}
      >
        <textarea
          name=""
          id=""
          placeholder="편지를 작성해주세요"
          css={css({
            width: '100%',
            height: '100vh',
            background: 'rgba(255, 255, 255, 0.7)',
            border: 'gray 1px solid',
            fontSize: '1.2rem',
            fontFamily: 'Pretendard',
            lineHeight: '1.8',
            padding: '1rem',
            boxSizing: 'border-box',
            outline: 'none',
            resize: 'none',
          })}
        ></textarea>
        <hr />
        <article>
          <h3
            css={css({
              textAlign: 'center',
              marginBottom: '0.5rem',
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
            <li>
              <button
                type="button"
                css={css({ cursor: 'pointer', outline: 'none' })}
              >
                <img
                  src="/bg/illust1.jpg"
                  alt=""
                  css={css({
                    width: '100px',
                    objectFit: 'cover',
                  })}
                />
              </button>
            </li>
            <li>
              {' '}
              <button
                type="button"
                css={css({ cursor: 'pointer', outline: 'none' })}
              >
                <img
                  src="/bg/illust4.jpg"
                  alt=""
                  css={css({
                    width: '100px',
                    objectFit: 'cover',
                  })}
                />
              </button>
            </li>
            <li>
              {' '}
              <button
                type="button"
                css={css({ cursor: 'pointer', outline: 'none' })}
              >
                <img
                  src="/bg/illust2.jpg"
                  alt=""
                  css={css({
                    width: '100px',
                    objectFit: 'cover',
                  })}
                />
              </button>
            </li>
            <li>
              {' '}
              <button
                type="button"
                css={css({ cursor: 'pointer', outline: 'none' })}
              >
                <img
                  src="/bg/illust9.jpg"
                  alt=""
                  css={css({
                    width: '100px',
                    objectFit: 'cover',
                  })}
                />
              </button>
            </li>
          </ul>
        </article>
        <button
          css={css({
            display: 'block',
            margin: '0 auto',
          })}
        >
          발송
        </button>
      </section>
    </>
  );
}
