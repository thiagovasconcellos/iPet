import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #4f108f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  img {
    height: 90px;
    width: 220px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 8px;
      height: 44px;
      padding: 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgb(255, 255, 255);
      }
    }

    .check {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      font-weight: bold;
    }

    span {
      color: #f64c75;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #eb950d;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 8px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.1, '#eb950d')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
