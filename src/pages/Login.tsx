/** @jsxImportSource @emotion/react */

import { Common } from '@/style/Common';
import { mq } from '@/style/mq';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

export default function Login() {
  const main = document.querySelector('main');
  main?.setAttribute('style', 'background: #2D3A6F');

  return (
    <>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      <section css={CardFlex}>
        <div css={InviteCard}>
          <h2 css={SrOnlyStyle}>로그인</h2>
          <img css={LoginTitleImage} src="/public/loginImage.png" />
          <form
            css={CardForm}
            action=""
            name="CardForm"
            className="CardForm"
            method="POST"
          >
            <fieldset
            /* css={css({ display: 'flex', 'flex-direction': 'column' })} */
            >
              <legend css={SrOnlyStyle}>로그인</legend>
              <label htmlFor="userId" css={SrOnlyStyle}>
                아이디
              </label>
              <input
                css={CardInput}
                id="userId"
                type="text"
                name="userId"
                placeholder="아이디"
                required
              />
              <label htmlFor="userPassword" css={SrOnlyStyle}>
                비밀번호
              </label>
              <input
                css={CardInput}
                type="password"
                id="userPassword"
                name="userPassword"
                placeholder="비밀번호"
              />
              <div css={CardButtonBox}>
                <Link
                  css={CardButton}
                  to="/Join"
                  id="JoinBtn"
                  aria-label="회원가입으로 바로가기"
                >
                  호텔 만들기
                </Link>
                <button
                  css={StampButton}
                  id="loginBtn"
                  aria-label="로그인 버튼"
                  type="submit"
                >
                  체크인
                </button>
              </div>
            </fieldset>
          </form>
          <div css={InviteCardRibbon}></div>
        </div>
      </section>
    </>
  );
}

export const CardForm = css`
  display: inline-block;
  width: 80%;
  margin: 0 auto;
  ${mq({
    width: ['82%', '78%', '70%', '73%'],
  })}
`;

export const CardFlex = mq({
  width: '100%',
  height: '100%',
  display: 'flex',
  background: `${Common.colors.darkNavy}`,
});

export const InviteCard = mq({
  position: 'relative',
  width: ['95%', '80%', '80%', '792px'],
  height: ['270px', '340px', '440px', '470px'],
  background: `${Common.colors.lightPink}`,
  margin: 'auto',
  display: 'flex',
  'flex-direction': 'column',
  'border-radius': '10px',
  padding: ['14px 0', '15px 0', '18px 0', '20px 0'],
});

export const CardInput = css`
  ::placeholder {
    color: ${Common.colors.darkPurple};
  }
  :focus {
    border-bottom: 1px solid ${Common.colors.darkPurple};
  }
  outline: none;
  margin: 0 auto;
  border: none;
  background-color: transparent;
  color: ${Common.colors.darkNavy};

  ${mq({
    '&::placeholder': {
      fontSize: ['21px', '23px', '27px', '28px'],
    },
    fontSize: ['20px', '22px', '26px', '27px'],
    width: '100%',
    height: ['45px', '55px', '55px', '60px'],
    'margin-bottom': ['8px', '26px', '34px', '36px'],
  })}
`;

export const CardButtonBox = css`
  display: flex;
  justify-content: space-between;
  ${mq({
    'margin-top': ['10px', '0px', '35px', '20px'],
  })}
`;

export const CardButton = css`
  text-decoration: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 10px 0;
  ${mq({
    fontSize: ['19px', '21px', '25px', '26px'],
  })};
  color: ${Common.colors.darkPurple};
`;

export const StampButton = css`
  ${CardButton}
  ${mq({
    fontSize: ['19px', '21px', '25px', '26px'],
  })};

  color: ${Common.colors.darkPurple};
  background: url('/public/stamp.png') no-repeat;
  background-position: center right;

  ${mq({
    fontSize: ['19px', '21px', '25px', '26px'],
    'padding-right': ['35px', '40px', '50px', '50px'],
    'background-size': ['35px', '40px', '50px', '50px'],
  })};
`;

export const LoginTitleImage = css`
  margin: 0 auto;

  ${mq({
    height: ['80px', '100px', '125px', '137px'],
    'margin-bottom': ['10px', '10px', '15px', '18px'],
    'margin-top': ['0px', '0px', '10px', '10px'],
  })};
`;

export const InviteCardRibbon = css`
  position: absolute;
  top: 9px;
  right: -55px;
  transform: rotate(32deg);
  background: ${Common.colors.lightMint};
  ${mq({
    width: ['190px', '200px', '255px', '270px'],
    height: ['42px', '48px', '63px', '63px'],
  })};
`;

export const SrOnlyStyle = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
